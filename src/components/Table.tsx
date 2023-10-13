import { Entry } from "../store/reducer";
import "./styles.scss";
export const Table = ({ data }: { data: Entry[] }) => {
  const total = data.reduce((sum, income) => sum + income.amount, 0);
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{new Date(item.date).toLocaleDateString()}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>Rs.{item.amount}</td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td>
            <b>Grand Total</b>
          </td>
          <td>RS.{total}</td>
        </tr>
      </tbody>
    </table>
  );
};
