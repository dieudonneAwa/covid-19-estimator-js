const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  switch (data.periodType) {
    case 'months':
      impact.infectionsByRequestedTime = impact.currentlyInfected * (
        2 ** Math.floor(((data.timeToElapse * 30) / 3))
      );
      impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;

      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** Math.floor(((data.timeToElapse * 30) / 3))
      );
      severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
      break;

    case 'weeks':
      impact.infectionsByRequestedTime = impact.currentlyInfected * (
        2 ** (Math.floor((data.timeToElapse * 7) / 3))
      );
      impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;

      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** (Math.floor((data.timeToElapse * 7) / 3))
      );
      severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
      break;

    case 'days':
      impact.infectionsByRequestedTime = impact.currentlyInfected * (
        2 ** (Math.floor((data.timeToElapse * 1) / 3))
      );
      impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;

      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** (Math.floor((data.timeToElapse * 1) / 3))
      );
      severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
      break;

    default:
      break;
  }

  impact.hospitalBedsByRequestedTime = data
    .totalHospitalBeds * (35 / 100) - impact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = data
    .totalHospitalBeds * (35 / 100) - severeImpact.severeCasesByRequestedTime;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
