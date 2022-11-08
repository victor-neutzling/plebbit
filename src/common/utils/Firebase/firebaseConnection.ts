import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
    collection,
    Firestore,
    getDocs,
    getFirestore,
    QuerySnapshot,
    Query,
    where,
    addDoc,
    query,
    doc,
    CollectionReference,
    DocumentData,
} from "firebase/firestore";
import IPost from "../../types/Post";
import IComment from "../../types/Comment";

export default class FirebaseConnection {
    constructor(auth: any, firestore: any, app: any) {
        FirebaseConnection.auth = auth;
        FirebaseConnection.firestore = firestore;
        FirebaseConnection.storage = getStorage(app);
        FirebaseConnection.db = getFirestore(app);
        FirebaseConnection.postCollectionRef = collection(
            FirebaseConnection.firestore,
            "post"
        );
        FirebaseConnection.userCollectionRef = collection(
            FirebaseConnection.firestore,
            "user"
        );
        FirebaseConnection.commentCollectionRef = collection(
            FirebaseConnection.firestore,
            "comment"
        );
    }
    static firestore: any;
    static storage: any;
    static auth: any;
    static db: any;
    static postCollectionRef: CollectionReference<DocumentData>;
    static userCollectionRef: CollectionReference<DocumentData>;
    static commentCollectionRef: CollectionReference<DocumentData>;

    //creates new user on firebase auth, returns a promise
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

    //login, returns a promise
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

    //logout, returns a promise
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

    //sends image to bucket, returns a promise with the image's url
    public static postImage(image: any) {
        const imageURL = `images/${image.name + v4()}`;
        const imageRef = ref(this.storage, imageURL);

        return uploadBytes(imageRef, image)
            .then((res) => {
                return getDownloadURL(imageRef).then((res) => {
                    return res;
                });
            })
            .catch((err) => {
                console.log(err.code);
                console.log(err.message);
            });
    }
    //gets all posts from database, returns a promise with all posts ordered by date of submission
    public static getPosts() {
        return getDocs(this.postCollectionRef).then((data) => {
            let result = data.docs.map((doc: any) => ({
                ...doc.data(),
            }));
            return result;
        });
    }

    //adds a post to the database, returns a promise
    public static createPost(postData: IPost) {
        return addDoc(this.postCollectionRef, {
            authorEmail: postData.authorEmail,
            content: postData.content,
            date: "",
            id: v4(),
            points: 1,
            title: postData.title,
        });
    }

    //gets author of the post by id, returns a promise with an array containing the post author
    public static getAuthorByEmail(email: string) {
        const q = query(this.userCollectionRef, where("email", "==", email));
        return getDocs(q).then((data) => {
            let result = data.docs.map((doc: any) => ({
                ...doc.data(),
            }));
            return result;
        });
    }

    //adds user to database, should be used along with signup. returns promise
    public static addUser(username: string, email: string, uid: string) {
        return addDoc(this.userCollectionRef, {
            created: "",
            karma: 0,
            uid: uid,
            name: username,
            email: email,
        });
    }

    //gets post by id, returns promise with an array containing the post
    public static getPostByID(id: string) {
        const q = query(this.postCollectionRef, where("id", "==", id));
        return getDocs(q).then((data) => {
            let result = data.docs.map((doc: any) => ({
                ...doc.data(),
            }));
            return result;
        });
    }

    //gets the comment section for a post based on its id. returns a promise containing an array with the comments.
    public static getCommentsByPostID(id: string) {
        const q = query(this.commentCollectionRef, where("postID", "==", id));
        return getDocs(q).then((data) => {
            let result = data.docs.map((doc: any) => ({
                ...doc.data(),
            }));
            return result;
        });
    }

    //adds comment to database, returns promise
    public static addComment(commentData:IComment){
        return addDoc(this.commentCollectionRef, {
            authorID: commentData.user,
            content: commentData.content,
            id: v4(),
            postID: commentData.postID,
            points: commentData.points
        })
    }

    //gets user by id, returns promise with an array containing the user
    public static getUserByID(id:string){
        const q = query(this.userCollectionRef, where("uid", "==", id));
        return getDocs(q).then((data) => {
            let result = data.docs.map((doc: any) => ({
                ...doc.data(),
            }));
            return result;
        });
    }
}
