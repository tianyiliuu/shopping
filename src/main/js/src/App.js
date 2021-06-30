import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {

    const [cartItems, setCartItems] = useStickyState({}, "cartItems");
    const adjustCartItemHandler = (itemId, quantityDiff) => {
        setCartItems(oldCartItem => {
            return {
                ...oldCartItem,
                [itemId]: (itemId in oldCartItem ? oldCartItem[itemId] : 0) + quantityDiff
            };
        })
    };
    const removeCartItemHandler = (itemId) => {
        setCartItems(oldCartItem => {
            const newCartItem = {...oldCartItem};
            delete newCartItem[itemId];
            return newCartItem;
        })
    }

    return (
        <Router>
            <Header cartItems={cartItems}/>
            <Switch>
                <Route exact path="/">
                    <Home adjustCartItemHandler={adjustCartItemHandler}/>
                </Route>
                <Route exact path="/category/:categoryId">
                    <Home adjustCartItemHandler={adjustCartItemHandler}/>
                </Route>
                <Route exact path="/products/:productId">
                    <ProductDetails adjustCartItemHandler={adjustCartItemHandler}/>
                </Route>
                <Route excat path="/cart">
                    <Cart cartItems={cartItems} adjustCartItemHandler={adjustCartItemHandler} removeCartItemHandler={removeCartItemHandler} />
                </Route>
            </Switch>
        </Router>
    );
}

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default App;
