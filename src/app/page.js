"use client"
import "./globals.css"

import { Image, Stage, Layer, Text, Group } from "react-konva";
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
          text: "and give short answers, speak english,talk like a girl, use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
    {
      id: 1,
      chat: [
        {
          sender: "user",
          text: " and give short answers, speak english,talk like a girl use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
    {
      id: 2,
      chat: [
        {
          sender: "user",
          text: " and give short answers, speak english,talk like a girl use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
    {
      id: 3,
      chat: [
        {
          sender: "user",
          text: "and give short answers, speak english,talk like a girl use a lot of emojis, and make sure to ask me something so I can reply",
        },
        { sender: "bot", text: "hi" },
      ],
    },
    {
      id: 4,
      chat: [
        {
          sender: "user",
          text: "and give short answers, speak english,talk like a girl use a lot of emojis, and make sure to ask me something so I can reply",
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

  const URLImage = ({ src }) => {
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImage(img);
      };
    }, [src]);
  
    return image ? (
      <Image
        image={image}
        x={-60}
        y={-60}
        width={900}  // Adjust according to your needs
        height={500} // Adjust according to your needs
      />
    ) : null;
  };

  //random Int function
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

//arkada harita olacak üsttekiler 
  return (
    <main className='w-full overflow-x-hidden h-screen bg-gray-950 flex flex-col items-center justify-around p-2'>
      <div className='w-full h-screen bg-gray-950 flex flex-row-reverse items-center justify-around'>
        <div className="hidden" id="TalkCard">
          <TalkCard chatIndex={chatIndex} emoji={cardEmoji} title={cardTitle} chatHist={chatHist} mapObjs={mapObjs} setChatHist={setChatHist}></TalkCard>
        </div>
        <div className="w-2/3 h-screen bg-gray-950 flex flex-col items-center justify-center">
          <Stage draggable className="bg-zinc-700" width={800} height={430}>
            <Layer>
              <URLImage src={"https://raw.githubusercontent.com/erayline/flutter_derslerim/main/map01.jpeg"}></URLImage>
              {mapObjs.map((element, index) => {

                let xCord = element.xCord;
                let yCord = element.yCord;
                return (
                  <Group key={index} x={xCord} y={yCord}>
                    <Text draggable
                      text={`${element.emoji} -${element.name}`}
                      fontSize={80}
                      fill="white"
                      verticalAlign="middle"
                      width={110} height={110} align="center"
                      x={xCord} y={yCord}
                      onMouseEnter={(e) => {
                        const container = e.target.getStage().container();
                        container.style.cursor = 'pointer';
                      }}
                      onMouseLeave={(e) => {
                        const container = e.target.getStage().container();
                        container.style.cursor = 'default';
                      }}
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
          <p className="text-pink-500">you can drag the emojis, and map, place them wherever you like</p>
          <p className="text-orange-500">scroll down when you don't wanna text anymore :)</p>
          <p className="text-red-500">this app is for improving your second language</p>
          <a className="font-bold p-1 rounded-sm text-white hover:text-yellow-400 hover:bg-zinc-600" target="_blank" href="https://insigh.to/b/langscene">suggest feature:) or give feedback 🤏🏻  </a>
        </div>
      </div>
      <div id="sonucGetir" className="w-2/3">
        <ResultCard myTexting={chatHist} mapObjs={mapObjs}></ResultCard>
      </div>
    </main>

  );

}
