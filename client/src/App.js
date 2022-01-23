import React from 'react';
import 'materialize-css';
import {useRoutes} from "./routes";
import {BrowserRouter} from 'react-router-dom';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";

const App = () => {
    const {token, userId, login, logout, ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuthenticated
        }}>
            <BrowserRouter>
                {isAuthenticated && <NavBar/>}
                <div className='container'>
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;
