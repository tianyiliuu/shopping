import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import {CartContext} from "./context/cart";

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
        <CartContext.Provider value={{
            cartItems,
            adjustCartItemHandler,
            removeCartItemHandler,
            cartTotalAmount
        }}>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/category/:categoryId">
                        <Home />
                    </Route>
                    <Route exact path="/search/:searchName">
                        <Home />
                    </Route>
                    <Route exact path="/products/:productId">
                        <ProductDetails />
                    </Route>
                    <Route excat path="/cart">
                        <Cart />
                    </Route>
                    <Route excat path="/checkout">
                        <CheckOut />
                    </Route>
                </Switch>
            </Router>
        </CartContext.Provider>
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
