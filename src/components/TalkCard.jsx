import React from 'react'
import {useState} from 'react';
import '../app/globals.css'


const TalkCard = (props) => {


  return (
      <div className='bg-slate-800 card-size rounded-3xl flex flex-col'>
          <div className="flex m-3 h-20 flex-row  w-full items-center justify-around">
            <h2 className='text-7xl select-none relative'>{props.emoji}</h2>
            <h2 className='text-4xl select-none font-bold'>{props.title}</h2>
          </div>
          <MyBubble></MyBubble>
    </div>

  )
}

export const MyBubble = () => {
  let [myInput,setMyInput] = useState("");
  
  function handleMyInput(e){
    setMyInput(e.target.value);
  }

  return (
    <div className="flex justify-end m-3">
      <textarea type="text" value={myInput} onChange={(e)=>handleMyInput(e)} className='text-black font-bold h-16 w-2/3 p-2 rounded-2xl '></textarea>
    </div>
  )
}



export default TalkCard;