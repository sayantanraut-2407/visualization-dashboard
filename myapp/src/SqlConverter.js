import React, { useState } from 'react';
import { getSQLQuery } from './openaiService';
import Button from '@mui/material/Button';

const SQLConverter = () => {
  const [text, setText] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');

  const handleConvert = async () => {
    const query = await getSQLQuery(text);
    setSqlQuery(query);
  };

  return (
    <div>
      <h1>Natural Language to SQL Converter</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows='5'
        cols='50'
        placeholder='Enter your text here'
      />
      <br />
      {/* <button onClick={handleConvert}>Convert to SQL</button> */}
      <Button variant="contained"
        onClick={handleConvert}>
        Convert to SQL
      </Button>
      {sqlQuery && (
        <div>
          <h2>Generated SQL Query</h2>
          <pre>{sqlQuery}</pre>
        </div>
      )}
    </div>
  );
};

export default SQLConverter;