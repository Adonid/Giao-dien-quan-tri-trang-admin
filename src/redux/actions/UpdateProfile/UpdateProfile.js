import axios from 'common/Axios';
import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE } from 'redux/constans';
import { ReadCookie } from 'common';

const UpdateProfile = newProfile => async dispatch => {
    
    dispatch({type: UPDATE_PROFILE});

    const res = await axios({
        method: 'POST',
        url: 'admin/',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {
            query: `mutation updateProfile($newInfo: InfoAdmin!) {
                updateProfile(newInfo: $newInfo){
                    userName
                }
                    
            }`,
            variables: {
                "newInfo": newProfile
            }
        }
        })
        .then( res => {
            dispatch( {
                type: UPDATE_PROFILE_SUCCESS,
                payload: {
                    profile: res.data.data.UpdateProfile,
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: UPDATE_PROFILE_ERROR,
                payload: {
                    message: "Đã có lỗi xảy ra. status: 500",
                },
            });
        });
}

export default UpdateProfile;