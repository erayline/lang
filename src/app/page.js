"use client"
import "./globals.css"

import { StageLayer, Stage, Layer, Text, Group } from "react-konva";
import { useState, useEffect } from 'react';
import TalkCard from './components/TalkCard'
import generateMap from "../../lib/functions/generatemap";
import ResultCard from "./components/ResultCard";


export default function Home() {


  // random şekilde x adet konum nesnesi üreten bir şey kodla
  let [mapObjs, setMapObjs] = useState([{
    emoji: "☠️",
    name: "☠️",
    xCord:9999,
    yCord:9999,
  }, {
    emoji: "☠️",
    name: "☠️",
    xCord:9999,
    yCord:9999,
  }, {
    emoji: "☠️",
    name: "☠️",
    xCord:9999,
    yCord:9999,
  }])
  let [cardEmoji, setCardEmoji] = useState("");
  let [cardTitle, setCardTitle] = useState("");
  let [chatIndex, setchatIndex] = useState(0);
  const [chatHist, setChatHist] = useState([
    {
      id: 0,
      chat: [
        {
          sender: "user",
          text: "and give short answers, speak english, use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
    {
      id: 1,
      chat: [
        {
          sender: "user",
          text: " and give short answers, speak english, use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
    {
      id: 2,
      chat: [
        {
          sender: "user",
          text: " and give short answers, speak english, use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
    {
      id: 3,
      chat: [
        {
          sender: "user",
          text: "and give short answers, speak english, use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
    {
      id: 4,
      chat: [
        {
          sender: "user",
          text: "and give short answers, speak english, use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
  ]);




  //when click emoji, remove the hidden class
  function handleClickEmoji(event, element, index) {
    document.getElementById("TalkCard").classList.remove('hidden');
    setCardEmoji(element.emoji);
    setCardTitle(element.name);
    setChatHist((prev) =>
      prev.map((element) =>
        element.id === index
          ? (element.chat.length >2 ? element : { id: index, chat: [{ sender: "user", text: `talk to me like we are in ${mapObjs[index].name}, and give short answers,your name is jenny, speak english, use a lot of emojis, and make sure to ask me something so I can reply` }, ...element.chat] })
          : element
      )
    );
    setchatIndex(index);
    console.log(chatIndex);
  }

  //when press esc close the talking card
  useEffect(() => {
    document.getElementById("GenerateButton").addEventListener("click",()=>{
      document.getElementById("tutor").classList.add("hidden");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        document.getElementById("TalkCard").classList.add('hidden');
      }
    })
    document.getElementById("GenerateButton").addEventListener("click", (event) => {
      document.getElementById("GenerateButton").classList.add('hidden');
    })
  })

  //random Int function
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  return (
    <main className='w-full overflow-x-hidden h-screen bg-gray-950 flex flex-col items-center justify-around m-2'>
      <div className='w-full h-screen bg-gray-950 flex flex-row-reverse items-center justify-around'>
        <div className="hidden" id="TalkCard">
          <TalkCard chatIndex={chatIndex} emoji={cardEmoji} title={cardTitle} chatHist={chatHist} mapObjs={mapObjs} setChatHist={setChatHist}></TalkCard>
        </div>
        <div className="w-2/3 h-screen bg-gray-950 flex flex-col items-center justify-center">
          <Stage draggable className="bg-slate-900" width={1024} height={600}>
            <Layer>
              {mapObjs.map((element, index) => {

                let xCord = element.xCord;
                let yCord = element.yCord;
                return (
                  <Group key={index} x={xCord} y={yCord}>
                    <Text
                      x={xCord} y={yCord}
                      width={110} height={110} align="center"
                      verticalAlign="middle"
                      text={element.emoji}
                      onMouseEnter={(e) => {
                        const container = e.target.getStage().container();
                        container.style.cursor = 'pointer';
                      }}
                      onMouseLeave={(e) => {
                        const container = e.target.getStage().container();
                        container.style.cursor = 'default';
                      }}
                      fontSize={80}
                      fill="white"
                      onClick={((event) => handleClickEmoji(event, element, index))}
                    >
                    </Text>
                  </Group>
                )
              })}
            </Layer>
          </Stage>
          <button id="GenerateButton" className="border-2 rounded-3xl p-4 m-2" onClick={() => generateMap(setMapObjs, getRandomInt)}>generate</button>
        </div>
        <div id="tutor" className="flex flex-col p-3 justify-evenly h-96 font-bold">
          <p className="text-green-500">generate a map</p>
          <p className="text-blue-500">click an emoji</p>
          <p className="text-purple-500">start a convo with jenny(she is your gf, she acts different place to place) </p>
          <p className="text-orange-500">scroll down when you don't wanna text anymore :)</p>
        </div>
      </div>
      <div id="sonucGetir" className="w-2/3">
        <ResultCard myTexting={chatHist} mapObjs={mapObjs}></ResultCard>
      </div>
    </main>

  );

}
