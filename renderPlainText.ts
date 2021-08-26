import { StatementData } from "./types";

export function renderPlainText({
  performances,
  customer,
  totalAmount,
  totalVolumeCredits,
}: StatementData) {
  let result = `Statement for ${customer}\n`;
  for (let perf of performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount)}\n`;
  result += `You earned ${totalVolumeCredits} credits\n`;
  return result;
}
function usd(input: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(input / 100);
}
