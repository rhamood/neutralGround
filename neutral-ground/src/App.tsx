import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { summarizeFacts} from "./api.tsx";
import type {SummaryResponse } from "./api.ts";
import './biasPage.tsx'


function App() {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [articleData, setArticleData] = useState<{ title: string; text: string } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const navigation = useNavigate();

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const input = (e.target as HTMLFormElement).elements.namedItem('url') as HTMLInputElement;
  const url = input.value.trim();

  if (!url) {
    setError("Please enter a valid URL.");
    return;
  }

  try {
    //const articleText = "Three Palestinians have been shot dead after dozens of Israeli settlers attacked a Palestinian village in the occupied West Bank, Palestinian authorities say.Video footage from Kafr Malik, near Ramallah, on Wednesday night showed a car and a home on fire and Palestinians running away as gunfire "; 
    // // take input from web scrapper
    // const articleText = await fetchArticleText(url); // You need to implement this (or stub it for now)
    const response = await fetch('http://localhost:5000/parse-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      console.log(data.text);
      console.log(typeof data.text);
    const summary = await summarizeFacts(data.text);
    setSummary(summary);
    console.log('Summary:', summary);

    //setArticleData(data);

      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  } catch (err) {
    console.error('Error summarizing:', err);
  }
}

  const handleClose = () => {
    setShowResults(false);
    setSummary(null);
    setError(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const navigateToBiasPage = () => {
    navigation("/bias");
  };

  return (
    <div className="bg-cyan-100 min-h-screen">
      <div
        ref={formRef}
        className="flex justify-center items-center flex-col gap-4 px-72"
      >
        <h1 className="text-blue-700 font-extrabold text-7xl py-16"> Neutral Ground </h1>
        <p className="text-2xl pb-4">
          Paste the link to a news article, and we'll reveal the facts.
        </p>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-row gap-2">
            <input
              type="text"
              name="url"
              placeholder="Enter URL here"
              className="border-2 border-blue-500 rounded-lg p-4 w-5/6 text-lg"
            />
            <button
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 w-1/6 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 focus:bg-red-200 text-lg"
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </form> 
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>

      {showResults && summary && (
        <div
          ref={resultsRef}
          className="flex flex-col p-8 relative px-96 "
        >
          <button className="absolute right-6 top-6 text-3xl" onClick={handleClose}>
            &#10006;
          </button>

          <h2 className="text-5xl font-bold text-blue-700 pb-6 font-mono pt-8 text-center">Here are the facts from the article you provided:</h2>

          <ul className="list-disc list-inside mb-4 space-y-1">
            {summary["clear text"].map((fact, idx) => (
              <li className="text-xl" key={idx}>{fact}</li>
            ))}
          </ul>

          <h3 className="text-5xl font-bold text-blue-700 pb-6 pt-16 font-mono text-center">
            Bias or framing techniques removed:
          </h3>

          <ul className="list-disc list-inside mb-8 space-y-1">
            {summary["Bias or framing techniques removed"].map((bias, idx) => (
              <li className="text-xl" key={idx}>{bias}</li>
            ))}
          </ul>

        </div>
      )}
    </div>
  );
}

export default App;
