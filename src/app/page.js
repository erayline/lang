"use client"
import "./globals.css"

import { Stage,Circle,Layer,Rect,Text,Group } from "react-konva";
import {useState} from 'react';
import TalkCard from '../components/TalkCard'

export default function Home() {
    // random şekilde x adet konum nesnesi üreten bir şey kodla
    let [mapEmojis,setMapEmojis] = useState([])

    let [cardEmoji,setCardEmoji] = useState("e");
    let [cardTitle,setCardTitle] = useState("e");

    function handleCardItems(event,element, index){
        setCardEmoji(element);
        setCardTitle(index);
    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateMap(){
        let places=["🎢","🛖","🏛️","🏡","⛪","🏜️","🗻","🏤","🕋","🏥","🏦","🏨","🏯","🏭","🌉","🏫","🗼"]

        setMapEmojis(t => []);
        
        for(let i=0;i<10;i++){
            setMapEmojis(t=>[...t,places[getRandomInt(0,places.length-1)]])
        }

    }

    return (
        <main className='w-full h-screen bg-gray-950 flex flex-row-reverse items-center justify-around'>
            <TalkCard emoji={cardEmoji} title={cardTitle}></TalkCard>
            
            <div className="w-2/3 h-screen bg-gray-950 flex flex-col items-center justify-center">
                <Stage draggable className="bg-slate-900" width={1024} height={600}>
                    <Layer>
                        {mapEmojis.map((element,index) => {
                            // let xCord = getRandomInt(50,450);
                            // let yCord = getRandomInt(0,200);
                            let xCord = 10 + 40*index;
                            let yCord = 10;
                            return (
                            <Group key={index} x={xCord} y={yCord}>
                                <Text 
                                    x={xCord} y={yCord}
                                    width={110} height={110} align="center"
                                    verticalAlign="middle"
                                    text={element}
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
                                    onClick={((event) => handleCardItems(event,element,index))}
                                    >
                                </Text>

                            </Group>
                            )
                        })}
                    </Layer>
                </Stage>
                <button className="border-2 rounded-3xl p-4 m-2" onClick={generateMap}>generate</button>
            </div>
        

          
          </main>

    );

}
