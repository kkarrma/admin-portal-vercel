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
        <div></div>
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