import blob_bg from "../assets/blob.png";
import upper_left_paw_path from "../assets/upper-left-paw-path.png";
import lower_right_paw_path from "../assets/lower-right-paw-path.png";
import unleash_banner_white from "../assets/unleash_banner_white.png";
import { CiMail } from "react-icons/ci";
import { FiLock } from "react-icons/fi";
import "./styles/webpage.scss"
import Input from "../components/Input";

/**
 * @typedef {"SIGN_IN" | "SIGN_UP_MERCHANT" | "SIGN_IN_MERCHANT"} ModeType
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

            <div className="absolute inset-0 w-80 mx-auto flex flex-col justify-center items-center">
                <img src={unleash_banner_white} alt="background element" className="h-16 mb-12" />

                {/* email input */}
                <Input type="email" label="Email" id="email" LeftIcon={<CiMail className="text-white h-6 w-6" />} />
                <Input type="password" label="Password" id="password" LeftIcon={<FiLock className="text-white h-6 w-6" />} />
                <div className="w-full h-10 cursor-pointer hover:brightness-90 font-montserrat font-semibold text-white bg-unleash-orange rounded-sm shadow-md flex justify-center items-center mt-4">
                    {mode === "SIGN_UP_MERCHANT" ? "CREATE AN ACCOUNT" : "LOGIN"}
                </div>
                {mode === "SIGN_IN" && <div className="w-full h-10 cursor-pointer hover:brightness-90 font-montserrat font-semibold text-white bg-unleash-blue-light rounded-sm shadow-md flex justify-center items-center mt-2">
                    REGISTER AS A NEW MERCHANT
                </div>}

                <p className="font-montserrat text-sm text-white ps-3 text-right mt-1 cursor-pointer ms-auto hover:brightness-90">
                    Forgot password?
                </p>
            </div>
        </div>
    )
}