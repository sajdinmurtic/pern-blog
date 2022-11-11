import axios from 'axios';
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useContext } from 'react';
import {Context} from '../context/userContext'

    const SinglePost = ()=>{
    const [post, setPost] = useState({})

    const navigate = useNavigate()
    const {id} = useParams()
    const {user} = useContext(Context)
    

    useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const res = await axios.get(`/posts/${id}`)
            setPost(res.data)
        }catch(err){
            console.log(err)
        }
    };
    fetchData();
}, [id]);

    
const handleDelete = async()=>{
    try{
        await axios.delete(`/posts/${id}`, {
            headers: {
                Authorization:` Bearer ${user.token}`,
            }
        }); navigate('/')
    }catch(err){
        console.log(err)
    }
}
  return(
        <div className='max-w-2xl py-20 px-8 mx-auto rounded-lg'>
            
                 <div className='text-3xl text-gray-600 font-bold text-center pb-4'>{post.title}</div>
                <div className='text-gray-400 pb-4'>{post.description}</div>
                <div className='flex items-center mt-8 space-x-4'>
                <div className='text-sm'>{post.username}</div>
               </div>
                 <button onClick={handleDelete} className="flex px-3 py-1 space-x-2 mt-8 rounded-full bg-blue-50 text-red-700">Delete</button>
            <button className='flex px-3 py-1 space-x-2 mt-8 rounded-full bg-blue-50 text-red-700'> </button>
            
        </div>
    )
            }
 export default SinglePost