import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Entry, State } from "../store/reducer";
import "./styles.scss";
import { Link } from "react-router-dom";
import { Table } from "../components/Table";

export const Income = () => {
  const [filterState, setFilterState] = useState({ sort: "", filter: "" });
  const dispatch = useDispatch();
  const income = useSelector((state: State) => state.income);
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "UPDATE_LOADING", payload: true });

        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(BASE_URL + "/income");
        dispatch({ type: "UPDATE_INCOME", payload: response.data.income });
        dispatch({ type: "UPDATE_LOADING", payload: false });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  const handleSortCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === "Ascending"
      ? setFilterState((prev) => ({
          ...prev,
          sort: e.target.checked ? "Ascending" : "",
        }))
      : setFilterState((prev) => ({
          ...prev,
          sort: e.target.checked ? "Descending" : "",
        }));
  };
  const handleSortFilter = (arr: Entry[]) => {
    if (filterState.sort === "") {
      return arr;
    }
    return arr.sort((a, b) => {
      if (filterState.sort === "Ascending") {
        return a.amount - b.amount;
      } else if (filterState.sort === "Descending") {
        return b.amount - a.amount;
      } else {
        return 0;
      }
    });
  };
  const handleCategoryFilter = (arr: Entry[]) => {
    if (filterState.filter === "") {
      return arr;
    }
    return arr.filter((entry) => {
      return entry.category.includes(filterState.filter);
    });
  };
  const filters = [handleSortFilter, handleCategoryFilter];
  const filteredIncome = filters.reduce((acc, cur) => cur(acc), income);
  const categoryList = income.reduce((acc: string[], cur: Entry) => {
    if (!acc.includes(cur.category)) {
      return [...acc, cur.category];
    }
    return acc;
  }, []);

  return (
    <div className="income">
      {income.length > 0 ? (
        <div>
          <div className="income__actions">
            <label>
              Sort By Amount:
              <br />
              <br />
              <input
                type="checkbox"
                name="Ascending"
                onChange={handleSortCheckbox}
                checked={filterState.sort === "Ascending"}
              />
              <label htmlFor="">Ascending</label>
              {"   "}
              <input
                type="checkbox"
                name="Descending"
                onChange={handleSortCheckbox}
                checked={filterState.sort === "Descending"}
              />
              <label htmlFor="">Descending</label>
            </label>
            <label htmlFor="">
              Filter By Category
              <br />
              <br />
              <select
                className="income__actions__select"
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    filter: e.target.value,
                  }))
                }
              >
                <option value="">None</option>
                {categoryList.map((category: string) => (
                  <option id="category" value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Table data={filteredIncome} />
        </div>
      ) : (
        <p>
          Add Income <Link to={"/add"}>Here</Link>{" "}
        </p>
      )}
    </div>
  );
};
