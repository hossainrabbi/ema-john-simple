import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProdactDetail from './components/ProdactDetail/ProdactDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UseContext = createContext();

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState({});

    return (
        <UseContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Router>
                <p>Email: {loggedInUser.email}</p>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Shop />
                    </Route>
                    <Route path="/shop">
                        <Shop />
                    </Route>
                    <Route path="/review">
                        <Review />
                    </Route>
                    <PrivateRoute path="/inventory">
                        <Inventory />
                    </PrivateRoute>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute path="/shipment">
                        <Shipment />
                    </PrivateRoute>
                    <Route path="/product/:productKey">
                        <ProdactDetail />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </UseContext.Provider>
    );
};

export default App;
