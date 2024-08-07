import React, { useEffect, useState } from 'react';
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
import { json2csv } from 'json-2-csv';


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
  const [message, setMessage] = useState('');

  const [drugsData, setDrugsData] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [drugsList, setDrugsList] = useState(null);
  const [drugsCsv, setDrugsCsv] = useState(null);

  const handleDetailsCardButtonClick = () => {
    fetchViabilitiesData();
    fetchDrugsData();
  };

  const fetchDrugsData = ()  => {
    axios.get('http://localhost:3001/getDrugData')
      .then(response => {
        setDrugsList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchViabilitiesData = ()  => {
    axios.get('http://localhost:3001/getViabilityAndMappingData')
      .then(response => {
        setDrugsData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if(drugsData && drugsList) {
      const csv = json2csv(drugsData);
      const drugsCsv = json2csv(drugsList);
      setCsvData(csv);
      setDrugsCsv(drugsCsv);
    }
  }, [drugsData, drugsList]);

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
          {csvData && (<div id="graphdiv" className="centeredElement">
              <GraphContainer csvData={csvData} drugsCsv={drugsCsv}/>

          </div>)}

          {csvData && (<div id="detailscarddiv" className='detailscard-div'><DetailsCard message={message}/></div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
