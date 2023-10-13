import { useState } from "react";
import "./styles.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
export const AddEntry = () => {
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    category: "",
    type: "",
  });
  const { description, amount, category, type } = formData;
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_LOADING", payload: true });
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(BASE_URL + `/add-${type}`, {
        description: description,
        amount: amount,
        category: category,
        type: type,
      });
      console.log(response);
      if (response.status === 200) {
        dispatch({ type: "UPDATE_LOADING", payload: false });
        setFormData({
          description: "",
          amount: 0,
          category: "",
          type: "",
        });
        alert("Success! Entry added successfully");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="addEntry">
      <h3>Add Entry Form</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Description: <br />{" "}
          <input
            required
            type="text"
            name="description"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.name, e.target.value)
            }
            value={description}
          />
        </label>
        <label htmlFor="">
          Amount: <br />{" "}
          <input
            required
            type="text"
            name="amount"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.name, e.target.value)
            }
            value={amount}
          />
        </label>
        <label htmlFor="">
          Category: <br />{" "}
          <input
            required
            type="text"
            name="category"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.name, e.target.value)
            }
            value={category}
          />
        </label>
        <label htmlFor="">
          Type: <br />
          <select
            required
            name="type"
            id=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange(e.target.name, e.target.value)
            }
            value={type}
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="savings">Savings</option>
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};
