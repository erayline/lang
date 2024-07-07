import React from 'react'
import '../app/globals.css'


const TalkCard = (props) => {
  return (
    <div className='bg-slate-800 card-size rounded-3xl flex'>
        <div className="flex m-3 h-20 flex-row  w-full items-center justify-around">
          <h2 className='text-7xl select-none relative'>{props.emoji}</h2>
          <h2 className='text-4xl select-none font-bold'>{props.title}</h2>
        </div>
    </div>
  )
}

export default TalkCard;