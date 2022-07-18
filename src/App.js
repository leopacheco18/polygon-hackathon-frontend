import "./App.css";
import { useMoralis } from "react-moralis";
import Home from "./pages/home/Home";
import LayoutOwn from "./pages/layout/LayoutOwn";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  const { isAuthenticated } = useMoralis();

  return <>{isAuthenticated ? <LayoutOwn /> : <Home />}</>;
}

export default App;
