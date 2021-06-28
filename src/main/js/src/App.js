import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";

function App() {

    const [items, setItems] = useState({});
    const [numItems, setNumItems] = useState(0);

    const addItemHandler = (id) => {
        id = "" + id;
        setItems({
            ...items,
            "id": (id in items ? items[id] : 0) + 1
        });
        setNumItems(numItems + 1);
    };


    return (
        <Router>
            <Header numItems={numItems}/>
            <Switch>
                <Route exact path="/">
                    <Home addItemHandler={addItemHandler}/>
                </Route>
                <Route path="/products/:id">
                    <ProductDetails addItemHandler={addItemHandler}/>
                </Route>
            </Switch>
        </Router>
    );
}


export default App;
