import { Outlet } from "react-router-dom";
import "./App.scss";
import { Nav } from "./components/Nav";
import { Loader } from "./components/Loader";
import { useSelector } from "react-redux";
import { State } from "./store/reducer";

function App() {
  const isLoading = useSelector((state: State) => state.isLoading);
  return (
    <>
      {isLoading && <Loader />}
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
