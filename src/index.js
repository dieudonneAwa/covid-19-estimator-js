/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
import { covid19ImpactEstimator } from './estimator.js';

const data = {};

document.querySelector('select').addEventListener('change', (event) => {
  data.periodType = event.target.value;
});

document.querySelector('form').addEventListener('keyup', (e) => {
  if (e.target.name === 'regionName') {
    data.name = e.target.value;
  } else {
    data[e.target.name] = parseFloat(e.target.value);
  }

  try {
    const observer = new PerformanceObserver();

    observer.observe({
      type: 'first-input',
      buffered: true
    });
  } catch (err) {
    // Do nothing if the browser doesn't support this.
  }
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = data;

  const result = covid19ImpactEstimator({
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  });

  const tBody1 = document.querySelector('tBody');
  const row1 = tBody1.insertRow();

  const resultvalues = Object.values(result.impact);

  for (let i = 0; i < resultvalues.length; i += 1) {
    const td = document.createElement('td');
    const text = document.createTextNode(resultvalues[i]);
    td.appendChild(text);
    row1.appendChild(td);
  }


  const tBody2 = document.querySelector('#table2 tbody');
  const row2 = tBody2.insertRow();

  const severeImpact = Object.values(result.severeImpact);


  for (let i = 0; i < severeImpact.length; i += 1) {
    const td = document.createElement('td');
    const text = document.createTextNode(severeImpact[i]);
    td.appendChild(text);
    row2.appendChild(td);
  }
});
