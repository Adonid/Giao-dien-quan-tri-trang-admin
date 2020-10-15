import Axios from 'axios';
import axios from 'axios';

const readCookie = () =>
{
    var allcookies = window.document.cookie;

    // Get all the cookies pairs in an array
    var cookiearray = allcookies.split(';');

    // Now take key value pair out of this array
    for(var i=0; i<cookiearray.length; i++){
        let name = cookiearray[i].split('=')[0];
        let value = cookiearray[i].split('=')[1];
        if(name==="__Sucure_user" && value)
            return value;
    }
    return null;
}

axios.defaults.baseURL = process.env.BASE_URL_API;
axios.defaults.headers.common['authorization'] = `Bearer ${readCookie()}`;

export default axios;