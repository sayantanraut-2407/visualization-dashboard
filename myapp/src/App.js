import React, { useState } from 'react';
import GraphContainer from './GraphContainer';
import ChatBot from './ChatBot';
import SQLConverter from './SqlConverter';

import './VideoBackground.css'; // CSS file for styling
import './App.css';

import Button from '@mui/material/Button';

import imagePath from './resources/lab_logo.png';
import vidPath from './resources/bg_vid.mp4';

function App() {

  const [isGraphCalled, setIsGraphCalled] = useState(false);

  return (
    <div className="App" id="maindiv">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={vidPath} type="video/mp4" />
        </video>
        <h1 className="headerElement">Data Visualization App</h1>
        <img src={imagePath} alt="Fixed" className="fixed-image" />
        {/* <div id="chatbotdiv" className="chatBotElement">
          <ChatBot />
        </div> */}
        <div className='beginBtn'>
          <Button color="secondary" 
            onClick={() => {
              console.log("event logged")
              setIsGraphCalled(true)
            }}>
            Begin Visualization
          </Button>
        </div>
        <div id="converterdiv" className='converterElement'>
          {/* <div className='sqlDiv'>
              <SQLConverter />
          </div> */}
          {isGraphCalled && (<div id="graphdiv" className="centeredElement">
              <GraphContainer />
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
