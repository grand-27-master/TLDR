import React from 'react'
import { useState, useEffect } from 'react'
import {copy, loader, tick} from '../assets'

const Demo = () => {

    const [article, setArticle] = useState({
        text: '',
        title: '',
        description: '',
        image: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [history, setHistory] = useState([])
    const [result, setResult] = useState('')
    const [copied, setCopied] = useState(false)

    const handleSubmit = async(e) => {
        // console.log('submit');
        e.preventDefault()
        setLoading(true)
        setError(false)
        setCopied(false)
        setResult('')
        setArticle(e.target[0].value)
        setHistory([...history, e.target[0].value])
    }

    useEffect(() => {
        if (article) {
            fetch('https://api.funtranslations.com/translate/minion.json?text=' + article)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setError(true)
                        setLoading(false)
                    } else {
                        setResult(data.contents.translated)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    setError(true)
                    setLoading(false)
                })
        }
    }, [article])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result)
        setCopied(true)
    }

    const handleHistory = (text) => {
        setArticle(text)
    }



  return (
    <section className='mt-16 w-full max-w-xl'>
        <div className='flex flex-col w-full gap-2'>

            {/* Search Bar */}
            <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your text' required value={article.text} onChange={(e)=>setArticle({...article,text:e.target.value})} className='url_input peer'/>
                <button type='submit' className='submit_btn'>send</button>
            </form>

            {/* History */}
        </div>

        {/* Result */}
    </section>
  )
}

export default Demo