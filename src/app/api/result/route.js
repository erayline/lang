import { NextResponse } from "next/server"


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function getResult(input) {
  //input is a text from the user
  console.log(input);
  
  if(input.length> 50){

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `you are an experienced english tutor for foreigners,analyise the text I will give you and fix my grammar mistakes, suggest better versions, give examples using that english topic. (use this to write a new line:<br>)(don't write the text back to me) HERE IS THE TEXT: ${input}`
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }else{
    return "text a little bit more"
  }

}


export async function POST(request){
    //string geliyor
    //json'a dönüştürüyoruz
    let msgHistory = await request.json();

    //text döndürdü
    let cevap = await getResult(msgHistory);

    return NextResponse.json({answer:cevap});
}
