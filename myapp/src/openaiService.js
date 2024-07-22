import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const getSQLQuery = async (text) => {
  const response = await axios.post(
    'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
    {
      prompt: `Convert the following natural language text to an SQL query: ${text}`,
      max_tokens: 100,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].text.trim();
};