import React, { useEffect, useState } from 'react';
import CanvasXpressReact from 'canvasxpress-react';

const GraphContainer = () => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/faithfuld.csv`)
      .then(response => response.text())
      .then(csv => {
        const parsedData = parseCSV(csv);
        const chartData = {
          "y" : {
        "vars" : [parsedData.data[0].slice(0,50)],
        "data" : [parsedData.data[1].slice(0,50)]
      }
        };
        const chartConfig = {
          "graphOrientation": "vertical",
      "graphType": "Bar",
      "theme": "tableau",
      "adjustAspectRatio": false,
      "percentAspectRatioPlotArea": 1.0
        };
        setData(chartData);
        setConfig(chartConfig);
      })
      .catch(error => console.error('Error fetching CSV data:', error));
  }, []);

  const parseCSV = (csv) => {
    const rows = csv.split('\n').filter(row => row.trim() !== '');
    const headers = rows[0].split(',').map(header => header.trim().replace(/"/g, ''));

    const data = rows.slice(1).map(row => row.split(',').map(cell => cell.trim()));

    const waiting = data.map(row => parseFloat(row[headers.indexOf('waiting')]));
    const eruptions = data.map(row => parseInt(row[headers.indexOf('eruptions')].replace(/"/g, '')));
    const density = data.map(row => parseFloat(row[headers.indexOf('density')]));

    return {
      data: [ eruptions, waiting, density ],
      smps: ['Sample 1', 'Sample 2', 'Sample 3'],
      vars: ['eruptions', 'waiting', 'density']
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