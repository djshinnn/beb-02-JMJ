import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./reset.css";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Create from "./views/Create";
import Home from "./views/Home";
import Mypage from "./views/Mypage";
import Explore from "./views/Explore";
import { useState } from "react";


function App() {
  const [account, setAccount] = useState(false);

  return (
    <Router>
      <nav>
          <Nav account={account} setAccount={setAccount}/>
      </nav>
      <main>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Create">
              <Create account={account} setAccount={setAccount}/>
            </Route>
            <Route path="/Mypage">
              <Mypage account={account} setAccount={setAccount}/>
            </Route>
            <Route>
              <Explore />
            </Route>
          </Switch>
        </div>
      </main>
      <footer>
        <div className="container">
          <Footer/>
        </div>
      </footer>     
    </Router>
  );
}

export default App;
