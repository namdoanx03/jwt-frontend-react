import './App.scss';
import Nav from './components/Navigation/Nav';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Users from './components/ManageUsers/Users';
import { useEffect, useState } from 'react';
import _ from "lodash"

function App() {
  const [ account , setAccount] = useState({})

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if(session){
      setAccount(JSON.parse(session))
    }
  }, [])

  return (
    <>
    <Router>
      <div className='app-container'>
          {account && !_.isEmpty(account) && account.isAuthenticated
            && <Nav />
          }
          <Switch>
            <Route path="/news">
              News
            </Route>
            <Route path="/about">
              About
            </Route>
            <Route path="/contact">
             Contact
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/" exact>
              Home
            </Route>
            <Route path="*">
              404 not found
            </Route>
          </Switch>
      </div>
    </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
