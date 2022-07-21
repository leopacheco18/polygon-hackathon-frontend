import "./App.css";
import { useMoralis } from "react-moralis";
import Home from "./pages/home/Home";
import LayoutOwn from "./pages/layout/LayoutOwn";
import {HashRouter as Router} from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  const { isAuthenticated } = useMoralis();

  return <>{isAuthenticated ? 
    <Router><LayoutOwn /> </Router>: <Home />}</>;
}

export default App;
