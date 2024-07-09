
import React, { useState, useEffect } from 'react';
import CanvasXpressReact from 'canvasxpress-react';

function MyScript() {
    useEffect(() => {
        fetch("${process.env.PUBLIC_URL}/faithfuld.csv")
          .then(response => response.text())
          .then(data => {
            const parsedData = parseCSV(data);
            const config = {
              graphType: "Contour",
              x: parsedData.x,
              y: parsedData.y,
              z: parsedData.z,
              contour: {
                colors: "density"
              }
            };
            new CanvasXpress("canvas3", config);
          });
      }, []);
    
      const parseCSV = (csv) => {
        const rows = csv.split("\n");
        const headers = rows[0].split(",");
        const data = rows.slice(1).map(row => row.split(","));
    
        const x = data.map(row => parseFloat(row[headers.indexOf("waiting")]));
        const y = data.map(row => parseFloat(row[headers.indexOf("eruptions")]));
        const z = data.map(row => parseFloat(row[headers.indexOf("density")]));
    
        return { x, y, z };
      };
    
      return (
        <div className="App">
          <h1>Hello World</h1>
          <canvas id="canvas3"></canvas>
        </div>
      );
}

export default MyScript;