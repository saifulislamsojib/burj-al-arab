import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const setUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: name
    }).then(() => {

    }).catch(err => {

    });
}

export const getTokenId = () => {
    return firebase.auth().currentUser.getIdToken(true)
    .then(idToken => {
        return idToken;
      }).catch(error => {
        return error;
      });
}

const setUser = res => {
    const {email, displayName, photoURL} = res.user;
    const newUser = {
        email,
        name: displayName,
        photo: photoURL
    };
    return newUser;
}

export const createUser = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
        setUserName(name)
        return setUser(res);
    })
    .catch((err) => {
        return err;
    });
}

export const signingUser = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err;
    });
}

export const googleSignIn = ()=> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err;
    });
}

export const githubSignIn = () => {
    const provider = new firebase.auth.GithubAuthProvider();

    return firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err;
    });
}

export const fbSignIn = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    
    return firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err;
    });
}