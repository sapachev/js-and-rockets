// Please run your solution from this file

import { prepareData, renderData } from './solution';

console.log("Hello from %csrc/index.js", "font-weight:bold");

fetch('https://api.spacexdata.com/v3/launches/past')
  .then(response => {
    if (response.ok) {
      return response.json()
    }
    throw new Error('Failed to fetch data');
  })
  .then(data => {
    renderData(prepareData(data));
  })
  .catch(err => {
    document.getElementById("out").innerText = `Error: ${err.message}`;
  });