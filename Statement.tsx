import React from "react";
import { Invoice, Play } from "./types";

type Props = { invoice: Invoice; plays: Record<string, Play> };

const Statement: React.FC<Props> = ({ invoice, plays }) => {
  let totalAmount = 0;
  let volumeCredits = 0;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  const rows = invoice.performances.map((perf, i) => {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    totalAmount += thisAmount;

    return (
      <li key={i}>
        {play.name}: {format(thisAmount / 100)} ({perf.audience} seats)
      </li>
    );
  });

  return (
    <div>
      <h1>Statement for {invoice.customer}</h1>
      <ol>{rows}</ol>
      <p>Amount owed is {format(totalAmount / 100)}</p>
      <p>You earned {volumeCredits} credits</p>
    </div>
  );
};

export default Statement;
