import React, { useEffect, useState } from 'react';
import CanvasXpressReact from 'canvasxpress-react';

const GraphContainer = (props) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // console.log(props.csvData);
    const parsedData = parseCSV(props.csvData);
    console.log(parsedData);
    const chartData = {
      "y" : {
        "vars" : ["age at diagnosis"],
        "data" : [parsedData.data.slice(0,50)],
        "smps" : [parsedData.patient_ids]
      }
    };
    const chartConfig = {
      "graphOrientation": "vertical",
      "graphType": "BarLine",
      "theme": "tableau",
      "adjustAspectRatio": false,
      "percentAspectRatioPlotArea": 1.0
    };
    setData(chartData);
    setConfig(chartConfig);
  }, []);

  const parseCSV = (csv) => {
    const rows = csv.split('\n').filter(row => row.trim() !== '');
    const headers = rows[0].split(',').map(header => header.trim().replace(/"/g, ''));
    console.log(headers);

    const data = rows.slice(1).map(row => row.split(',').map(cell => cell.trim()));
    console.log(data);

    const viability_names = data.map(row => row[headers.indexOf("viability_name")]);
    const age_at_diagnosis = data.map(row => parseInt(row[headers.indexOf("age_at_diagnosis")]));
    const patient_ids = data.map(row => "patient_" + row[headers.indexOf("patient_id")]);

    return {
      data: age_at_diagnosis,
      smps: patient_ids,
      vars: viability_names
    };
  };

  return (
    
    <div>
        {data && config ? (
          
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