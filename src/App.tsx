import "./App.css";
import Header from "./components/Header";
import Register from "./pages/Register";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    useNavigate,
} from "react-router-dom";
import FirebaseConnection from "./common/utils/Firebase/firebaseConnection";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBBVwUFSJIeXT7FNBk_mZErSTeBVYHXN3w",
    authDomain: "plebbit-8eaca.firebaseapp.com",
    projectId: "plebbit-8eaca",
    storageBucket: "plebbit-8eaca.appspot.com",
    messagingSenderId: "586944514603",
    appId: "1:586944514603:web:2f28cb0f1441968471f86e",
    measurementId: "G-5XRWT0JM0K",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

function App() {
    const fb = new FirebaseConnection(auth, firestore, app);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/newpost",
            element: <NewPost />
        },
    ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
