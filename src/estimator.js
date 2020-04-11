
export const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  switch (data.periodType) {
    case 'months':
      impact.infectionsByRequestedTime = impact.currentlyInfected * (
        2 ** Math.trunc(((data.timeToElapse * 30) / 3))
      );
      impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * data
        .region.avgDailyIncomePopulation) * (data
        .region.avgDailyIncomeInUSD / (data.timeToElapse * 30)));

      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** Math.trunc(((data.timeToElapse * 30) / 3))
      );
      severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * data
        .region.avgDailyIncomePopulation) * (data
        .region.avgDailyIncomeInUSD / (data.timeToElapse * 30)));
      break;

    case 'weeks':
      impact.infectionsByRequestedTime = impact.currentlyInfected * (
        2 ** (Math.trunc((data.timeToElapse * 7) / 3))
      );
      impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * data.region
        .avgDailyIncomePopulation) * (data
        .region.avgDailyIncomeInUSD / (data.timeToElapse * 7)));

      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** (Math.trunc((data.timeToElapse * 7) / 3))
      );
      severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * data
        .region.avgDailyIncomePopulation) * (data
        .region.avgDailyIncomeInUSD / (data.timeToElapse * 7)));
      break;

    case 'days':
      impact.infectionsByRequestedTime = impact.currentlyInfected * (
        2 ** (Math.trunc((data.timeToElapse * 1) / 3))
      );
      impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * data
        .region.avgDailyIncomePopulation) * (data
        .region.avgDailyIncomeInUSD / (data.timeToElapse * 1)));

      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** (Math.trunc((data.timeToElapse * 1) / 3))
      );
      severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * data
        .region.avgDailyIncomePopulation) * (data
        .region.avgDailyIncomeInUSD / (data.timeToElapse * 1)));
      break;

    default:
      break;
  }

  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  impact.hospitalBedsByRequestedTime = Math.trunc(data
    .totalHospitalBeds * (35 / 100) - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(data
    .totalHospitalBeds * (35 / 100) - severeImpact.severeCasesByRequestedTime);

  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;

  impact.casesForVentilatorsByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math
    .floor(severeImpact.infectionsByRequestedTime * 0.02);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
