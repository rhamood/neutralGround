import './App.css'

function App() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem('url') as HTMLInputElement;
    const url = input.value;
    console.log('Submitted URL:', url);
  }

  return (
    <>
      <div className='bg-cyan-100 h-screen flex justify-center items-center flex-col gap-4 px-72'>
        <h1 className='text-blue-700 font-extrabold text-7xl'> Neutral Ground </h1>
        <p> In today’s media landscape, news articles are often written with implicit bias, whether through selective language, omission of context, or emotionally charged framing. This can make it difficult for readers to quickly identify the objective facts, especially when different sources present conflicting narratives. Please enter the link you want to check the bias on and we will tell you all the facts </p>
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
              Check Bias
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
