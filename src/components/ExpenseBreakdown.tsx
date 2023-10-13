import { useDispatch, useSelector } from "react-redux";
import { Entry, State } from "../store/reducer";
import { useEffect } from "react";
import axios from "axios";

export const ExpenseBreakdown = () => {
  const expense = useSelector((state: State) => state.expense);
  console.log(expense);
  type Acc = {
    [key: string]: number;
  };
  const list = expense.reduce((acc: Acc, cur: Entry) => {
    if (cur.category in acc) {
      return { ...acc, [cur.category]: acc[cur.category] + cur.amount };
    } else {
      return { ...acc, [cur.category]: cur.amount };
    }
  }, {});

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "UPDATE_LOADING", payload: true });
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(BASE_URL + "/expense");
        dispatch({ type: "UPDATE_EXPENSE", payload: response.data.expense });
        dispatch({ type: "UPDATE_LOADING", payload: false });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  const total = expense.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="expenseBreakdown">
      <h2>Expense Breakdown</h2>

      <table>
        <thead>
          <th>Expense Category</th>
          <th>Amount</th>
        </thead>
        <tbody>
          {Object.entries(list).map((key) => (
            <tr>
              <td>{key[0]}</td>
              <td>Rs. {key[1]}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: "bold" }}>
            <td>Total Expense</td>
            <td>Rs. {total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
