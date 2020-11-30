import axios from 'common/Axios';
import { 
    GET_CATEGORYS_TAGS, GET_CATEGORYS_TAGS_SUCCESS,
    LOGOUT_ADMIN,
    MESSAGE_MINI,
    MESSAGE_MAIN
} from 'redux/constans';
import { ReadCookie } from 'common';
import data from 'views/Dashboard/components/LatestOrders/data';

const GetAllCategorysTags = () => async dispatch => {
    
    dispatch({type: GET_CATEGORYS_TAGS});

    await axios({
        method: 'GET',
        url: 'admin/get-all-categorys-tags',
        headers: { Authorization: "Bearer " + ReadCookie()},
        })
        .then( res => {
            dispatch( {
                type: GET_CATEGORYS_TAGS_SUCCESS,
                payload: {
                    categorys: res.data.categorys,
                    tags: res.data.tags,
                }
            });
        })
        .catch( error => {
            if(typeof(error.response.data.exit) === 'boolean'){
                dispatch( {
                    type: LOGOUT_ADMIN,
                    payload: {
                        logged: false
                    },
                });
                dispatch( {
                    type: MESSAGE_MINI,
                    payload: {
                        message: error.response.data.message,
                        type: "warning"
                    },
                });
            }
            dispatch( {
                type: MESSAGE_MAIN,
                payload: {
                    message: error.response.data.message,
                    type: "warning"
                },
            });
        });

}

export default GetAllCategorysTags;