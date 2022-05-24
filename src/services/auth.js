export const TOKEN_FIELD = "auth-token";
export const USER_FIELD = "auth-user";

export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_FIELD);

    console.log('token')
    console.log(token)

    if (!token || token === null || token === "") {
        return false;
    }

    return true;
};

export function getToken() {
    if (localStorage.getItem(TOKEN_FIELD))
        return localStorage.getItem(TOKEN_FIELD);
    return null;
}

export function getUser() {
    if (localStorage.getItem(USER_FIELD))
        return JSON.parse(localStorage.getItem(USER_FIELD));
    return null;
}

export function Logout() {
    localStorage.clear();
    window.location.reload();
}
