import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/reducer";
import { useEffect } from "react";
import axios from "axios";

export const IncomeExpenseReport = () => {
  const income = useSelector((state: State) => state.income);
  const expense = useSelector((state: State) => state.expense);
  const incomeTotal = income.reduce((sum, income) => sum + income.amount, 0);
  const expenseTotal = expense.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "UPDATE_LOADING", payload: true });

        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(BASE_URL + "/income");
        dispatch({ type: "UPDATE_INCOME", payload: response.data.income });
        const response2 = await axios.get(BASE_URL + "/expense");
        dispatch({ type: "UPDATE_EXPENSE", payload: response2.data.expense });
        dispatch({ type: "UPDATE_LOADING", payload: false });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <div className="incomeExpenseReport">
      <h2>Income vs Expense</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {income.map(({ description, amount }) => (
            <tr>
              <td>{description}</td>
              <td style={{ color: "green" }}>Income</td>
              <td>{amount}</td>
            </tr>
          ))}
          {expense.map(({ description, amount }) => (
            <tr>
              <td>{description}</td>
              <td style={{ color: "red" }}>Expense</td>
              <td>{amount}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>Net Total</td>
            <td>Rs. {incomeTotal - expenseTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
