import unleash_logo from "../assets/unleash_banner.png"
import unleash_icon from "../assets/unleash_icon.png"
import { IoPaw } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { BsCartFill, BsCartXFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { TbReceiptFilled } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import { FaBoxes, FaUsers, FaPaw } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import "./index.scss"
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import { ROLES_CONFIGS } from "../variables/USER_ROLES";

export default function Sidebar({ accountStatus, accountType, profileData, children }) {

    const SIDEBAR_ITEMS = [
        {
            name: "Dashboard",
            icon: <MdDashboard />,
            href: "/",
            access: "ADMIN"
        },
        {
            name: "Product Order",
            icon: <BsCartFill />,
            href: "/orders/product",
            access: "ADMIN"
        },
        {
            name: "Return & Refund Order",
            icon: <BsCartXFill />,
            href: "/orders/return-refund",
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
            icon: <FaBoxes />,
            href: "/management/product",
            access: "ADMIN"
        },
        {
            name: "Article Management",
            icon: <TbReceiptFilled />,
            href: "/management/article",
            access: "ADMIN"
        },
        {
            name: "User Management",
            icon: <FaUsers />,
            href: "/management/user",
            access: "ADMIN"
        },
        {
            name: "Pet Breed Management",
            icon: <FaPaw />,
            href: "/management/pet-breed",
            access: "ADMIN"
        },
    ]
    const BLACKLIST_LINKS = ["/sign-in", "/sign-up"]
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const logout = () => {
        accountStatus.setter(false);
    }

    return (
        BLACKLIST_LINKS.includes(location.pathname) ?
            <>
                {children}
            </>
            :
            <div className="flex h-[100vh] bg-website-color justify-center items-center">
                <div className={`transition-all duration-300 z-10 bg-website-light h-[95.75%] ml-5 shadow-sm flex flex-col pb-4 rounded-lg`}>

                    {/* Dashboard Header */}
                    <div className="flex flex-row items-center mx-8 gap-16 my-8">
                        <div className={`flex flex-row gap-1 flex-1`}>
                            <img src={open ? unleash_logo : unleash_icon} alt="Unleash Logo" className={`transition-all select-none duration-100 h-10 ${open ? "" : ""}`}
                                onClick={() => setOpen(true)} />
                            <div className={`px-2 py-1 rounded-full bg-unleash-blue mt-auto h-fit justify-center items-center flex ${open ? "" : "hidden"}`}>
                                <p className="text-[10px] font-montserrat text-white font-medium">{ROLES_CONFIGS[accountType]?.tag.name}</p>
                            </div>
                        </div>
                        <div className={`flex justify-center items-center cursor-pointer ${open ? "h-full w-7" : "hidden"}`}
                            onClick={() => setOpen(false)}>
                            <IoMenu className="w-6 h-6 text-website-gray" />
                        </div>
                    </div>

                    <div className="h-0.5 w-full bg-website-gray-200"></div>

                    {/* Dashboard Items */}
                    <div className={`flex flex-col items-center mt-8 flex-1`}>
                        {
                            SIDEBAR_ITEMS.map((item, index) => <SidebarItem id={index} open={open} currentLocation={location.pathname} icon={item.icon} name={item.name} href={item.href} />)
                        }
                    </div>

                    <div
                        className={`flex flex-row transition-all duration-200 font-montserrat mb-4 text-sm font-medium select-none text-website-gray-400 rounded-lg cursor-pointer items-center bg-website-light hover:brightness-95
                            ${open ? "opacity-[.68] mx-3 p-5 " : "opacity-100 mx-auto p-3"}`}
                        onClick={(e) => logout()}>
                        <PiSignOutBold className={`${open ? "w-5 h-5" : "w-7 h-7"}`} />
                        <p className={`text-sm transition-all duration-100 ease-in-out ${open ? "w-full ms-4" : "w-0 text-nowrap overflow-hidden"}`}>Logout</p>
                    </div>
                    <IoPaw className={`absolute opacity-[.18] text-website-gray-400 -rotate-[23.21deg] w-8 h-auto bottom-5 right-5 z-10 ${open ? "" : "hidden"}`} />
                </div>
                <div className={`flex-1 h-[95.75%] px-6 overflow-y-scroll duration-150 ease-in-out`}>
                    <Header title={ROLES_CONFIGS[accountType]?.header} profileData={profileData} />
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
        <div className={`flex flex-row items-center cursor-pointer rounded-lg hover:brightness-95
                ${state ? "bg-website-color text-unleash-blue" : "bg-website-light text-website-gray "}
                ${open ? "w-[84.85%] py-4 px-3" : "w-14 h-14"}`}
            onClick={(e) => onClickAction(e, href)}>
            {icon && React.cloneElement(icon, { className: "w-6 h-6 mx-auto" })}
            <p
                className={`font-poppins text-sm select-none ${open ? "w-full ms-3" : "hidden"}`} >
                {name}
            </p>
        </div>
    );
}