import React from 'react'

const ResultCard = (props) => {

    async function getResults(input){
        let res = await fetch("http://localhost:3000/api/result", {
            method: "POST",
            body: JSON.stringify(input),
            });

            res = await res.json();
        console.log(res.answer);       
    } 


  return (
    <div>
        <button onClick={()=>getResults(props.myTexting)}>sonuçları getir</button>
    </div>
  )
}

export default ResultCard