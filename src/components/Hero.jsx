import React from 'react'
import logo from '../assets/logo.png'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3x'>
        <img src={logo} alt='logo' className='w-28 object-contain'/>
        </nav>
        <h1 className='head_text'>Summarize articles with <br /> <span className='orange_gradient'>GPT-4</span></h1>
        <h2 className='desc'>Simplify your reading by transforming lengthy articles into clear & concise summaries!</h2>
    </header>
  )
} 

export default Hero