"use client"
import "./globals.css"

import { Stage,Circle,Layer,Rect,Text,Group } from "react-konva";
import {useState,useEffect} from 'react';
import TalkCard from '../../lib/components/TalkCard'
import generateMap from "../../lib/functions/generatemap";


export default function Home() {
    // random şekilde x adet konum nesnesi üreten bir şey kodla
    let [mapObjs,setMapObjs] = useState([])

    let [cardEmoji,setCardEmoji] = useState("");
    let [cardTitle,setCardTitle] = useState("");

    function handleClickEmoji(event,element, index){
        document.getElementById("TalkCard").classList.remove('hidden');
        setCardEmoji(element.emoji);
        setCardTitle(element.name);
    }

    useEffect(()=>{
        document.addEventListener("keydown",(event)=>{
            if(event.key === "Escape" || event.key === "Esc"){
                document.getElementById("TalkCard").classList.add('hidden');
            }
        })
    })

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

    return (
        <main className='w-full h-screen bg-gray-950 flex flex-row-reverse items-center justify-around'>
            <div className="hidden" id="TalkCard">
                <TalkCard emoji={cardEmoji} title={cardTitle}></TalkCard>
            </div>
            

            <div className="w-2/3 h-screen bg-gray-950 flex flex-col items-center justify-center">
                <Stage draggable className="bg-slate-900" width={1024} height={600}>
                    <Layer>
                        {mapObjs.map((element,index) => {

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
                                    onClick={((event) => handleClickEmoji(event,element,index))}
                                    >
                                </Text>

                            </Group>
                            )
                        })}
                    </Layer>
                </Stage>
                <button className="border-2 rounded-3xl p-4 m-2" onClick={()=>generateMap(setMapObjs,getRandomInt)}>generate</button>
            </div>
        

          
          </main>

    );

}
