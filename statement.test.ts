const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

const performances = [
  {
    playID: "hamlet",
    audience: 55,
  },
  {
    playID: "as-like",
    audience: 35,
  },
  {
    playID: "othello",
    audience: 40,
  },
];

describe("statement", () => {
  const customer = "BigCo";
  test("includes customer name", () => {
    expect(statement(customer, [])).toMatch(customer);
  });

  test("starts with 'Statement for'", () => {
    const result = statement(customer, []);
    expect(result.startsWith("Statement for")).toBeTruthy();
  });

  test("given empty performances displays 'no performances' on new line", () => {
    expect(statement(customer, [])).toMatch("\nno performances");
  });

  test("includes performances names", () => {
    const performances: StatementPerformance[] = [
      { playName: "Hamlet", revenue: 1 },
    ];
    expect(statement(customer, performances)).toMatch("Hamlet");
  });

  test("includes performances revenue", () => {
    const performances: StatementPerformance[] = [
      { playName: "Hamlet", revenue: 1 },
    ];
    expect(statement(customer, performances)).toMatch("$1");
  });
});

describe("prepareData", () => {
  test("returns preparedPerformances with play name", () => {
    const result = preparePerformances(performances, plays);
    expect(result[0].playName).toBe("Hamlet");
  });
});

function statement(
  customer: string,
  performances: StatementPerformance[]
): string {
  const header = `Statement for ${customer}`;
  if (performances.length == 0) {
    return header + "\nno performances";
  }

  return (
    header +
    performances
      .map((performance) => performance.playName + "$" + performance.revenue)
      .join("\n")
  );
}
type StatementPerformance = {
  playName: string;
  revenue: number;
};

function preparePerformances(
  performances: { playID: string; audience: number }[],
  plays: Record<string, { name: string; type: string }>
): StatementPerformance[] {
  return performances.map((performance) => {
    return {
      playName: plays[performance.playID].name,
      revenue: 1,
    };
  });
}
