import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Cart from "./pages/Cart";

function App() {

    const [items, setItems] = useState({});
    const [numItems, setNumItems] = useState(0);
    const [products, setProducts] = useState([]);

    const addItemHandler = (id) => {
        id = "" + id;
        let nouveauItem = {
            ...items,
            [id]: (id in items ? items[id] : 0) + 1,
        };
        setItems(nouveauItem);
        setNumItems(numItems + 1);
        localStorage.setItem("items", JSON.stringify(nouveauItem));
    };

    const setItemHandler = (id, num) => {
        id = "" + id;
        let nouveauItem = {
            ...items,
            [id]: num,
        };
        setItems(nouveauItem);
        setNumItems(numItems - items[id] + num);
        localStorage.setItem("items", JSON.stringify(nouveauItem));
    }

    useEffect(() => {
        let items = localStorage.getItem("items");
        if (items === null) return;
        items = JSON.parse(items);
        let num = 0;
        for (let key in items) {
            num += items[key];
        }
        setItems(items);
        setNumItems(num);
    }, []);

    const getProductsHander = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/api/products", requestOptions)
            .then(response => response.json())
            .then(result => setProducts(result._embedded.products))
            .catch(error => console.log('error', error));
    }

    useEffect(getProductsHander, []);

    return (
        <Router>
            <Header numItems={numItems}/>
            <Switch>
                <Route exact path="/">
                    <Home products={products} addItemHandler={addItemHandler}/>
                </Route>
                <Route path="/products/:id">
                    <ProductDetails addItemHandler={addItemHandler}/>
                </Route>
                <Route excat path="/cart">
                    <Cart products={products} items={items} setItemHandler={setItemHandler}/>
                </Route>
            </Switch>
        </Router>
    );
}


export default App;
