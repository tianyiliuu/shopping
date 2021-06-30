import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";

function App() {

    const [cartItems, setCartItems] = useStickyState({}, "cartItems");
    const [cartTotalAmount, setCartTotalAmount] = useStickyState(0, "cartTotalAmount");
    const adjustCartItemHandler = (itemId, quantityDiff, unitPrice) => {
        setCartTotalAmount(oldAmount => oldAmount + unitPrice * quantityDiff);
        setCartItems(oldCartItem => {
            return {
                ...oldCartItem,
                [itemId]: (itemId in oldCartItem ? oldCartItem[itemId] : 0) + quantityDiff
            };
        });
    };
    const removeCartItemHandler = (itemId, unitPrice) => {
        setCartItems(oldCartItem => {
            const newCartItem = {...oldCartItem};
            setCartTotalAmount(oldAmount => oldAmount - unitPrice * oldCartItem[itemId]);
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
                <Route exact path="/search/:searchName">
                    <Home adjustCartItemHandler={adjustCartItemHandler}/>
                </Route>
                <Route exact path="/products/:productId">
                    <ProductDetails adjustCartItemHandler={adjustCartItemHandler}/>
                </Route>
                <Route excat path="/cart">
                    <Cart cartItems={cartItems} cartTotalAmount={cartTotalAmount}
                          adjustCartItemHandler={adjustCartItemHandler}
                          removeCartItemHandler={removeCartItemHandler}/>
                </Route>
                <Route excat path="/checkout">
                    <CheckOut cartItems={cartItems} cartTotalAmount={cartTotalAmount}/>
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
