<<<<<<< HEAD
export default function Forbidden() {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <h1>ERROR 403</h1>
            <h3>Forbidden access.</h3>
=======
import { useNavigate } from "react-router-dom";
import blob_bg from "../../assets/sign-in-page/blob.png";
import upper_left_paw_path from "../../assets/sign-in-page/upper-left-paw-path.png";
import lower_right_paw_path from "../../assets/sign-in-page/lower-right-paw-path.png";

export default function Forbidden() {
    const navigate = useNavigate();
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
                <p className="font-poppins text-2xl text-white">ERROR 403</p>
                <p className="font-montserrat text-base text-white">Forbidden access.</p>
                <p className="px-4 py-2 rounded-full text-white bg-unleash-orange font-montserrat text-xs mt-4 hover:brightness-90 select-none cursor-pointer" onClick={(e) => navigate(-1)}>Go Back</p>
            </div>
>>>>>>> 0a74f80d0425c42e649ffd93755542e9d27c72c0
        </div>
    );
}