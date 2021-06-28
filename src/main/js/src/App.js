import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import OrderInfoForm from "./pages/OrderInfoForm";

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

    const removeItemHandler = (id) => {
        id = "" + id;
        let nouveauItem = {
            ...items,
            [id]: (id in items ? items[id] : 0) - 1,
        };
        setItems(nouveauItem);
        setNumItems(numItems - 1);
        localStorage.setItem("items", JSON.stringify(nouveauItem));
    };

    const removeAllItemsHandler = (id) => {
        id = "" + id;
        let nouveauItem = {
            ...items
        };
        delete nouveauItem[id];
        setItems(nouveauItem);
        console.log(nouveauItem);
        setNumItems(numItems - items[id]);
        localStorage.setItem("items", JSON.stringify(nouveauItem));
    };

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

    const getProductsHandler = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/api/products?page=0&size=2000", requestOptions)
            .then(response => response.json())
            .then(result => setProducts(result._embedded.products))
            .catch(error => console.log('error', error));
    }

    useEffect(getProductsHandler, []);

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
                    <Cart products={products} items={items} addItemHandler={addItemHandler} removeItemHandler={removeItemHandler} removeAllItemsHandler={removeAllItemsHandler} />
                </Route>
                <Route excat path="/order-info-form">
                    <div>sv</div>
                    <OrderInfoForm />
                </Route>
            </Switch>
        </Router>
    );
}


export default App;
