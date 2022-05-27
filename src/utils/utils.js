export const capitalize = (string) => {
    console.log(string)
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}