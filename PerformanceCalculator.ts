import {
  PlayType,
  PerformanceWithPlay,
  PerformanceCalculator,
  PerformanceCalculatorFabric,
} from "./types";

abstract class AbstractCalculator implements PerformanceCalculator {
  protected performance: PerformanceWithPlay;

  constructor(performance: PerformanceWithPlay) {
    this.performance = performance;
  }

  abstract amount(): number;

  volumeCredits(): number {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends AbstractCalculator {
  amount() {
    const { audience } = this.performance;
    return 40000 + (audience > 30 ? 1000 * (audience - 30) : 0);
  }
}

class ComedyCalculator extends AbstractCalculator {
  amount() {
    const { audience } = this.performance;
    return (
      30000 +
      300 * audience +
      (audience > 20 ? 10000 + 500 * (audience - 20) : 0)
    );
  }

  volumeCredits(): number {
    return super.volumeCredits() + Math.floor(this.performance.audience / 5);
  }
}

export const makePerformanceCalculator: PerformanceCalculatorFabric = (
  type,
  performance
) => {
  switch (type) {
    case PlayType.comedy:
      return new ComedyCalculator(performance);
    case PlayType.tragedy:
      return new TragedyCalculator(performance);
  }
};
