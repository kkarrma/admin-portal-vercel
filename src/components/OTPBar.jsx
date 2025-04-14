import { useState, useRef } from "react";

export default function OTPBar({ value = "", onComplete }) {
    const [otp, setOtp] = useState(value.padEnd(6, " "));
    const inputsRef = useRef([]);

    const handleChange = (index, e) => {
        const newOtp = otp.split("");
        newOtp[index] = e.target.value.slice(-1); // Only allow one character
        const updatedOtp = newOtp.join("");

        setOtp(updatedOtp);

        // Move focus to the next input if a number is entered
        if (e.target.value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        // ✅ Trigger onComplete only when all 6 inputs are filled with valid digits (no spaces)
        if (!updatedOtp.includes(" ") && updatedOtp.length === 6) {
            onComplete?.(updatedOtp);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            const newOtp = otp.split("");
            newOtp[index] = " ";
            setOtp(newOtp.join(""));

            // Move focus to the previous input
            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    return (
        <div className="w-full flex flex-row justify-between gap-2">
            {Array.from({ length: 6 }, (_, i) => (
                <input
                    key={i}
                    type="text"
                    className="w-10 h-10 text-center outline-2 outline-website-gray-200 rounded-sm bg-website-gray-100"
                    value={otp[i] !== " " ? otp[i] : ""}
                    maxLength={1}
                    ref={(el) => (inputsRef.current[i] = el)}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                />
            ))}
        </div>
    );
}
