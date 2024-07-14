import React, { useState, useEffect, useCallback } from "react";
import "../globals.css";

const TalkCard = (props) => {

  //props gives -> card emoji, card title, chat index, chatHist and setChatHist


  const [myInput, setMyInput] = useState("");

  const getAnswer = useCallback(async () => {
    let currentChat = props.chatHist[props.chatIndex].chat;
    if (currentChat[currentChat.length - 1].sender === "user") {
      let res = await fetch("http://localhost:3000/api/answer", {
        method: "POST",
        body: JSON.stringify(currentChat),
      });

      res = await res.json();
      props.setChatHist((prev) =>
        prev.map((element) =>
          element.id === props.chatIndex
            ? { ...element, chat: [...element.chat, { sender: "bot", text: res.answer }] }
            : element
        )
      );
    }
  }, [props.chatHist, props.chatIndex]);

  useEffect(() => {
    getAnswer();
  }, [props.chatHist, getAnswer]);

  useEffect(() => {
    const inputElement = document.getElementById("InputBubble");
    inputElement.addEventListener("keydown", handleKeyDown);
    return () => {
      inputElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [myInput]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(myInput, "user");
    }
  };

  const handleSubmit = (input, sender) => {
    if(input.length >= 30){
      props.setChatHist((prev) =>
        prev.map((element) =>
          element.id === props.chatIndex
            ? { ...element, chat: [...element.chat, { sender: sender, text: input }] }
            : element
        )
      );
      setMyInput("");
    }
  };

  if (!props.chatHist[props.chatIndex]) {
    return <div>Chat not found</div>;
  }

  return (
    <div className="bg-gray-950 card-size rounded-3xl flex flex-col scrollbar overflow-x-hidden border-green-300">
      <div className="border-2 border-white p-12 rounded-3xl flex h-20 flex-row w-full items-center justify-around">
        <h2 className="text-7xl select-none relative">{props.emoji}</h2>
        <h2 className="text-4xl select-none font-bold">{props.title}</h2>
      </div>
      <div className="overflow-scroll">
        {props.chatHist[props.chatIndex].chat.map((element, index) => {
          if(index>1){
            return element.sender === "user" ? (
              <MyBubble key={index} text={element.text} />
            ) : (
              <AIBubble key={index} text={element.text} />
            )
          }

        }
        )}
        <div id="InputBubble">
          <MyInputBubble handleMyInput={setMyInput} value={myInput} />
        </div>
      </div>
    </div>
  );
};

const MyInputBubble = ({ handleMyInput, value }) => {
  return (
    <div className="flex flex-col items-end justify-end m-5">
      <textarea
        type="text"
        value={value}
        onChange={(e) => handleMyInput(e.target.value)}
        className="text-white bg-gray-700 rounded-2xl font-bold h-16 w-2/3 p-2 rounded-1xl"
      />
      <p>{value.length}/{30}</p>
    </div>
  );
};

const AIBubble = ({ text }) => {
  return (
    <div className="w-2/3 bg-blue-950 h-auto font-bold text-white p-4 m-5 rounded-2xl border border-blue-300">
      <h2 className="pb-2">Jenny🍎:</h2>
      <p>{text}</p>
    </div>
  );
};

const MyBubble = ({ text }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="w-2/3 bg-zinc-950 h-auto font-bold text-white p-4 m-5 rounded-2xl border border-white">
        <h2 className="pb-2">me:</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TalkCard;
