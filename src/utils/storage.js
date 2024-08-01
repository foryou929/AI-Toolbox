export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const deleteToken = () => {
    return localStorage.removeItem('token');
}