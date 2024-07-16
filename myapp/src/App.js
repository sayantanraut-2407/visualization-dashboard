import React from 'react';
import GraphContainer from './GraphContainer';
import ChatBot from './ChatBot';
import SQLConverter from './SqlConverter';
import './App.css';

function App() {
  return (
    <div className="App" id="maindiv">
        <h1 className="headerElement">Data Visualization App</h1>
        <div id="chatbotdiv" className="chatBotElement">
          <ChatBot />
      </div>
      <div id="graphdiv" className="centeredElement">
          <GraphContainer />
      </div>
      <div id="converterdiv">
          <SQLConverter />
      </div>
    </div>
  );
}

export default App;
