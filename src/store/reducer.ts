export type Entry = {
  amount: number;
  description: string;
  date: Date;
  category: string;
  _id: string;
};
export type State = {
  income: Entry[];
  expense: Entry[];
  savings: Entry[];
  isLoading: boolean;
};
type Action = {
  type:
    | "UPDATE_EXPENSE"
    | "UPDATE_INCOME"
    | "UPDATE_SAVINGS"
    | "UPDATE_LOADING";
  payload: Entry[];
};
const initialState: State = {
  income: [],
  expense: [],
  savings: [],
  isLoading: false,
};
export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "UPDATE_INCOME":
      return {
        ...state,
        income: action.payload,
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expense: action.payload,
      };
    case "UPDATE_SAVINGS":
      return {
        ...state,
        savings: action.payload,
      };
    case "UPDATE_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
