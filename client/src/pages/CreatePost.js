import axios from 'axios'
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/userContext';

const CreatePost = ()=>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
         try {
        const res = await axios.post('/posts/add',{user,title, description},
        { 
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        );navigate('/')
          return res
    } catch(err){
    
}
}

return(
    <div className='flex flex-col sm:justify-center items-center pt-6 sm:pt-0'>
            
            <h2 className="text-center text-3xl my-3 font-bold">Create new post</h2>
        <form>
        <div class="mt-4">
                    <label class="block mb-2 text-sm" for="title">Title</label>
            <input 
            type='title'
            placeholder='title'
            className="w-full py-2 px-3 border rounded-md border-gray-300"
            onChange={e=> setTitle(e.target.value)}
            />
            <label class="text-sm" for="description">Description </label>
            <textarea rows="3" 
            
            className="block w-full rounded-md focus:ring  bg-gray-300 "
            onChange={e=> setDescription(e.target.value)}
            />
            
            <button onClick={handleSubmit} className="flex px-6 py-3 mt-8 space-x-2 rounded bg-blue-400 text-gray-900">Create Post</button>
            </div>
            </form>
      </div>
)
}
export default CreatePost