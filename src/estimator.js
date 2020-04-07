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
      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** Math.floor(((data.timeToElapse * 30) / 3))
      );
      break;
    case 'weeks':
      impact.infectionsByRequestedTime = impact.currentlyInfected * (
        2 ** (Math.floor((data.timeToElapse * 7) / 3))
      );
      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** (Math.floor((data.timeToElapse * 7) / 3))
      );
      break;
    case 'days':
      impact.infectionsByRequestedTime = impact.currentlyInfected * (
        2 ** (Math.floor((data.timeToElapse * 1) / 3))
      );
      severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (
        2 ** (Math.floor((data.timeToElapse * 1) / 3))
      );
      break;
    default:
      break;
  }

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
