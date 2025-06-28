import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import './biasPage.tsx'

function App() {
  const [showResults, setShowResults] = useState(false);
  const [articleData, setArticleData] = useState<{ title: string; text: string } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const navigation = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem('url') as HTMLInputElement; 
    const url = input.value; 
    console.log('Submitted URL:', url);

    try {
      const response = await fetch('http://localhost:5000/parse-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      console.log("Article Data from Flask:", data);

      setArticleData(data);
      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error("Error sending URL to backend line 25:", error);
    }
  };

  const handleClose = () => {
    setShowResults(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  const navigateToBiasPage = () => {
    navigation('/bias');
  }

  return (
    <>
      <div ref={formRef} className='bg-cyan-100 h-screen flex justify-center items-center flex-col gap-4 px-72'>
        <h1 className='text-blue-700 font-extrabold text-7xl'> Neutral Ground </h1>
        <p>
          In today’s media landscape, news articles are often written with implicit bias, whether through selective language,
          omission of context, or emotionally charged framing. This can make it difficult for readers to quickly identify the
          objective facts, especially when different sources present conflicting narratives. Please enter the link you want to
          check the bias on and we will tell you all the facts
        </p>
        <div className='w-full'>
          <form onSubmit={handleSubmit} className='flex flex-row gap-2'>
            <input
              type='text'
              name='url'
              placeholder='Enter URL here'
              className='border-2 border-blue-500 rounded-lg p-2 w-5/6'
              onChange={(e) => console.log(e.target.value)}
            />
            <button className='bg-blue-500 text-white px-4 py-2 w-1/6 rounded hover:bg-blue-600 transition-colors'>
              Search
            </button>
          </form>
        </div>
      </div>

      {showResults && articleData && (
        <div ref={resultsRef} className='h-screen flex flex-col items-center bg-gray-100 p-8 relative'>
          <h2 className='text-5xl font-bold text-blue-700 mb-2'> Bias or framing techniques removed </h2>          
          <button className='absolute right-6 text-3xl' onClick={handleClose}>
            &#10006;
          </button>
          <p className='text-lg font-semibold mb-4'>{articleData.title}</p>
          <p className='text-base mb-6 whitespace-pre-line'>{articleData.text}</p>
          <button className='bg-gray-400 px-4 py-2 rounded-2xl' onClick={navigateToBiasPage}>
            See the bias of article
          </button> 
        </div>
      )}
    </>
  )
}

export default App
