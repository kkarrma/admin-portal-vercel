import blob_bg from "../assets/sign-in-page/blob.png";
import upper_left_paw_path from "../assets/sign-in-page/upper-left-paw-path.png";
import lower_right_paw_path from "../assets/sign-in-page/lower-right-paw-path.png";
import unleash_banner from "../assets/unleash_banner.png";
import animals_design from "../assets/sign-in-page/sign-in-page-animals.png"
import { FaUserLarge } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import "./styles/webpage.scss"
import Input from "../components/Input";

/**
 * @typedef {"SIGN_IN" | "SIGN_UP"} ModeType
 */

/**
 * @param {{ mode: ModeType }} props
 */

export default function Login({ mode }) {
    return (
        <div className="bg-unleash-blue h-full min-h-[100vh] relative">
            {/* background design */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="bg-unleash-blue-light w-[32rem] h-[32rem] rounded-full absolute -left-32 -bottom-32" />
                <img src={blob_bg} alt="background element" className="top-0 right-0 absolute h-[100vh]" />
                <img src={upper_left_paw_path} alt="background element" className="top-8 left-8 absolute opacity-[.18] w-36" />
                <img src={lower_right_paw_path} alt="background element" className="bottom-8 right-80 absolute opacity-[.18] w-36" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-1/2 w-md py-9 px-14 rounded-2xl flex flex-col gap-4 justify-center bg-website-light">
                <img
                    src={animals_design}
                    alt="background element"
                    className="w-full absolute top-0 left-0 transform -translate-y-full"
                />

                {/* Unleash Logo */}
                <img src={unleash_banner} alt="background element" className="h-10 w-fit" />

                {/* Merchant Sign In */}
                {mode === "SIGN_IN" && (
                    <>
                        <p className="font-montserrat text-base font-bold">Log in to your Merchant Account.</p>
                        <div className="font-montserrat text-xs font-medium text-website-gray">
                            New here? Register as a Merchant!
                        </div>
                        <p className="font-montserrat text-xs font-medium text-unleash-blue bg-website-gray-100 border-2 border-unleash-blue rounded-sm w-full text-center py-4 cursor-pointer select-none hover:brightness-95">Register as a Merchant</p>
                    </>
                )}

                {/* line */}
                <div className="w-full h-0.5 bg-website-gray rounded-full"></div>

                {/* email & password input */}
                <Input type="email" label="Email" id="email" LeftIcon={<FaUserLarge className="p-1" />} />
                <Input type="password" label="Password" id="password" LeftIcon={<IoIosLock />} toggle />

                {/* Primary Button */}
                <div className="w-full py-3 cursor-pointer hover:brightness-90 font-montserrat font-medium text-white bg-unleash-blue rounded-sm flex justify-center items-center text-xs">
                    {mode === "SIGN_UP" ? "CREATE AN ACCOUNT" : "Log in"}
                </div>

                {/* Secondary Button */}
                <div className="w-full cursor-pointer hover:brightness-90 font-montserrat font-medium text-unleash-blue rounded-sm flex justify-center items-center text-sm brightness-95">
                    {mode === "SIGN_UP" ? "CREATE AN ACCOUNT" : "Forgot Password"}
                </div>
            </div>
        </div>
    )
}