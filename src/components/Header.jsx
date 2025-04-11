import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import ProfileButton from "./ProfileButton";

export default function Header({ title, profileData }) {

    const [time, setTime] = useState("");
    useEffect(() => {
        const updateTime = () => setTime(Timestamp());

        // Initial update
        updateTime();

        // Calculate delay until next full minute
        const now = new Date();
        const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        // This timeout starts the interval at the next full minute
        const timeout = setTimeout(() => {
            updateTime(); // optional: to update at the exact minute
            intervalRef.current = setInterval(updateTime, 60 * 1000);
        }, delay);

        // Store interval so we can clear it later
        const intervalRef = { current: null };

        // Cleanup both timeout and interval
        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);



    return (
        <div className="flex flex-row justify-center pt-2 pb-4">
            <div className="flex flex-col flex-1">
                <p className="font-montserrat text-black text-xl">{title}</p>
                <div className="flex flex-row gap-2">
                    <FaCalendarAlt className="text-unleash-blue text-sm" />
                    <p className="font-montserrat text-xs font-semibold text-unleash-blue">{time}</p>
                </div>
            </div>
            <ProfileButton profileData={profileData} />
        </div>
    );
}

function Timestamp() {
    const now = new Date();
    const options = { month: 'long', year: 'numeric' };
    const datePart = now.toLocaleDateString(undefined, options); // e.g., "March 2025"

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert to 12-hour format

    const timePart = `${hours}:${minutes} ${ampm}`;

    return `${datePart} | ${timePart}`;
}