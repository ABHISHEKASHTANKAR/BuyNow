import Cookie from 'js-cookie';

export const checkLoginStatus = () => {
    const token = Cookie.get('token');
    return !!token;
}

export const getToken = () =>{
    return Cookie.get('token');
}