import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  function login(user) {
    setUser(user);
    setToken(user.token);
    setAuthenticated(true);
    localStorage.setItem("token", user.token);
  }

  function logout() {
    setUser("");
    setToken("");
    setAuthenticated(false);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/user", {
        headers: {
          Authorization: `Token: ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setUser(result.user);
        setAuthenticated(true);
        setToken(token);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        token,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
