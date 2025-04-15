import blob_bg from "../assets/sign-in-page/blob.png";
import upper_left_paw_path from "../assets/sign-in-page/upper-left-paw-path.png";
import lower_right_paw_path from "../assets/sign-in-page/lower-right-paw-path.png";
import unleash_banner from "../assets/unleash_banner.png";
import animals_design from "../assets/sign-in-page/sign-in-page-animals.png";
import bottom_animals from "../assets/sign-in-page/sign-up-merchant/bottom-animals.png";
import bottom_blob from "../assets/sign-in-page/sign-up-merchant/bottom-blob.png";
import { FaUserLarge, FaPhone, FaCircleCheck } from "react-icons/fa6";
import { IoIosLock, IoIosCloseCircle } from "react-icons/io";
import { MdFileUpload, MdDescription } from "react-icons/md";
import { IoStorefrontSharp, IoCloseOutline } from "react-icons/io5";
import "./styles/webpage.scss"
import Input from "../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import OTPBar from "../components/OTPBar";
import { USER_ROLES } from "../variables/USER_ROLES";
import { EMAILS } from "../data/email";

/**
 * @typedef {"SIGN_IN" | "SIGN_UP"} ModeType
 */

/**
 * @param {{ mode: ModeType }} props
 */

export default function Login({ mode, accountStatus, accountType, profileData }) {

    const MOCK_ACCOUNTS = {
        "super_admin": {
            password: "password1234",
            role: USER_ROLES.SUPER_ADMIN,
            profileData: {
                pfp: null,
                username: "Super Admin"
            }
        },
        "marketing1": {
            password: "password1234",
            role: USER_ROLES.MARKETING_ADMIN,
            profileData: {
                pfp: null,
                username: "Marketing Admin"
            }
        },
        "merchant_account@gmail.com": {
            password: "password1234",
            role: USER_ROLES.MERCHANT,
            profileData: {
                pfp: null,
                username: "Merchant"
            }
        }
    }

    const navigate = useNavigate();
    const location = useLocation();

    // GENERAL STATES
    const [signInError, setSignInError] = useState({ title: "", subtitle: "" });
    const [signInErrorStatus, setSignInErrorStatus] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // FOR SIGN UP STATES
    const [signUpPage, setSignUpPage] = useState(1);
    const [OTP, setOTP] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmOTP, setConfirmOTP] = useState("");
    const [shopName, setShopName] = useState("");
    const [shopDescription, setShopDescription] = useState("");
    const [shopPhoneNumber, setShopPhoneNumber] = useState("");
    const [successSignUp, setSuccessSignUp] = useState(false);
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Reset state when route changes
    useEffect(() => {
        setSignInError({ title: "", subtitle: "" });
        setSignInErrorStatus(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSignUpPage(1);
        setOTP("");
        setShopName("");
        setShopDescription("");
        setShopPhoneNumber("");
    }, [location.pathname]); // Runs whenever the URL changes

    const primaryButtonTrigger = () => {
        if (mode === "SIGN_IN") {
            if (incorrectCredentials()) return;
            accountStatus.setter(true);
            accountType.setter(EMAILS[email].role);
            profileData.setter(EMAILS[email].profileData);
            navigate("/");
        } else if (mode === "SIGN_UP") {
            switch (signUpPage) {
                case 1:
                    /**
                     * temporarily store credentials.
                     * send OTP to email.
                     */
                    checkSignUpCredentials();
                    break;
                case 2:
                    confirmOTPFunction();
                    break;
                case 3:
                    /**
                     * store profile details.
                     * show popup of successful account creation.
                     */
                    confirmStoreData();
                    break;
                default:
                    /**
                     * DO NOTHING.
                     */
                    break;
            }
        }
    }

    const sendOTP = () => {
        var generatedOTP = generateOTP();
        setOTP(generatedOTP);
        console.log(`OTP: ${generatedOTP}`);
    }

    const confirmOTPFunction = (confirmedOTP) => {
        if (OTP === confirmedOTP) {
            setSignUpPage(3);
            /**
             * store credentials as merchant account.
             */
        } else {
            console.log(`OTP:${OTP}; confirmedOTP:${confirmedOTP}`);
            setSignInError({ title: "OTP Error!", subtitle: "Incorrect OTP used. Please try again." });
            // show error
            setSignInErrorStatus(true);
            setTimeout(() => {
                setSignInErrorStatus(false);
            }, 2500);
        }
    }

    const confirmStoreData = () => {
        if (shopName === "") {
            setSignInError({ title: "Input information!", subtitle: "Please input shop name." });
        } else if (shopDescription === "") {
            setSignInError({ title: "Input information!", subtitle: "Please input shop description." });
        } else if (shopPhoneNumber === "") {
            setSignInError({ title: "Input information!", subtitle: "Please input shop contact number." });
        } else if (shopPhoneNumber.trim() && !/^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(shopPhoneNumber)) {
            setSignInError({ title: "Invalid information!", subtitle: "Please input valid shop contact number." });
        } else {
            successfulSignUpPopUp();
            return;
        }

        // show error
        setSignInErrorStatus(true);
        setTimeout(() => {
            setSignInErrorStatus(false);
        }, 2500);
    }

    const incorrectCredentials = () => {
        // set error message
        if (email === "") {
            setSignInError({ title: "Input credentials!", subtitle: "Please input your email." });
        } else if (password === "") {
            setSignInError({ title: "Input credentials!", subtitle: "Please input your password." });
        } else if (!EMAILS[email]) {
            setSignInError({ title: "Incorrect Email!", subtitle: "Email not registered in the system." });
        } else if (password !== EMAILS[email]?.password) {
            setSignInError({ title: "Incorrect Password!", subtitle: "Please make sure the password is correct." });
        } else {
            return false;
        }

        // show error
        setSignInErrorStatus(true);
        setTimeout(() => {
            setSignInErrorStatus(false);
        }, 2500);
        return true;
    }

    const successfulSignUpPopUp = () => {
        setSuccessSignUp(true);
        setTimeout(() => {
            setSuccessSignUp(false);

            accountStatus.setter(true);
            accountType.setter(USER_ROLES.MERCHANT);
            profileData.setter({
                pfp: imagePreview,
                username: shopName
            });
            navigate("/");
        }, 2500);
    }

    const checkSignUpCredentials = () => {
        if (email === "") setSignInError({ title: "Input credentials!", subtitle: "Please input your email." });
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setSignInError({ title: "Invalid Email!", subtitle: "Please input valid email address." });
        else if (password === "") setSignInError({ title: "Input credentials!", subtitle: "Please input your password." });
        else if (password !== confirmPassword) setSignInError({ title: "Passwords do not match!", subtitle: "Please make sure that confirm password matches the password." });
        else {
            sendOTP();
            setSignUpPage(2);
            return;
        }
        // show error
        setSignInErrorStatus(true);
        setTimeout(() => {
            setSignInErrorStatus(false);
        }, 2500);
    }

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            // TODO: Save or upload image here
        }
    };

    const forgotPassword = () => {
        navigate("/account/forgot-password");
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

            {signUpPage === 3 ?
                <>
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 w-xl shadow-md rounded-2xl flex flex-col justify-center overflow-hidden">
                        <div className="relative bg-unleash-blue-light h-14 flex items-center justify-center">
                            <p className="font-montserrat font-semibold text-white text-lg">Shop Profile</p>
                            <IoCloseOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-white cursor-pointer" />
                        </div>
                        <div className="w-full flex flex-col px-14 py-9 bg-white gap-6">
                            {/* SHOP LOGO */}
                            <div
                                className="flex flex-col mx-auto select-none cursor-pointer justify-center items-center gap-3"
                                onClick={handleImageClick}
                            >
                                <div className="flex w-28 h-28 bg-website-gray-200 border-2 border-gray-300 rounded-full justify-center items-center overflow-hidden">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Logo Preview"
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <MdFileUpload className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <p className="font-montserrat font-medium text-base text-website-gray">
                                    Shop Logo
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <Input type="text" label="Shop Name" id="shop-name" LeftIcon={<IoStorefrontSharp />} className="outline-website-gray-300" input={shopName} setInput={setShopName} />
                            <Input type="textbox" label="Shop Description" id="shop-description" LeftIcon={<MdDescription />} className="outline-website-gray-300" classNameInput="h-20" input={shopDescription} setInput={setShopDescription} />
                            <Input type="tel" label="Phone Number" id="phone-number" LeftIcon={<FaPhone />} className="outline-website-gray-300" input={shopPhoneNumber} setInput={setShopPhoneNumber} />
                            <div className="rounded-sm bg-unleash-blue-light text-sm text-white font-medium font-montserrat w-full py-4 flex justify-center items-center select-none cursor-pointer hover:brightness-95"
                                onClick={(e) => primaryButtonTrigger()}>Continue</div>
                        </div>
                    </div>
                    <div className={`relative inset-0 h-screen w-screen ${successSignUp ? "" : "hidden"}`}>
                        <div className={`absolute z-10 top-1/2 left-1/2 bg-white -translate-1/2 pt-10 w-96 rounded-2xl flex flex-col gap-4 justify-center overflow-hidden ${successSignUp ? "animate-float-in-out" : "hidden"}`}>
                            <p className="font-montserrat text-3xl font-semibold text-black w-full text-center">You are all set!</p>
                            <p className="font-montserrat text-sm font-medium text-website-green w-full text-center">Start selling now!</p>
                            {/* Circle Check Icon with background effects */}
                            <div className="relative w-20 h-20 mx-auto flex justify-center items-center">
                                <FaCircleCheck className="z-50 w-12 h-12 text-website-green absolute" />
                                <div className="absolute z-40 w-16 h-16 rounded-full bg-website-green opacity-20" />
                                <div className="absolute z-30 w-20 h-20 rounded-full bg-website-green opacity-10" />
                            </div>

                            <div className={`relative h-40 w-full flex justify-center items-center`}>
                                <img src={bottom_blob} className="absolute w-full bottom-0" />
                                <img src={bottom_animals} className="absolute h-32" />
                            </div>
                        </div>
                        <div className="h-screen w-screen bg-black opacity-20" />
                    </div>
                </>
                :
                <div className="absolute top-7/12 left-1/2 -translate-1/2 w-md py-9 px-14 rounded-2xl flex flex-col gap-4 justify-center bg-white">
                    <img
                        src={animals_design}
                        alt="background element"
                        className="w-full absolute top-0 left-0 transform -translate-y-full"
                    />

                    {/* Unleash Logo */}
                    <img src={unleash_banner} alt="background element" className="h-10 w-fit" />

                    <p className="font-montserrat text-base font-bold">
                        {
                            mode === "SIGN_IN" ?
                                "Log in to your Account."
                                :
                                mode === "SIGN_UP" && signUpPage === 1 ?
                                    "Sign Up"
                                    :
                                    email
                        }
                    </p>

                    {
                        mode === "SIGN_UP" && signUpPage === 2 &&
                        <p className="text-website-gray font-medium text-xs font-montserrat w-2/3">
                            Please enter the verification code sent to your email
                        </p>
                    }

                    {/* Merchant Sign Up */}
                    {(mode === "SIGN_IN") && (<>
                        <div className="font-montserrat text-xs font-medium text-website-gray">
                            New here? Sign up as a Merchant!
                        </div>
                        <p
                            className="font-montserrat text-xs font-medium text-unleash-blue bg-website-gray-light border-[1px] border-unleash-blue rounded-sm w-full text-center py-4 cursor-pointer select-none hover:brightness-95"
                            onClick={() => navigate("/sign-up")}>
                            Sign up as a Merchant
                        </p>
                    </>)
                    }
                    {/* line */}
                    <div className="w-full h-[1px] bg-website-gray rounded-full"></div>

                    {/* email & password input */}
                    {signUpPage === 1 ?
                        <>
                            <Input type={mode === "SIGN_IN" ? "text" : "email"} label={mode === "SIGN_UP" ? "Email Address" : "Username"} id={mode === "SIGN_UP" ? "email_address" : "username"} LeftIcon={<FaUserLarge className="p-1" />} input={email} setInput={setEmail} />
                            <Input type="password" label="Password" id="password" LeftIcon={<IoIosLock />} toggle input={password} setInput={setPassword} />
                            {mode === "SIGN_UP" &&
                                <Input type="password" label="Confirm Password" id="confirm-password" LeftIcon={<IoIosLock />} toggle input={confirmPassword} setInput={setConfirmPassword} />}
                        </>
                        :
                        <OTPBar onComplete={(otp) => {
                            confirmOTPFunction(otp);
                        }} />
                    }
                    {/* Primary Button */}
                    <div className="w-full py-3 cursor-pointer hover:brightness-90 font-montserrat font-medium text-white bg-unleash-blue rounded-sm flex justify-center items-center text-xs"
                        onClick={() => primaryButtonTrigger()}>
                        {mode === "SIGN_UP" ? (signUpPage === 1 ? "Sign Up" : "Continue") : "Log in"}
                    </div>

                    {/* Secondary Button */}
                    {mode === "SIGN_IN" && <div className={`w-full cursor-pointer hover:brightness-90 font-montserrat font-medium text-unleash-blue rounded-sm flex justify-center items-center text-sm`}
                        onClick={(e) => forgotPassword()}>
                        Forgot Password
                    </div>}
                    {mode === "SIGN_UP" && signUpPage === 2 && <div className={`w-full font-montserrat font-medium text-website-gray rounded-sm flex justify-center items-center text-sm`}>
                        Did not receive code? &nbsp;<span className="text-unleash-blue underline cursor-pointer hover:brightness-90" onClick={() => sendOTP()}>Resend code</span>
                    </div>}
                </div>
            }

            <div className={`absolute flex flex-row z-20 justify-center items-center gap-6 top-20 left-1/2 -translate-x-1/2 py-4 px-4 rounded-2xl border-[1px] border-website-red-light w-md bg-website-light
                ${signInErrorStatus ? "animate-float-in-out" : "hidden"}`}>
                <IoIosCloseCircle className="w-10 h-10 text-website-red " />
                <div className="flex flex-col flex-1 font-montserrat">
                    <p className="font-semibold text-base text-black">{signInError.title}</p>
                    <p className="font-medium text-xs text-website-gray">{signInError.subtitle}</p>
                </div>
                <IoCloseOutline className="w-10 h-10 text-website-gray p-2" />
            </div>
        </div>
    )
}

function generateOTP() {
    const length = 6;
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}