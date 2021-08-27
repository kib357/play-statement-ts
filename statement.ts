import { makeStatementData } from "./makeStatementData";
import { makePerformanceCalculator } from "./PerformanceCalculator";
import { renderPlainText } from "./renderPlainText";
import { Invoice, Play } from "./types";

function statement(invoice: Invoice, plays: Record<string, Play>) {
  return renderPlainText(
    makeStatementData(invoice, plays, makePerformanceCalculator)
  );
}

export default statement;
