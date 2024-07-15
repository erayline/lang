import React from "react";
import { useState } from "react";
import parseText from "html-react-parser";

const ResultCard = (props) => {
  let [resultText0, setResultText0] = useState("");
  let [resultText1, setResultText1] = useState("");
  let [resultText2, setResultText2] = useState("");

  let [chat0, setChat0] = useState("");
  let [chat1, setChat1] = useState("");
  let [chat2, setChat2] = useState("");

  async function getResult(input) {
    let res = await fetch("https://lang-nu.vercel.app/api/result", {
      method: "POST",
      body: JSON.stringify(input),
    });

    res = await res.json();
    return res.answer;
  }

  function sumTexts() {
    setChat0(
      props.myTexting[0].chat
        .slice(2)
        .filter((element) => element.sender === "user")
        .map((element) => element.text)
        .join(". ")
    );
    setChat1(
      props.myTexting[1].chat
        .slice(2)
        .filter((element) => element.sender === "user")
        .map((element) => element.text)
        .join(". ")
    );
    setChat2(
      props.myTexting[2].chat
        .slice(2)
        .filter((element) => element.sender === "user")
        .map((element) => element.text)
        .join(". ")
    );
    console.log(chat0,chat1,chat2)
  }
  async function getResults() {
    sumTexts();
    setTimeout(async () => {
      setResultText0(await getResult(chat0));
      
    }, 0);
    setTimeout(async () => {
      setResultText1(await getResult(chat1));
      
    }, 2000);
    setTimeout(async () => {
      setResultText2(await getResult(chat2));
      
    }, 4000);
  }

  return (
    <div className="w-2/3">
      <button
        className="border-2 p-2 hover:bg-white hover:text-black rounded-l"
        onClick={() => getResults()}
      >
        get results(wait)
      </button>
      <br></br>
      <br></br>

      <h2 className="text-6xl">
        {props.mapObjs[0].emoji == 0 ? "" : props.mapObjs[0].emoji}
      </h2>
      <p>{parseText(resultText0)}</p>

      <h2 className="text-6xl">
        {props.mapObjs[1].emoji == "0" ? "" : props.mapObjs[1].emoji}
      </h2>
      <p>{parseText(resultText1)}</p>

      <h2 className="text-6xl">
        {props.mapObjs[2].emoji == "0" ? "" : props.mapObjs[2].emoji}
      </h2>
      <p>{parseText(resultText2)}</p>
    </div>
  );
};

export default ResultCard;
