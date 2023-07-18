import React from 'react'
import { useState, useEffect } from 'react'
import {copy, loader, tick} from '../assets'
import { useLazyGetSummaryQuery } from '../services/articles'

const Demo = () => {

    const [article, setArticle] = useState({
        url: '',
        summary:''
    })

    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");
    const [getSummary, { error, isFetching}] = useLazyGetSummaryQuery()

    // Load data from localStorage on mount
    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
        localStorage.getItem("articles")
        );

        if (articlesFromLocalStorage) {
        setAllArticles(articlesFromLocalStorage);
        }
    }, []);


    const handleSubmit = async(e) => {
        // console.log('submit');

        e.preventDefault() // prevents page reload
        const existingArticle = allArticles.find(
            (item) => item.url === article.url
        );
      
        if (existingArticle)
        return setArticle(existingArticle);

        const {data}=await getSummary({articleUrl:article.url}) // data is the response from the server

        if(data?.summary){
            const newArticle={...article,summary:data.summary} // update the state
            const updatedArticles=[...allArticles,newArticle]

            setArticle(newArticle) 
            setAllArticles(updatedArticles)
            localStorage.setItem("articles", JSON.stringify(updatedArticles));

            // console.log(newArticle);
        }
    }

    // copy the url and toggle the icon for user feedback
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
        handleSubmit(e);
        }
    };

  return (
    <section className='mt-16 w-full max-w-xl'>
        <div className='flex flex-col w-full gap-2'>

            {/* Search Bar */}
            <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
                <input type="url" placeholder='🔗 Enter URL' required value={article.url} onChange={(e)=>setArticle({...article,url:e.target.value})} className='url_input peer'/>
                <button type='submit' className='submit_btn' ><i class='fa fa-send'></i></button>
            </form>

            {/* History */}
            {/* <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                <span>History</span>
                {allArticles.reverse().map((item, index) => (
                <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className='link_card'
                >
                <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                    <img
                    src={copied === item.url ? tick : copy}
                    alt={copied === item.url ? "tick_icon" : "copy_icon"}
                    className='w-[40%] h-[40%] object-contain'
                    />
                </div>
                <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                    {item.url}
                </p>
                </div>
          ))}
            </div> */}
        </div>

        {/* Result */}
        <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            An error occured, please try again later
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
        </div>
    </section>
  )
}

export default Demo