import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import {CartContext} from "./context/cart";
import {AuthContext} from "./context/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";

function App() {

    const [user, setUser] = useStickyState(null, "user");

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

    console.log(user);

    return (
        <CartContext.Provider value={{
            cartItems,
            adjustCartItemHandler,
            removeCartItemHandler,
            cartTotalAmount
        }}>
            <AuthContext.Provider value={{
                user,
                setUser
            }}>
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route exact path="/category/:categoryId">
                            <Home/>
                        </Route>
                        <Route exact path="/search/:searchName">
                            <Home/>
                        </Route>
                        <Route exact path="/products/:productId">
                            <ProductDetails/>
                        </Route>
                        <Route excat path="/cart">
                            <Cart/>
                        </Route>
                        <Route excat path="/checkout">
                            <CheckOut/>
                        </Route>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/orders" component={Order} />
                        <Route exact path="/orders/:orderId">
                            <OrderDetails/>
                        </Route>
                    </Switch>
                </Router>
            </AuthContext.Provider>
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
