import React from 'react';
import GraphContainer from './GraphContainer';
import ChatBot from './ChatBot';
import SQLConverter from './SqlConverter';

import './App.css';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App" id="maindiv">
      <h1 className="headerElement">Data Visualization App</h1>
      <div id="chatbotdiv" className="chatBotElement">
        <ChatBot />
      </div>
      <div className='clickBtn'>
      </div>
      <div id="converterdiv" className='converterElement'>
        <div className='sqlDiv'>
        <SQLConverter />
        </div>
        <div id="graphdiv" className="centeredElement">
            <GraphContainer />
        </div>
        
      </div>
    </div>
  );
}

export default App;
