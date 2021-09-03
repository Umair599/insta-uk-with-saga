import {SIGN_IN, SIGN_OUT, FETCH_POSTS,SIGN_UP} from './types';
import {INSTAGRAM_APP_ID, REDIRECT_URI, INSTAGRAM_APP_SECRET} from '../apis/credentials';
import history from '../../history';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const ROOT_URL='https://graph.instagram.com';
export const signOut = ()=>({
        type: SIGN_OUT
});
export const signUp = formValues=>({
    type: SIGN_UP,
    formValues
});
export const signIn = formValues=>({
    type: SIGN_IN,
    formValues
});

export const fetchCode = (code, email) =>  {
    const formData = new FormData();
    formData.append('client_id', INSTAGRAM_APP_ID);
    formData.append('client_secret', INSTAGRAM_APP_SECRET);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', REDIRECT_URI);
    formData.append('code', code);
    fetch('https://api.instagram.com/oauth/access_token', {
        method: 'post',
        body: formData
    })
    .then(res => res.json())
    .then(
    (result) => {
        fetch(`${ROOT_URL}/access_token?client_secret=${INSTAGRAM_APP_SECRET}&access_token=${result.access_token}&grant_type=ig_exchange_token`).then(response => response.json()).then(res => {
            firebase.firestore().collection("users").doc(email).update({
                instaUserId:result.user_id,
                instaAccessToken: res.access_token,
            });
            history.push(`/${result.user_id}/?accessToken=${res.access_token}`);
        }).catch(err => {
        console.log(err, 'Error occured while getting Long Access Token');
    });
    }).catch(err => {
        console.log(err, 'Error occured while getting shortAccessToken and userId Failed');
    });
};
export const fetchPosts = token=> ({
    type: FETCH_POSTS,
    token
});