const USER_ROLES = {
    SUPER_ADMIN: "SUPER_ADMIN",
    MARKETING_ADMIN: "MARKETING_ADMIN",
    MERCHANT: "MERCHANT",
    VISITOR: "VISITOR"
}

const ALL = [USER_ROLES.SUPER_ADMIN, USER_ROLES.MARKETING_ADMIN, USER_ROLES.MERCHANT, USER_ROLES.VISITOR];
const ALL_AUTHORIZED = [USER_ROLES.SUPER_ADMIN, USER_ROLES.MARKETING_ADMIN, USER_ROLES.MERCHANT];
const ALL_ADMINS = [USER_ROLES.SUPER_ADMIN, USER_ROLES.MARKETING_ADMIN];

const ROLES_CONFIGS = {
    [USER_ROLES.SUPER_ADMIN]: {
        header: "Admin Portal",
        tag: {
            name: "Super Admin"
        }
    },
    [USER_ROLES.MARKETING_ADMIN]: {
        header: "Marketing Admin Portal",
        tag: {
            name: "Marketing Admin"
        }
    },
    [USER_ROLES.MERCHANT]: {
        header: "Merchant Centre",
        tag: {
            name: "Merchant"
        }
    }
}

export { USER_ROLES, ALL, ALL_AUTHORIZED, ALL_ADMINS, ROLES_CONFIGS };