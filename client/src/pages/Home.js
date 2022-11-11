import axios from 'axios';
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'



    const Home = ()=>{
    const [posts, setPosts] = useState([])

    const navigate = useNavigate()    
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get('/posts')
                setPosts(res.data)
            }catch(err){
                console.log(err)
            }
        };
        fetchData();
    }, []);
    return(
        <div>
            <div className='container px-10 py-6 max-w-4xl mx-auto rounded-lg'>
            
            {posts.map((post, key)=>{
                return(
                <div key={key} >
                
                
                <div className='mt-3' onClick={()=>{
                    navigate(`/post/${post.id}`)
                }}>
                <div className='mb-2 text-3xl font-bold text-black-800'>{post.title}</div>
                <div className='mb-5 text-gray-300'>{post.description} </div>
                     </div>
                    </div>
            )})}
            </div>     
        </div>
    )
}
export default Home;