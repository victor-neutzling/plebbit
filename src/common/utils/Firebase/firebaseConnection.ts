import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default class FirebaseConnection {
    constructor(auth: any, firestore: any, app: any) {
        FirebaseConnection.auth = auth;
        FirebaseConnection.firestore = firestore;
        FirebaseConnection.storage = getStorage(app)
    }
    static firestore: any;
    static storage: any
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
    
    //sends image to bucket, and uses setImageURL from post component to gather the url
    public static postImage(image:any, setter:any) {
        const imageURL = `images/${image.name + v4()}`;    
        const imageRef = ref(this.storage, imageURL);

        return uploadBytes(imageRef, image).then((res)=>{
            getDownloadURL(imageRef).then(res => {
                setter(res)
            })
        }).catch((err) => {
            console.log(err.code)
            console.log(err.message)
        })
    }

    //sends image to bucket but doesn't set an URL
    public static postImageWithoutSetting(image:any) {
        const imageURL = `images/${image.name + v4()}`;    
        const imageRef = ref(this.storage, imageURL);

        return uploadBytes(imageRef, image).then((res)=>{

        }).catch((err) => {
            console.log(err.code)
            console.log(err.message)
        })
    }
}
