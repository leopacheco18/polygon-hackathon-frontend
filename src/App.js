import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useMoralis } from "react-moralis";
import Home from './pages/home/Home';
function App() {
  
  const { isAuthenticated } =
    useMoralis();




  return (
   <>
   {isAuthenticated ?
    <Router>
    

    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
</Router>
   :
   <Home />
   
   }
   
   </>
  );
}

export default App;
