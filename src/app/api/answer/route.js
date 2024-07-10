import { NextResponse } from "next/server"


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


async function run(msgHistory) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  let msgFromUser = msgHistory[msgHistory.length-1].text;


  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [msgHistory.filter((item) => item.sender ==="user").map((item) => {let msgObj = {text:item.text};return msgObj;})],
      },
      {
        role: "model",
        parts: [msgHistory.filter((item) => item.sender ==="bot").map((item) => {let msgObj = {text:item.text};return msgObj;})],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  let result = await chat.sendMessage(msgFromUser);
  result = result.response;
  result = await result.text();

  console.log(result);
  return result;
}
// let liste= [{sender:"user",text:"merhaba adın ne?"},{sender:"bot",text:"ben gemini"},{sender:"user",text:"kaç yaşındasın?"}]

// run(liste);


export async function POST(request){
    //string geliyor
    //json'a dönüştürüyoruz
    let msgHistory = await request.json();

    //text döndürdü
    let cevap = await run(msgHistory);

    return NextResponse.json({answer:cevap});
}
