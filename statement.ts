import { makeStatementData } from "./makeStatementData";
import { renderPlainText } from "./renderPlainText";
import { Invoice, Play } from "./types";

function statement(invoice: Invoice, plays: Record<string, Play>) {
  return renderPlainText(makeStatementData(invoice, plays));
}

export default statement;
