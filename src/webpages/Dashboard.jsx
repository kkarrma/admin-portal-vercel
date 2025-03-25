import { useEffect, useState } from "react";
import default_user_icon from "../assets/default_user_icon.png"

export default function Dashboard() {
    const [username, setUsername] = useState("Super Admin");
    const [role, setRole] = useState("Admin");
    const [dateTime, setDateTime] = useState(getCurrentDateTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const seconds = new Date().getSeconds();

            if (seconds === 0) {
                setDateTime(getCurrentDateTime());
            }

            if (seconds === 1) {
                setDateTime(getCurrentDateTime());
            }

            const currentTime = getCurrentDateTime();
            if (dateTime !== currentTime) {
                setDateTime(currentTime);
            }
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [dateTime]);

    return (
        <div className="px-[72px] pt-10">
            <div className="flex flex-row">
                <div className="flex flex-col flex-1">
                    <p className="font-montserrat text-3xl">{role} Portal</p>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <img src={default_user_icon} className="w-10 h-10 rounded-full" />
                    <p className="font-poppins text-xs font-medium">{username}</p>
                </div>
            </div>
        </div>
    );
}

function getCurrentDateTime() {
    const now = new Date();

    const month = now.toLocaleString('en-US', { month: 'long' });
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month} ${year} | ${hours}:${minutes} ${ampm}`;
}