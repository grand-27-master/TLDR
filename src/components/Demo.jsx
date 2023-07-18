import React from 'react'
import { useState, useEffect } from 'react'
import {copy, loader, tick} from '../assets'
import { useLazyGetSummaryQuery } from '../services/articles'

const Demo = () => {

    const [article, setArticle] = useState({
        url: '',
        summaary:''
    })

    const [getSummary, { error, isFetching}] = useLazyGetSummaryQuery()

    const handleSubmit = async(e) => {
        console.log('submit');
    }

    // useEffect(() => {
    //     if (article) {
    //         fetch('https://api.funtranslations.com/translate/minion.json?text=' + article)
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data.error) {
    //                     setError(true)
    //                     setLoading(false)
    //                 } else {
    //                     setResult(data.contents.translated)
    //                     setLoading(false)
    //                 }
    //             })
    //             .catch(err => {
    //                 setError(true)
    //                 setLoading(false)
    //             })
    //     }
    // }, [article])

    // const copyToClipboard = () => {
    //     navigator.clipboard.writeText(result)
    //     setCopied(true)
    // }

    // const handleHistory = (text) => {
    //     setArticle(text)
    // }



  return (
    <section className='mt-16 w-full max-w-xl'>
        <div className='flex flex-col w-full gap-2'>

            {/* Search Bar */}
            <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
                <input type="url" placeholder='🔗 Enter URL' required value={article.url} onChange={(e)=>setArticle({...article,url:e.target.value})} className='url_input peer'/>
                <button type='submit' className='submit_btn'>📩</button>
            </form>

            {/* History */}
        </div>

        {/* Result */}
    </section>
  )
}

export default Demo