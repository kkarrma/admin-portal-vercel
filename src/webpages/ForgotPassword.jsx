import { useLocation, useNavigate } from "react-router-dom";
import blob_bg from "../assets/sign-in-page/blob.png";
import upper_left_paw_path from "../assets/sign-in-page/upper-left-paw-path.png";
import lower_right_paw_path from "../assets/sign-in-page/lower-right-paw-path.png";

export default function ForgotPassword() {

    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    if (!email) {
        // no email.
        navigate("/404");
    }

    return (
        <div className="bg-unleash-blue h-full min-h-[100vh] relative">
            {/* background design */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="bg-unleash-blue-light w-[32rem] h-[32rem] rounded-full absolute -left-32 -bottom-32" />
                <img src={blob_bg} alt="background element" className="top-0 right-0 absolute h-[100vh]" />
                <img src={upper_left_paw_path} alt="background element" className="top-8 left-8 absolute opacity-[.18] w-36" />
                <img src={lower_right_paw_path} alt="background element" className="bottom-8 right-80 absolute opacity-[.18] w-36" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
                <p className="font-poppins text-2xl text-white">Pending UI...</p>
                <p className="font-montserrat text-base text-white">You are changing the password for {email}.</p>
                <p className="px-4 py-2 rounded-full text-white bg-unleash-orange font-montserrat text-xs mt-4 hover:brightness-90 select-none cursor-pointer" onClick={(e) => navigate(-1)}>Go Back</p>
            </div>
        </div>
    );
}