import { useState } from "react";
import default_user_icon from "../assets/default_user_icon.png"

export default function Dashboard() {
    const [username, setUsername] = useState("Super Admin");
    return (
        <div className="px-[72px] pt-10">
            <div className="flex flex-row">
                <div className="flex flex-col flex-1">
                    <p className="font-poppins text-xs font-light">Welcome back!</p>
                    <p className="font-poppins text-base font-medium">Welcome, {username}! 👋🏼</p>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <img src={default_user_icon} className="w-10 h-10 rounded-full" />
                    <p className="font-poppins text-xs font-medium">{username}</p>
                </div>
            </div>
        </div>
    );
}