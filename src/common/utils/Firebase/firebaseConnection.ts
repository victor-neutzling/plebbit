import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default class FirebaseConnection {
    constructor(auth: any, firestore: any) {
        FirebaseConnection.auth = auth;
        FirebaseConnection.firestore = firestore;
    }
    static firestore: any;
    static auth: any;

    public static signUp(email: string, password: string) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(firebase.auth().currentUser)
                );
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
            });
    }
    public static signIn(email: string, password: string) {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(firebase.auth().currentUser)
                );
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
            });
    }
    public static signOut() {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                localStorage.removeItem("user");
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
            });
    }
}
