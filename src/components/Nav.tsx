import { NavLink } from "react-router-dom";
import "./styles.scss";

export const Nav = () => {
  return (
    <div className="nav">
      <NavLink to={"/"}>Income</NavLink>
      <NavLink to={"/expense"}>Expense</NavLink>
      <NavLink to={"/savings"}>Savings</NavLink>
      <NavLink to={"/report"}>Reports</NavLink>
      <NavLink to={"/add"}>+ Add Entry</NavLink>
    </div>
  );
};
