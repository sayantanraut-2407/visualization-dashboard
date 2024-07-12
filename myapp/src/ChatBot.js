import { useState } from "react"
import Groq from "groq-sdk";

const { Configuration, OpenAIApi } = require("openai");

const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true });

const ChatBot = () => {
//   const configuration = new Configuration({
//     apiKey: process.env.REACT_APP_OPENAI_API_KEY,
//   });

//   const openai = new OpenAIApi(configuration);
//   const [prompt, setPrompt] = useState("");
//   const [apiResponse, setApiResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const result = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: prompt,
//         temperature: 0.5,
//         max_tokens: 4000,
//       });
//       //console.log("response", result.data.choices[0].text);
//       setApiResponse(result.data.choices[0].text);
//     } catch (e) {
//       //console.log(e);
//       setApiResponse("Something is going wrong, Please try again.");
//     }
//     setLoading(false);
//   };

    const [apiResponse, setApiResponse] = useState("");

    if (apiResponse == "") {
        getGroqChatCompletion().then(res => {
            console.log(res);
            setApiResponse(res.choices[0]?.message?.content || "");
            console.log(apiResponse);
          });
    }
    
    // Print the completion returned by the LLM.
    // console.log(chatCompletion.choices[0]?.message?.content || "");


    function getGroqChatCompletion() {
        return groq.chat.completions.create({
            messages: [
            {
                role: "user",
                content: "convert this text to a postgresql query: give me info for drug 1 and 2 combo on sarcoma cell 3421",
            },
            ],
            model: "llama3-8b-8192",
        });
    }

  return (
    <>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '100vh',
        }}
      > 
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={prompt}
            placeholder="Please ask to openai"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            disabled={loading || prompt.length === 0}
            type="submit"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div> */}
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