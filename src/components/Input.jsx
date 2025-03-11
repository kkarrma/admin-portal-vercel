import { useState } from "react";
import "./index.scss";
/**
 * @typedef {"button" | "email" | "password" | "text"} typeType
 */

/**
 * @param {{ type: typeType }} props
 */
export default function Input({ type = "text", label = "", id = "", LeftIcon }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="flex flex-row relative outline-white outline-1 rounded-sm gap-2 px-2 py-1 mt-4 w-full">
            {LeftIcon}
            {label && (
                <label
                    for={id}
                    className={`absolute px-1 font-montserrat transition-all duration-200 
                    ${isActive ? "-top-3 text-xs text-white cursor-default bg-unleash-blue" : "bg-transparent left-8 text-base text-white opacity-50 cursor-text"}`}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className="bg-transparent outline-none w-full font-montserrat text-base border-none focus:outline-none focus:ring-0 text-white"
                onFocus={() => setIsActive(true)}
                onBlur={(e) => setIsActive(e.target.value !== "")} // Keep active if there's text
            />
        </div>
    );
}