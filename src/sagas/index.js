import { put, call,all, takeLatest, takeEvery} from 'redux-saga/effects';
import {SIGN_IN, FETCH_POSTS, GET_POSTS, SIGN_UP} from '../components/actions/types';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {INSTAGRAM_APP_ID, REDIRECT_URI, INSTAGRAM_APP_SECRET} from '../components/apis/credentials';
import { push } from 'react-router-redux';
import history from '../history';
 
function* loginWithEmailSaga (payload) {
  try {
    yield call(firebase.auth().signInWithEmailAndPassword(payload.formValues.email, payload.formValues.password).then((resp) => {
      const docRef = firebase.firestore().doc(`/users/${payload.formValues.email}`);
      docRef.get().then((data) => {
           history.push(`/${data.data().instaUserId}/?accessToken=${data.data().instaAccessToken}`);
      });
    }));
  } catch (error) {
   console.log(error.message);
  }
}
  function* registerWithEmailSaga (payload) {
    try {
        yield call(firebase.auth().createUserWithEmailAndPassword(payload.formValues.email, payload.formValues.password ).then((resp) => {
        const docRef = firebase.firestore().doc(`/users/${payload.formValues.email}`);
        let user = {};
        user.name = payload.formValues.name;
        user.email = payload.formValues.email;
        user.photoURL = resp.user.photoURL;
        user.age = payload.formValues.age;
        user.address = payload.formValues.address;
        user.instaUserId='';
        user.instaAccessToken='';
        docRef.set(user);
        window.location = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
      })
      .catch((e) => {
        console.log(e.message);
      }));

    } catch (error) {
      console.log(error.message);
    }
  }
  function *getPosts (payload) {
    let fetch_url = `https://graph.instagram.com/me/media?fields=id,username,timestamp,caption,media_url,media_type,permalink,children&access_token=${payload.token}`;
    const data = yield fetch(fetch_url).then(response => response.json()).then(res =>res.data) ;
    yield put({type: GET_POSTS, data});
  }
export default function* rootSaga() {
  yield all([
    takeEvery(SIGN_UP, registerWithEmailSaga),
    takeEvery(SIGN_IN, loginWithEmailSaga),
    takeEvery(FETCH_POSTS, getPosts),
  ]);
}