import { firebase } from '../firebase/firebase';
import { GoogleAuthProvider, auth } from '../firebase/auth';

// LOGIN
export const userLogin = (uid, name) => ({
  type: 'USER_LOGIN',
  userdata: {
    uid,
    name,
  },
});

// Authentication with Google
export const startUserLogin = () => () => {
  firebase.auth()
    .signInWithPopup(GoogleAuthProvider);
};

export const createUserAuthFail = error => ({
  type: 'USER_AUTH_FAIL',
  error,
});

export const createUserAuthMessage = authMessage => ({
  type: 'USER_AUTH_MESSAGE',
  authMessage,
});

// Authentication with Email and password
export const startCreateUserWithEmailAndPass = (email, password) => dispatch =>
  auth.createUserWithEmailAndPassword(email, password)
    .catch(error => dispatch(createUserAuthFail(error.message)));

export const startSignInWithEmailAndPassword = (email, password) => dispatch =>
  auth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
      let errorMessage;
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        errorMessage = 'Wrong password or username!';
      } else {
        errorMessage = error.message;
      }
      dispatch(createUserAuthFail(errorMessage));
    });

// Send password reset email
export const startSendPasswordResetEmail = email => dispatch =>
  auth.sendPasswordResetEmail(email)
    .then(() => dispatch(createUserAuthMessage('The email was sent. Check out your mailbox.')))
    .catch(error => dispatch(createUserAuthFail(error.message)));

// LOG OUT
export const userLogout = () => ({
  type: 'LOGOUT',
});

export const startUserLogout = () => () => {
  firebase.auth().signOut();
};
