import { useState } from "react";
import "./styles.scss";
import { IncomeExpenseReport } from "../components/IncomeExpenseReport";
import { ExpenseBreakdown } from "../components/ExpenseBreakdown";

export const Report = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [showReport, setShowReport] = useState(false);
  console.log(selectedReport);
  return (
    <div className="report">
      <h1>Report</h1>
      <select
        name=""
        id=""
        onChange={(e) => {
          setShowReport(false);
          setSelectedReport(e.target.value);
        }}
      >
        <option value="">Select Report</option>
        <option value="incomeVsExpense">Income vs. Expenses</option>
        <option value="expenseBreakdown">Expense Breakdown</option>
      </select>
      <button onClick={() => setShowReport(true)}>Generate</button>
      {selectedReport === "incomeVsExpense" && showReport && (
        <IncomeExpenseReport />
      )}
      {selectedReport === "expenseBreakdown" && showReport && (
        <ExpenseBreakdown />
      )}
    </div>
  );
};
