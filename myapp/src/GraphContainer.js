import React, { useEffect, useState } from 'react';
import CanvasXpressReact from 'canvasxpress-react';

const GraphContainer = (props) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);

  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    const parsedData = parseCSV(props.csvData);
    const drugsCsvData = parseDrugsCsv(props.drugsCsv);

    const chartData = {
      "y" : {
        "vars" : ["age at diagnosis"],
        "data" : [parsedData.data],
        "smps" : parsedData.smps
      }
    };
    const chartConfig = {
      graphOrientation: "vertical",
      graphType: "BarLine",
      xAxisTitle: "Patients",
      yAxisTitle: "Age",
      theme: "tableau",
      adjustAspectRatio: false,
      percentAspectRatioPlotArea: 1.0
    };
    setData(chartData);
    setConfig(chartConfig);
  }, []);

  const parseCSV = (csv) => {
    const rows = csv.split('\n').filter(row => row.trim() !== '');
    const headers = rows[0].split(',').map(header => header.trim().replace(/"/g, ''));

    const data = rows.slice(1).map(row => row.split(',').map(cell => cell.trim()));

    const age_at_diagnosis = data.map(row => parseInt(row[headers.indexOf("age_at_diagnosis")]));

    // Define the age brackets
    const ageBrackets = {
      "40 and below": 0,
      "41-50": 0,
      "51-60": 0,
      "61-70": 0,
      "71 and above": 0
    };

    age_at_diagnosis.forEach(age => {
      if (age <= 40) {
        ageBrackets["40 and below"]++;
      } else if (age <= 50) {
        ageBrackets["41-50"]++;
      } else if (age <= 60) {
        ageBrackets["51-60"]++;
      } else if (age <= 70) {
        ageBrackets["61-70"]++;
      } else {
        ageBrackets["71 and above"]++;
      }
    });

    return {
      data: Object.values(ageBrackets),
      smps: Object.keys(ageBrackets)
    };
  };

  useEffect(() => {
    if (data && config) {
      setShowGraph(!showGraph);
    }
  }, [data, config]); // Update the state when the props change


  const parseDrugsCsv = (csv) => {
    const rows = csv.split('\n').filter(row => row.trim() !== '');
    const headers = rows[0].split(',').map(header => header.trim().replace(/"/g, ''));

    const data = rows.slice(1).map(row => row.split(',').map(cell => cell.trim()));

    const drugs_ids = data.map(row => row[headers.indexOf("cid")]);
    const drugs_names = data.map(row => row[headers.indexOf("figure_name")]);

    return {
      ids: drugs_ids,
      names: drugs_names
    };
  }

  return (
    
    <div>
        {showGraph ? (
          
            <div>
              <CanvasXpressReact
                data={data}
                config={config}
                target="graphdiv" // Specify the target ID
              />
            </div>
          
        ) : (
          <p>Loading...</p>
        )}
    </div>
  );
}

export default GraphContainer;