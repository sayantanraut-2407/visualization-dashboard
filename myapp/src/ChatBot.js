import { useState } from "react"
import Groq from "groq-sdk";

const { Configuration, OpenAIApi } = require("openai");

const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true });

const ChatBot = () => {

    const [apiResponse, setApiResponse] = useState("");

    if (apiResponse == "") {
        getGroqChatCompletion().then(res => {
            console.log(res);
            setApiResponse(res.choices[0]?.message?.content || "");
            console.log(apiResponse);
          });
    }


    function getGroqChatCompletion() {
        return groq.chat.completions.create({
            messages: [
            {
                role: "user",
                content: "hi how're you doing today?",
            },
            ],
            model: "mixtral-8x7b-32768",
        });
    }

  return (
    <>
      {apiResponse && (
        <div>
            <h3 style={{textAlign: "left"}}>API response:</h3> <br/>
            {apiResponse}
        </div>
      )}
    </>
  );
};


export default ChatBot;