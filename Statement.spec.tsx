import React from "react";
import Statement from "./Statement";
import { create } from "react-test-renderer";
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

  test("renders correctly", () => {
    const plays: Record<string, Play> = {
      hamlet: { name: "Hamlet", type: PlayType.tragedy },
      "as-like": { name: "As You Like It", type: PlayType.comedy },
      othello: { name: "Othello", type: PlayType.tragedy },
      merchant: { name: "The Merchant of Venice", type: PlayType.comedy },
    };

    const renderer = create(<Statement plays={plays} invoice={invoice} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
