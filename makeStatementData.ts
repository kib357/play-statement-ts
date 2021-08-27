import {
  Invoice,
  Performance,
  PerformanceCalculatorFabric,
  PerformanceWithPlay,
  Play,
  StatementData,
  StatementPerformance,
} from "./types";

export function makeStatementData(
  invoice: Invoice,
  plays: Record<string, Play>,
  makePerformanceCalculator: PerformanceCalculatorFabric
) {
  const performances = invoice.performances.map(
    makeEnrichPerformance(plays, makePerformanceCalculator)
  );

  const data: StatementData = {
    customer: invoice.customer,
    performances,
    totalAmount: performances.reduce((res, perf) => res + perf.amount, 0),
    totalVolumeCredits: performances.reduce(
      (res, perf) => res + perf.volumeCredits,
      0
    ),
  };
  return data;
}

const makeEnrichPerformance =
  (
    plays: Record<string, Play>,
    makePerformanceCalculator: PerformanceCalculatorFabric
  ) =>
  (performance: Performance): StatementPerformance => {
    const performanceWithPlay: PerformanceWithPlay = {
      ...performance,
      play: plays[performance.playID],
    };
    const playType = performanceWithPlay.play.type;
    const calculator = makePerformanceCalculator(playType, performanceWithPlay);
    return {
      ...performanceWithPlay,
      amount: calculator.amount(),
      volumeCredits: calculator.volumeCredits(),
    };
  };
