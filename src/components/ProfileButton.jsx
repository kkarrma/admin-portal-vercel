import default_user_icon from "../assets/default_user_icon.png";
export default function ProfileButton({ profileData }) {
    return (
        <div className="flex flex-row py-2 ps-2 pe-4 bg-[#F1F5F7] rounded-full gap-6 cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={profileData.pfp ? profileData.pfp : default_user_icon} alt={`${profileData.username}'s pfp`} className="w-full object-contain" />
            </div>
            <div className="flex flex-col flex-1 justify-center select-none">
                <p className="font-montserrat text-website-gray font-medium text-xs">Welcome Back</p>
                <p className="font-montserrat text-black font-semibold text-base">{profileData.username}</p>
            </div>
        </div>
    );
}