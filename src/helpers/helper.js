import { jwtDecode } from 'jwt-decode';

// Function to get token details from local storage
export const getTokenDetail = () => {
    try {
        let token = localStorage.getItem("authUser");
        let tokendata = jwtDecode(token);
        return tokendata;
    } catch (Error) {
        return null;
    }
}

// Function to determine form type (edit or not) based on URL
export const formTypeHandler = () => {
    let isEdit = window.location.pathname.includes("edit");
    let id;
    if (isEdit) {
        id = window.location.pathname.split("/").pop();
    }
    return { isEdit, id };
}

// Function to check if the user has access to a specific activity and screen
export const checkIsAccess = (activityName, screenName) => {
    let routes = JSON.parse(localStorage.getItem("usermenu")) || [];
    let accessedRoutes = routes.filter(x => x.hasAccess === "True" && x.displayName === screenName && x.activityName === activityName);
    return accessedRoutes.length > 0;
}

// Constant for AES Encryption Key
export const AES_EncryptionKey = "DTJRAGHUS1513750";
