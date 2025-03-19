import React, { useState } from "react";
import "./index.scss";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
/**
 * @typedef {"button" | "email" | "password" | "text"} typeType
 */

/**
 * @param {{ type: typeType }} props
 */
export default function Input({ type = "text", label = "", id = "", LeftIcon, toggle = false, toggleState = false }) {
    const [isActive, setIsActive] = useState(false);
    const [tempType, setTempType] = useState(type);
    const [toggleCurrentState, setToggleCurrentState] = useState(toggleState);

    const toggleTrigger = () => {
        setToggleCurrentState(!toggleCurrentState);
        if (type === "password") {
            setTempType(!toggleCurrentState ? "text" : "password");
            console.log(`Password state: ${!toggleCurrentState ? "text" : "password"}`);
        }
    }

    return (
        <div className={`flex flex-row items-center gap-3 relative outline-unleash-blue rounded-sm px-2 py-3 w-full ${isActive ? "outline-2" : "outline-1"}`}>
            {LeftIcon && React.cloneElement(LeftIcon, { ...LeftIcon.props, className: `text-website-gray h-6 w-6 ${LeftIcon.props.className || ""}` })}
            {label && (
                <label
                    for={id}
                    className={`absolute px-1 font-montserrat transition-all duration-200 
                    ${isActive ? "-top-3 text-xs text-website-gray cursor-default bg-website-light" : "bg-transparent left-8 text-sm text-website-gray opacity-50 cursor-text"}`}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={tempType}
                className="bg-transparent outline-none w-full font-montserrat text-base border-none focus:outline-none focus:ring-0 text-black"
                onFocus={() => setIsActive(true)}
                onBlur={(e) => setIsActive(e.target.value !== "")} // Keep active if there's text
            />
            {toggle && type === "password" && (
                toggleCurrentState ?
                    <FaEyeSlash className="text-website-gray w-6 items-center justify-center cursor-pointer select-none"
                        onClick={() => toggleTrigger()} />
                    :
                    <FaEye className="text-website-gray w-6 items-center justify-center cursor-pointer select-none"
                        onClick={() => toggleTrigger()} />
            )}
        </div>
    );
}