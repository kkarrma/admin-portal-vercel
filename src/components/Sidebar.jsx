import unleash_logo from "../assets/unleash_banner_white.png"
import unleash_icon from "../assets/unleash_icon.png"
import paw from "../assets/paw.png";
import { BiHomeAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { RiRefund2Line } from "react-icons/ri";
import { LuBox } from "react-icons/lu";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import "./index.scss"
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Sidebar({ children }) {

    const SIDEBAR_ITEMS = [
        {
            name: "Dashboard",
            icon: <BiHomeAlt />,
            href: "/",
            access: "ADMIN"
        },
        {
            name: "Product Order",
            icon: <IoCartOutline />,
            href: "/orders/product",
            access: "ADMIN"
        },
        {
            name: "Return & Refund Order",
            icon: <PiPackage />,
            href: "/orders/return-and-refund",
            access: "ADMIN"
        },
        {
            name: "Cancellation & Refund",
            icon: <RiRefund2Line />,
            href: "/orders/cancellation-and-refund",
            access: "ADMIN"
        },
        {
            name: "Product Management",
            icon: <LuBox />,
            href: "/management/product",
            access: "ADMIN"
        },
        {
            name: "Article Management",
            icon: <HiOutlineNewspaper />,
            href: "/management/article",
            access: "ADMIN"
        },
        {
            name: "User Management",
            icon: <FaRegUserCircle />,
            href: "/management/user",
            access: "ADMIN"
        },
    ]
    const BLACKLIST_LINKS = ["/sign-in", "/sign-up/merchant", "/sign-in/merchant"]
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const logout = () => {
        navigate("/sign-in");
    }

    return (
        BLACKLIST_LINKS.includes(location.pathname) ?
            <>
                {children}
            </>
            :
            <div className="relative h-[100vh] bg-website-light">
                <div className={`absolute z-10 bg-unleash-blue h-full shadow-sm flex flex-col py-8 ${open ? "w-72" : "w-auto"}`}
                    onClick={() => setOpen(true)}>
                    <div
                        className={`absolute top-2 right-2 p-2 rounded-full hover:brightness-90 bg-unleash-blue cursor-pointer ${open ? "" : "hidden"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                        }}>
                        <IoClose className="w-5 h-5 text-white" />
                    </div>
                    <div className={`transition-all duration-100 ${open ? "" : "p-3 rounded-lg w-fit mx-auto"}`}>
                        <img src={open ? unleash_logo : unleash_icon} alt="Unleash Logo" className={`transition-all select-none duration-100 ${open ? "h-12 w-auto object-contain mx-auto" : "h-7 w-7"}`} />
                    </div>
                    <div className={`flex flex-col mt-16 h-full ${open ? "ps-6 " : "px-6"}`}>
                        {
                            SIDEBAR_ITEMS.map((item, index) => <SidebarItem id={index} open={open} currentLocation={location.pathname} icon={item.icon} name={item.name} href={item.href} />)
                        }
                    </div>

                    <div
                        className={`flex flex-row transition-all duration-200 flex-1 font-poppins mb-4 select-none text-white rounded-l-lg cursor-pointer items-center bg-unleash-blue hover:brightness-90
                            ${open ? "opacity-[.68] ms-3 p-5 " : "rounded-r-lg opacity-100 mx-auto p-3"}`}
                        onClick={(e) => logout()}>
                        <PiSignOutBold className={`${open ? "w-5 h-5" : "w-7 h-7"}`} />
                        <p className={`text-sm transition-all duration-100 ease-in-out ${open ? "w-full ms-4" : "w-0 text-nowrap overflow-hidden"}`}>Logout</p>
                    </div>
                    <img src={paw} alt="paw" className="absolute opacity-[.18] -rotate-[70.18deg] w-8 h-auto bottom-5 right-5 z-10" />
                </div>
                <div className={`flex-1 duration-150 ease-in-out ${open ? "ms-80" : "ms-28"}`}>
                    {children}
                </div>
            </div>
    );
}

function SidebarItem({ currentLocation, icon, name, href, open }) {
    const state = currentLocation === href;
    const navigate = useNavigate();

    const onClickAction = (e, href) => {
        navigate(href);
    }

    return (
        <div
            className={`flex flex-row items-center p-3 w-full cursor-pointer rounded-l-lg transition-all duration-500 ease-in-out hover:brightness-90
                ${state ? "bg-white text-unleash-orange" : "bg-unleash-blue text-white "}
                ${open ? "" : "rounded-r-lg"}`}
            onClick={(e) => onClickAction(e, href)}>
            {icon && React.cloneElement(icon, { className: "w-7 h-7" })}
            <p
                className={`font-poppins text-sm select-none transition-all duration-100 ease-in-out
                ${open ? "w-full ms-3" : "w-0 text-nowrap overflow-hidden"}`} >
                {name}
            </p>
            <IoIosArrowForward className={`w-7 h-7 transition-transform duration-200 ease-in-out
                ${state ? "hidden" : "bg-unleash-blue text-white "}
                ${open ? "" : "hidden"}`} />
        </div>
    );
}