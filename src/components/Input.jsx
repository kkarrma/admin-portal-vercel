import React, { useState } from "react";
import "./index.scss";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
/**
 * @typedef {"button" | "email" | "password" | "text" | "textbox" | "tel"} typeType
 */

/**
 * @param {{ type: typeType }} props
 */
export default function Input({ type = "text", label = "", id = "", LeftIcon, toggle = false, toggleState = false, input, setInput, className, classNameInput }) {
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
        <div className={`flex flex-row gap-3 relative outline-unleash-blue rounded-sm px-2 py-3 w-full ${isActive ? "outline-2" : "outline-1"} ${className}`}>
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
            {
                type === "textbox" ?
                    <textarea
                        id={id}
                        className={`bg-transparent outline-none w-full font-montserrat resize-none text-base border-none focus:outline-none focus:ring-0 text-black ${classNameInput}`}
                        onFocus={() => setIsActive(true)}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onBlur={(e) => setIsActive(e.target.value !== "")}
                    />
                    :
                    <input
                        id={id}
                        type={tempType}
                        className={`bg-transparent outline-none w-full font-montserrat text-base border-none focus:outline-none focus:ring-0 text-black ${classNameInput}`}
                        onFocus={() => setIsActive(true)}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onBlur={(e) => setIsActive(e.target.value !== "")} // Keep active if there's text
                    />

            }
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