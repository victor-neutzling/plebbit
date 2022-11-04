import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IPost from '../../common/types/Post'
import FirebaseConnection from '../../common/utils/Firebase/firebaseConnection'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Input from '../../components/Input'
import styles from './NewPost.module.scss'

export default function NewPost() {
    const[title,setTitle] = useState('')
    const[image,setImage] = useState(null)
    const[imageURL,setImageURL] = useState('')
    const[post,setPost] = useState<IPost>({} as IPost)

    function uploadImage(event:any){
        event.preventDefault()

        if(image)
        FirebaseConnection.postImage(image,setImageURL)
    }

    useEffect(()=>{
        if(!imageURL) return;

        console.log(imageURL)

    },[imageURL])

  return (
    <div className={styles.newpost}>
        <Header />
        <div className={styles.formwrapper}>
            <h1>create post</h1>
            <form onSubmit={uploadImage} className={styles.form}>
                <label htmlFor="title">title</label>
                <Input type="text" name='title' setter={setTitle}/>
                <label htmlFor="image">image</label>
                <Input type="file" name='image' setter={setImage}/>
                <Button>submit</Button>
            </form>
        
        </div>
    </div>
  )
}
