import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  auth,
  firestore,
} from "../firebase/firebase";
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER
} from "constants/ActionTypes";
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  userSignUpSuccess
} from "actions/Auth";


const createUserWithEmailPasswordRequest = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

const signInUserWithEmailPasswordRequest = async (email, password) =>
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(authUser => authUser)
    .catch(error => error);

const signOutRequest = async () =>
  await auth
    .signOut()
    .then(authUser => authUser)
    .catch(error => error);


function* createUserWithEmailPassword({ payload }) {
  const { email, password, name, phone, age, active} = payload;
  try {
    const signUpUser = yield call(
      createUserWithEmailPasswordRequest,
      email,
      password,
      name,
      phone,
      age,
      active
    );
    if (signUpUser.message) {
      yield put(showAuthMessage(signUpUser.message));
    } else {
      localStorage.setItem("user_id", signUpUser.user.uid);
      let userObj = {
        uid: signUpUser.user.uid,
        name: name,
        email: email,
        age: age,
        phone: phone,
        active: false,
      };
      firestore
        .collection("users")
        .add(userObj)
        .then(function() {
          // Update successful.
        })
        .catch(function(error) {
          // An error happened.
        });
      yield put(userSignUpSuccess(userObj));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}




function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const signInUser = yield call(
      signInUserWithEmailPasswordRequest,
      email,
      password
    );
    if (signInUser.message) {
      yield put(showAuthMessage(signInUser.message));
    } else {
      localStorage.setItem("user_id", signInUser.user.uid);
      localStorage.setItem("email", signInUser.user.email);
      yield put(userSignInSuccess(signInUser.user.uid));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signOutRequest);
    if (signOutUser === undefined) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("email");
      yield put(userSignOutSuccess(signOutUser));
    } else {
      yield put(showAuthMessage(signOutUser.message));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}


export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser), fork(createUserAccount), fork(signOutUser)]);
}