export function getAccessToken(){
    const token = window.sessionStorage.getItem("token");
    if(token !== '' && typeof token !== 'undefined'){
        return token;
    }
}