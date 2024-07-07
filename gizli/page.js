// "use client"

// import "./globals.css"

// import { Stage,Circle,Layer,Rect,Text,Group } from "react-konva";
// import {useState} from 'react';


export default function Page() {

    // let [mapEmojis,setMapEmojis] = useState([])

    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // function generateMap(){
    //     let places=["🎢","🛖","🏛️","🏡","⛪","🏜️","🗻","🏤","🕋","🏥","🏦","🏨","🏯","🏭","🌉","🏫","🗼"]

    //     setMapEmojis(t => []);
        
    //     for(let i=0;i<10;i++){
    //         setMapEmojis(t=>[...t,places[getRandomInt(0,places.length-1)]])
    //     }

    // }

    // return (
    //     <main className='w-full h-screen bg-gray-950 flex flex-col items-center justify-center'>
    //         <Stage draggable className="bg-slate-900" width={1024} height={window.innerHeight*2/3}>
    //             <Layer>
    //                 {mapEmojis.map((element,index) => {
    //                     let xCord = getRandomInt(50,450);
    //                     let yCord = getRandomInt(0,200);

    //                     return (
    //                     <Group key={index} x={xCord} y={yCord}>
    //                         <Text 
    //                             x={xCord} y={yCord}
    //                             width={110} height={110} align="center"
    //                             verticalAlign="middle"
    //                             text={element}
    //                             fontSize={80}
    //                             fill="white"
    //                             onClick={() => (console.log(index))}
    //                             >
    //                         </Text>

    //                     </Group>
    //                     )
    //                 })}
    //             </Layer>
    //         </Stage>

    //         <button className="border-2 rounded-3xl p-4 m-2" onClick={generateMap}>generate</button>
    //       </main>

    // );

    return (
        <h2>hi</h2>
    )
  }
  