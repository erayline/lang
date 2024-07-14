import { NextResponse } from "next/server"


const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function getResult(input) {

  let ourTextings = input.map((element) => {
  })
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const prompt = `I WILL GIVE YOU A TEXT FIX ALL THE GRAMMAR MISTAKES AND GIVE ME MINI LESSONS ABOUT EACH ONE OF THEM YOU ARE AN EXPERIANCED ENGLISH TEACHER HERE IS THE TEXT: ${ourTextings}`
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}


export async function POST(request){
    //string geliyor
    //json'a dönüştürüyoruz
    let msgHistory = await request.json();

    //text döndürdü
    let cevap = await getResult(msgHistory);

    return NextResponse.json({answer:cevap});
}
