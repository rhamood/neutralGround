import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { summarizeFacts} from "./api";
import type {SummaryResponse } from "./api";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
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
    const articleText = "Three Palestinians have been shot dead after dozens of Israeli settlers attacked a Palestinian village in the occupied West Bank, Palestinian authorities say.Video footage from Kafr Malik, near Ramallah, on Wednesday night showed a car and a home on fire and Palestinians running away as gunfire is heard.The Israeli military said forces deployed to the scene found settlers and villagers throwing stones at each other. It added that several 'terrorists' opened fire and threw stones at the forces, who returned fire and identified hits. They also arrested five Israelis.The Palestinian foreign ministry said settlers fired at villagers in their homes during what it called their 'terrorist assault'.UK sanctions far-right Israeli ministers for 'inciting violence' against PalestiniansIsrael announces major expansion of settlements in occupied West BankBBC team's tense encounter with sanctioned Israeli settler while filming in West BankThe ministry also said Israeli forces prevented ambulance crews from reaching the wounded and obstructed fire crews from entering the village for several hours.Another villager, a 13-year-old boy, was shot dead - reportedly by Israeli troops - earlier in the week.Israel has built about 160 settlements housing some 700,000 Jews since it occupied the West Bank and East Jerusalem - land Palestinians want, along with Gaza, for a hoped-for future state - in the 1967 Middle East war. An estimated 3.3 million Palestinians live alongside them.The vast majority of the international community considers the settlements illegal under international law - a position supported by an advisory opinion of the International Court of Justice (ICJ) last year - although Israel disputes this.A poster mourning three Palestinian man who were killed during an attack by Israeli settlers - (Left to Right: Murshid Nawwaf Hamayel, Mohammed Qaher al-Naji and Lutfi Sabri Bearat) hangs on a building in Kafr Malik, in the Israeli-occupied West Bank (26 June 2025)A poster showing the three dead Palestinian men - Murshid Nawwaf Hamayel, Mohammed Qaher al-Naji and Lutfi Sabri Bearat - was on display in Kafr Malik 'What do you expect us to do when our homes are being attacked by settlers with petrol bombs?' asked one elderly man, sitting quietly with hundreds of other mourners on Thursday after the funerals of the three men who were killed - Murshid Nawwaf Hamayel, Mohammed Qaher al-Naji and Lutfi Sabri Bearat.Kafr Malik has been attacked numerous times in recent weeks by settlers increasingly emboldened by Israeli government ministers who often support their actions and who have endorsed the building of many more settlements.'They think they can take my land and force me to leave, but I'm not going anywhere,' said Hamdallah Bearat, a retired professor of engineering who has lived in Kafr Malik for most of his life.For many younger Palestinians, though, the realities of an increasingly restrictive occupation and its economic consequences make life here more difficult by the day.Hamdallah Bearat sits in a mourning tent in Kafr Malik, in the Israeli-occupied West Bank, after three Palestinian man were killed during an attack by Israeli settlers (26 June 2025)Hamdallah Bearat said he would resist attempts to force him to leave his home Shortly after the incident in Kafr Malik, there was another attack in the Palestinian community of Dar Fazaa, near the village of Taybeh. Israeli human rights group B'Tselem said three people were injured and three cars were torched. It posted CCTV footage showing a group of at least 10 masked men setting one car on fire and throwing stones.'The settler violence and rampage, under the protection of the occupation army, is a political decision by the Israeli government, implemented by the settlers,' Palestinian Vice-President Hussein al-Sheikh wrote on X.'The Israeli government's behaviour and decisions are pushing the region toward an explosion. We call on the international community to urgently intervene to protect our Palestinian people.'Since Hamas's attack on southern Israel on 7 October 2023, which triggered the war in Gaza, more than 900 Palestinians have been killed by Israeli forces in the West Bank - a period in which more than 20 Israelis have also been killed.There has also been a sharp increase in the number and severity of settler attacks in the West Bank over the same period.The UN says there were 487 attacks by settlers resulting in casualties or property damage in the first four months of this year, including 122 in April. At least 181 Palestinians were reportedly injured by settlers in the attacks.Human rights organisations and witnesses say the Israeli military and police frequently stand by while settlers attack Palestinian towns and villages.Reuters A Palestinian man stands next to a burnt car after an attack by Israeli settlers in Kafr Malik, in the Israeli-occupied West Bank (26 June 2025)ReutersIsraeli settlers set fire to cars and other property in Kafr MalikSince the right-wing, pro-settler governing coalition headed by Prime Minister Benjamin Netanyahu took office in late 2022, it has decided to establish 49 new settlements and begin the legalisation process for seven settler outposts which were built without government authorisation, according to the Israeli anti-settlement watchdog Peace Now.Last month, Israeli ministers said 22 new settlements had been approved across the length and width of the West Bank, hailing it as a move that 'prevents the establishment of a Palestinian state that would endanger Israel'.In a separate incident on Wednesday, a 15-year-old Palestinian boy was shot and killed by Israeli forces in the town of al-Yamoun, near Jenin, the Palestinian health ministry said.The Israeli military said 'terrorists' threw explosive devices at its forces during an operation there. Afterwards, they approached while holding additional explosives and the forces responded by opening fire, it added.In January, Israeli forces launched a large-scale operation against Palestinian armed groups in Jenin and two other governorates in the northern West Bank, which Netanyahu said aimed to 'defeat terrorism'.The UN's human rights chief said in April that the operation had destroyed entire refugee camps and makeshift medical sites, and displaced more than 40,000 Palestinians, who had been told not to return to their homes for a year."; // take input from web scrapper
    // const articleText = await fetchArticleText(url); // You need to implement this (or stub it for now)
    const summary = await summarizeFacts(articleText);
    console.log('Summary:', summary);
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
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
    <>
      <div
        ref={formRef}
        className="bg-cyan-100 h-screen flex justify-center items-center flex-col gap-4 px-72"
      >
        <h1 className="text-blue-700 font-extrabold text-7xl"> Neutral Ground </h1>
        <p>
          In today’s media landscape, news articles are often written with implicit bias,
          whether through selective language, omission of context, or emotionally charged framing.
          This can make it difficult for readers to quickly identify the objective facts,
          especially when different sources present conflicting narratives.
          Please enter the link you want to check the bias on and we will tell you all the facts
        </p>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-row gap-2">
            <input
              type="text"
              name="url"
              placeholder="Enter URL here"
              className="border-2 border-blue-500 rounded-lg p-2 w-5/6"
            />
            <button
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 w-1/6 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
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
          className="h-screen flex flex-col items-center bg-gray-100 p-8 relative"
        >
          <button className="absolute right-6 top-6 text-3xl" onClick={handleClose}>
            &#10006;
          </button>

          <h2 className="text-5xl font-bold text-blue-700 mb-2">
            Bias or framing techniques removed
          </h2>

          <p className="text-lg mb-4">Here are the facts from the article you provided:</p>

          <ul className="list-disc list-inside mb-4 space-y-1">
            {summary["clear text"].map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>

          <h3 className="text-3xl font-semibold text-blue-700 mb-2">
            Bias or framing techniques removed:
          </h3>

          <ul className="list-disc list-inside mb-8 space-y-1">
            {summary["Bias or framing techniques removed"].map((bias, idx) => (
              <li key={idx}>{bias}</li>
            ))}
          </ul>

          <button
            className="bg-gray-400 px-4 py-2 rounded-2xl"
            onClick={navigateToBiasPage}
          >
            See the bias of article
          </button>
        </div>
      )}
    </>
  );
}

export default App;
