import React, { useState } from 'react'
import { createContext } from "react";
export const HelloContext = createContext();
export const HelloStore = ({ children }) => {
    const [worldOrKitty, setWorldOrKitty] = useState("kitty");

    const toggleWorld = () => {
        const val = worldOrKitty === "world" ? "kitty" : "world";
        setWorldOrKitty(val);
    };

    return (
        <HelloContext.Provider value={{ worldOrKitty, toggleWorld }}>
            {children}
        </HelloContext.Provider>
    );
};

