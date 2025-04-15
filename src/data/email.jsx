import { USER_ROLES } from "../variables/USER_ROLES";

const EMAILS = {
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

export { EMAILS };