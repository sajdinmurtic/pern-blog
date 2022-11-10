import axios from 'axios';
import {useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Context} from '../context/userContext'

const Login = ()=>{
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const {dispatch} = useContext(Context)
        const navigate = useNavigate()

const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch({type: 'LOGIN_REQUEST'})
    try{
        const res = await axios.post('/users/login', {email, password,})
        dispatch({type:'LOGIN_SUCCESS', payload:res.data});
        navigate('/createpost')
    
    }catch(error){
        dispatch({type:'LOGIN_REJECTED'})
    }
};
    return(
        <div className='flex flex-col sm:justify-center items-center pt-6 sm:pt-0'>
            
            <h2 className="text-center text-3xl my-3 font-bold">Login</h2>
            <form>
                <div class="mt-4">
                    <label class="block mb-2 text-sm" for="email">Email Address</label>
                <input
                required
                type="email"
                placeholder='email'
                name="email"
                className="w-full py-2 px-3 border rounded-md border-gray-300 " 
                onChange={(e)=> setEmail(e.target.value)}
                />
                
                    <label class="block mb-2 text-sm" for="password">Password</label>
                </div>
                <input
                required
                type="password"
                placeholder='password'
                name="password"
                class="w-full py-2 px-3 border rounded-md border-gray-300" 
                onChange={(e)=> setPassword(e.target.value)}
                />
            
                <button onClick={handleSubmit} className="flex px-6 py-3 mt-8 space-x-2 rounded bg-blue-400 text-gray-900">Login</button>
                <div class="flex justify-center mt-6 space-x-2 text-center text-sm">
                    Don't you have an account ?
                    <span></span>
                    <Link to="/register">Register</Link>
                </div>
              
            </form>
        
        </div>
    )
}
export default Login;