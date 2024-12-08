import { db } from '@/base';
import { addDoc, collection } from "firebase/firestore";
import { useRef } from 'react';
import './user.css';

export default function Adduser() {
  const usersFolder = collection(db, "users");
  const userFormRef = useRef(null);
  const postsFolder = collection(db, "posts");
  const reelsFolder = collection(db, "reels");
  const storiesFolder = collection(db, "stories");
  const postFormRef = useRef(null);
  const userIDRef = useRef(null);

async function addUserToDB(e){
   e.preventDefault();
   const now = new Date();
  try{
    if(!!userFormRef.current){

          const formData = new FormData(userFormRef.current);
    formData.append('lastBioUpdate',now.toLocaleDateString('en-CA'))
    const request = await addDoc(usersFolder, Object.fromEntries(formData));
    
    console.log(request.id)
    if(userIDRef.current){
     userIDRef.current.value = request.id;
    }
  userFormRef.current.reset();
    
}
  } catch(er){
    console.log(er)
  }
   
}
async function addPostsToDB(e){
  e.preventDefault();
 try{
  if(!!postFormRef.current){

    const formData = new FormData(postFormRef.current);
    const postAccount = formData.get('userID');
    const postFile = formData.get('file');
    const postType = formData.get('postType');
    const postDescription = formData.get('description');
    if(!!postAccount && !!postFile){
      const request = await addDoc((postType=='story'?storiesFolder:postType=='reel'?reelsFolder:postsFolder), {
        userID:postAccount,
        fileURL:'',
        description:postDescription,
      });

      console.log(request.id)
      postFormRef.current.reset();
      if(userIDRef.current){
      userIDRef.current.value = postAccount;
      }
    }
}

 } catch(er){
   console.log(er)
 }
  
}

  return (
    <div>
      <main className='forced-center-row addUserBox'>   
        <h2>Add a user</h2>
        <form ref={userFormRef} className='dataForm' onSubmit={addUserToDB}>
          <div>
        <input placeholder='username' type='text' name='username' />
        <input placeholder='pfp URL' type='text' name='pfp' />
        <textarea style={{display:'block', width:'100%'}} placeholder='bio' type='text' name='bio' />
        </div>
        <input placeholder='followers' type='text' name='followers' />
        <input placeholder='following' type='text' name='following' />
        <input type='checkbox' value={true} id='bot' name='suspicious'/><label htmlFor='bot'>Is it suspicious?</label>
        <div>
         <button type='submit'>Add user</button>
         </div>
         </form>
        
         <hr/>
         <h2>Add a post</h2>
         <form ref={postFormRef} className='dataForm' onSubmit={addPostsToDB}>
          <div>
        <input ref={userIDRef} placeholder='userID' required type='text' name='userID' />
        <select placeholder='Post Type' name="postType">
  <option value="post">Post</option>
  <option value="reel">Reel</option>
  <option value="story">Story</option>
</select>
<input type="file" name="file" accept="image/png, image/jpeg, image/gif
, video/mp4
" />
        <textarea style={{display:'block', width:'100%'}} placeholder='description' type='text' name='description' />
        </div>

        <div>
         <button type='submit'>Add Post</button>
         </div>
         </form>
      </main>

    </div>
  )
}
