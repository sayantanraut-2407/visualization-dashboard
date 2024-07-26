import React, { useState } from 'react';
import GraphContainer from './GraphContainer';
import ChatBot from './ChatBot';
import SQLConverter from './SqlConverter';
import DetailsCard from './DetailsCard';

import './VideoBackground.css'; // CSS file for styling
import './App.css';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import imagePath from './resources/lab_logo.png';
import vidPath from './resources/bg_vid.mp4';

import axios from 'axios';


// Creating a styled secondary button with hover effect
const CustomButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-containedSecondary': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      // backgroundColor: '#f0f8ff',
      opacity: 0.7, // Change opacity on hover
    },
  },
}));



function App() {

  const [isGraphCalled, setIsGraphCalled] = useState(false);

  const [showCard, setShowCard] = useState(false);

  const handleDetailsCardButtonClick = () => {
    setShowCard(!showCard);
    fetchData();
    fetchDrugMaps();
  };

  const [message, setMessage] = useState('');
  const [drugMaps, setDrugMaps] = useState('');

  const fetchData = ()  => {
    axios.get('http://localhost:8000/api/hello-world/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchDrugMaps = ()  => {
    axios.get('http://localhost:8000/api/fetch-drugs/')
      .then(response => {
        setDrugMaps(response.data.resp);
        console.log(drugMaps);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
          <CustomButton variant="contained" color="secondary" 
            onClick={() => {
              console.log("event logged")
              setIsGraphCalled(true)
              handleDetailsCardButtonClick()
            }}>
            Begin Visualization
          </CustomButton>
        </div>
        <div id="converterdiv" className='converterElement'>
          {/* <div className='sqlDiv'>
              <SQLConverter />
          </div> */}
          {isGraphCalled && (<div id="graphdiv" className="centeredElement">
              <GraphContainer />

          </div>)}

          {showCard && (<div id="detailscarddiv" className='detailscard-div'><DetailsCard message={message}/></div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
