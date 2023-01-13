import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  token: "",
  login: (token: string): void => {},
  logout: (): void => {}
});

export default AuthContext;