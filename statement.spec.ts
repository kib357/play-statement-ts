import statement from "./statement";
import { Invoice, Play, PlayType } from "./types";

describe("report statement should", () => {
  const invoice: Invoice = {
    customer: "BigCo",
    performances: [
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
        audience: 29,
      },
      {
        playID: "merchant",
        audience: 19,
      },
    ],
  };

  it("be correct", () => {
    const plays: Record<string, Play> = {
      hamlet: { name: "Hamlet", type: PlayType.tragedy },
      "as-like": { name: "As You Like It", type: PlayType.comedy },
      othello: { name: "Othello", type: PlayType.tragedy },
      merchant: { name: "The Merchant of Venice", type: PlayType.comedy },
    };

    const report = statement(invoice, plays);

    expect(report).toBe(
      "Statement for BigCo\n" +
        "  Hamlet: $650.00 (55 seats)\n" +
        "  As You Like It: $580.00 (35 seats)\n" +
        "  Othello: $400.00 (29 seats)\n" +
        "  The Merchant of Venice: $357.00 (19 seats)\n" +
        "Amount owed is $1,987.00\n" +
        "You earned 40 credits\n"
    );
  });

  // it("throw error on unknown play type", () => {
  //   const plays: Record<string, Play> = {
  //     hamlet: { name: "Hamlet", type: "unknown" },
  //   };

  //   expect(() => {
  //     statement(invoice, plays);
  //   }).toThrow(Error);
  // });
});
