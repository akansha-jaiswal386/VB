"use client";
import { createContext, useState, useEffect, useCallback, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check for stored auth data when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Login function to set user state and store in localStorage
  const login = useCallback((userData, authToken) => {
    const userWithId = {
      ...userData,
      _id: userData._id // Ensure _id is preserved
    };
    setUser(userWithId);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userWithId));
    localStorage.setItem("token", authToken);
  }, []);

  // Logout function to clear user state and remove data from localStorage
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add this custom hook at the end of the file
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
