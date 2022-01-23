import {createContext} from "react";

export const AuthContext = createContext({
   token: null,
   userId: null,
   login: (jwtToken, id) => {},
   logout: () => {},
   isAuthenticated: false
});
