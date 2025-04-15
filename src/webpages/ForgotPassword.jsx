import blob_bg from "../assets/sign-in-page/blob.png";
import upper_left_paw_path from "../assets/sign-in-page/upper-left-paw-path.png";
import lower_right_paw_path from "../assets/sign-in-page/lower-right-paw-path.png";
import unleash_banner from "../assets/unleash_banner.png";
import animals_design from "../assets/sign-in-page/sign-in-page-animals.png";
import { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosLock, IoIosCloseCircle } from "react-icons/io";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { EMAILS } from "../data/email";
import { ALL_ADMINS } from "../variables/USER_ROLES";
import OTPBar from "../components/OTPBar";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [forgotPasswordError, setForgotPasswordError] = useState({ title: "", subtitle: "" });
    const [forgotPasswordErrorStatus, setForgotPasswordErrorStatus] = useState(false);
    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [page, setPage] = useState(1);

    const pageContent = {
        1: {
            header: "Forgot your password?",
            subHeader: "Input your email.",
            form: <EmailInput value={email} setter={setEmail} />,
            primaryText: "Reset Password",
        },
        2: {
            header: email,
            subHeader: "Please enter your 6-digit code.",
            form: <OTPBar onComplete={(otp) => { confirmOTPFunction(otp) }} />,
            primaryText: "Continue",
        },
        3: {
            header: "Create new password",
            subHeader: "Create and confirm your new password.",
            form: <NewPasswordInput password={{ value: password, setter: setPassword }} confirmPassword={{ value: confirmPassword, setter: setConfirmPassword }} />,
            primaryText: "Reset Password",
        },
        4: {
            header: "We notified the admin!",
            subHeader:
                "We notified the admin for the request of password change. Please standby and wait for your new password. Thank you!",
        },
    };

    const { header, subHeader, form, primaryText } = pageContent[page];

    const nextPage = (pageNumber) => setPage(pageNumber);

    const sendOTP = () => {
        var generatedOTP = generateOTP();
        setOTP(generatedOTP);
        console.log(`OTP: ${generatedOTP}`);
    }

    const confirmOTPFunction = (confirmedOTP) => {
        if (OTP === confirmedOTP) {
            setPage(3);
        } else {

            console.log(`OTP:${OTP}; confirmedOTP:${confirmedOTP}`);
            setForgotPasswordError({ title: "OTP Error!", subtitle: "Incorrect OTP used. Please try again." });
            // show error
            setForgotPasswordErrorStatus(true);
            setTimeout(() => {
                setForgotPasswordErrorStatus(false);
            }, 2500);

        }
    }

    const checkNewPassword = () => {
        if (password === "") setForgotPasswordError({ title: "Input credentials!", subtitle: "Please input your password." });
        else if (password !== confirmPassword) setForgotPasswordError({ title: "Passwords do not match!", subtitle: "Please make sure that confirm password matches the password." });
        else {
            navigate("/sign-in");
            return;
        }

        // show error
        setForgotPasswordErrorStatus(true);
        setTimeout(() => {
            setForgotPasswordErrorStatus(false);
        }, 2500);
    }

    const primaryButtonClick = () => {
        switch (page) {
            case 1:
                if (ALL_ADMINS.includes(EMAILS[email]?.role)) {
                    nextPage(4);
                } else if (EMAILS[email]) {
                    sendOTP();
                    nextPage(2);
                } else {
                    setForgotPasswordError({ title: "Email not found!", subtitle: "Please make sure the email is correct." });
                    // show error
                    setForgotPasswordErrorStatus(true);
                    setTimeout(() => {
                        setForgotPasswordErrorStatus(false);
                    }, 2500);
                }
                break;
            case 2:
                nextPage(3);
                break;
            case 3:
                checkNewPassword();
                break;
            default:
                break;
        }
    };

    const secondaryButtonClick = () => {
        if (page === 2) {
            sendOTP();
        } else {
            navigate("/sign-in");
        }
    };

    return (
        <div className="bg-unleash-blue min-h-screen relative">
            {/* Background Design */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="bg-unleash-blue-light w-[32rem] h-[32rem] rounded-full absolute -left-32 -bottom-32" />
                <img src={blob_bg} alt="Blob" className="absolute top-0 right-0 h-screen" />
                <img src={upper_left_paw_path} alt="Upper Paw" className="absolute top-8 left-8 opacity-20 w-36" />
                <img src={lower_right_paw_path} alt="Lower Paw" className="absolute bottom-8 right-80 opacity-20 w-36" />
            </div>

            {/* Form Container */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-md py-9 px-14 rounded-2xl flex flex-col gap-4 justify-center bg-white">
                <img
                    src={animals_design}
                    alt="Animals Design"
                    className="absolute top-0 left-0 w-full transform -translate-y-full"
                />
                <img src={unleash_banner} alt="Unleash Banner" className="h-10 w-fit" />
                <p className="font-montserrat text-base font-bold">{header}</p>
                <p className="text-website-gray font-medium text-xs font-montserrat w-full">{subHeader}</p>
                <div className="w-full h-[1px] bg-website-gray rounded-full" />

                {form}

                {page !== 4 && (
                    <div
                        className="w-full py-3 cursor-pointer hover:brightness-90 font-montserrat font-medium text-white bg-unleash-blue rounded-sm flex justify-center items-center text-xs"
                        onClick={primaryButtonClick}
                    >
                        {primaryText}
                    </div>
                )}

                <div
                    className="w-full cursor-pointer hover:brightness-90 font-montserrat font-medium text-unleash-blue rounded-sm flex justify-center items-center text-sm"
                    onClick={secondaryButtonClick}
                >
                    {page === 2 ? (
                        <>
                            Did not receive code? <span className="underline font-semibold">&nbsp;Resend code</span>
                        </>
                    ) : (
                        <>
                            Go back to&nbsp;<span className="font-semibold italic">Login</span>&nbsp;page
                        </>
                    )}
                </div>
            </div>

            <div className={`absolute flex flex-row z-20 justify-center items-center gap-6 top-20 left-1/2 -translate-x-1/2 py-4 px-4 rounded-2xl border-[1px] border-website-red-light w-md bg-website-light
                            ${forgotPasswordErrorStatus ? "animate-float-in-out" : "hidden"}`}>
                <IoIosCloseCircle className="w-10 h-10 text-website-red " />
                <div className="flex flex-col flex-1 font-montserrat">
                    <p className="font-semibold text-base text-black">{forgotPasswordError.title}</p>
                    <p className="font-medium text-xs text-website-gray">{forgotPasswordError.subtitle}</p>
                </div>
                <IoCloseOutline className="w-10 h-10 text-website-gray p-2" />
            </div>
        </div>
    );
}

function EmailInput({ value = "", setter }) {
    return (
        <div>
            <Input
                type="text"
                label="Email Address"
                id="email_address"
                LeftIcon={<FaUserLarge className="p-1" />}
                input={value}
                setInput={setter}
            />
        </div>
    );
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

function NewPasswordInput({ password, confirmPassword }) {
    return (
        <>
            <Input type="password" label="Password" id="password" LeftIcon={<IoIosLock />} toggle input={password.value} setInput={password.setter} />
            <Input type="password" label="Confirm Password" id="confirm-password" LeftIcon={<IoIosLock />} toggle input={confirmPassword.value} setInput={confirmPassword.setter} />
        </>
    );
}