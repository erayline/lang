import React from 'react'
import {useState,useEffect} from 'react';
import '../app/globals.css'


const TalkCard = (props) => {

  let [chatHist,setChatHist] = useState(["hi eray how are you?"]);

  function handleChatHistory(input){
    setChatHist(t => [input,...t])
  }

  

  return (
      <div className='bg-gray-950 card-size rounded-3xl flex flex-col scrollbar overflow-x-hidden border-green-300'>
          <div className="border-2 border-white p-12 rounded-3xl flex h-20 flex-row  w-full items-center justify-around">
            <h2 className='text-7xl select-none relative'>{props.emoji}</h2>
            <h2 className='text-4xl select-none font-bold'>{props.title}</h2>
          </div>
          <div className="overflow-scroll">
            <div id="InputBubble">
              <MyInputBubble callback={handleChatHistory}></MyInputBubble>
            </div>
            {chatHist.map((element,index)=>{
              if(index%2===0){
                return <MyBubble key={index} text={element}></MyBubble>
              }else{
                return <AIBubble key={index} text={element}></AIBubble>
              }
            })}

          </div>
    </div>

  )
}


export const AIBubble = (props) => {
  return (
    <div className='w-2/3 bg-blue-950 h-auto font-bold text-white p-4 m-5 rounded-2xl border border-blue-300'>
      <h2 className='pb-2'>Gerry:</h2>
      <p className=''>{props.text}</p>
    </div>
  )
}



export const MyBubble = (props) => {
  return (
    <div className="w-full flex justify-end">
      <div className='w-2/3 bg-zinc-950 h-auto font-bold text-white p-4 m-5 rounded-2xl border border-white'>
        <h2 className="pb-2">me:</h2>
        <p className=''>{props.text}</p>
      </div>
    </div>
  )
}

export const MyInputBubble = (props) => {
  let [myInput,setMyInput] = useState("");

  function handleClickAnswer(){
    props.callback(myInput)
    setMyInput("");
  }

  function handleMyInput(e){
    setMyInput(e.target.value);
  }

  return (
    <div className="flex flex-col items-end justify-end m-5">
      <textarea type="text" value={myInput} onChange={(e)=>handleMyInput(e)} className='text-white bg-gray-700 rounded-2xl font-bold h-16 w-2/3 p-2  rounded-1xl '></textarea>
      <button onClick={handleClickAnswer} className='bg-gray-800 w-32'>Answer</button>
    </div>
  )
}

export default TalkCard;