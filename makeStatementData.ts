import {
  Invoice,
  Performance,
  Play,
  StatementData,
  StatementPerformance,
} from "./types";

export function makeStatementData(
  invoice: Invoice,
  plays: Record<string, Play>
) {
  const performances: StatementPerformance[] = invoice.performances.map(
    (performance) => {
      const performanceWithPlay = {
        ...performance,
        play: plays[performance.playID],
      };
      return {
        ...performanceWithPlay,
        amount: amountFor(performanceWithPlay),
        volumeCredits: volumeCreditsFor(performanceWithPlay),
      };
    }
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
function volumeCreditsFor(perf: Performance & { play: Play }): number {
  let result = Math.max(perf.audience - 30, 0);
  if ("comedy" === perf.play.type) {
    result += Math.floor(perf.audience / 5);
  }
  return result;
}
function amountFor(perf: Performance & { play: Play }): number {
  let result = 0;
  switch (perf.play.type) {
    case "tragedy":
      result = 40000;
      if (perf.audience > 30) {
        result += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (perf.audience > 20) {
        result += 10000 + 500 * (perf.audience - 20);
      }
      result += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${perf.play.type}`);
  }
  return result;
}
