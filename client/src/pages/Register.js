import axios from 'axios';
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'


const Register = ()=>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError(false)
        try{
            await axios.post('/users', {
                username,
                email,
                password,
            });
            navigate('/login')
        }catch(err){
            setError(err.response.data)
        }
    }
    return(
        <div className='flex flex-col sm:justify-center items-center pt-6 sm:pt-0'>
        
        <h2 className="text-center text-3xl my-3 font-bold">Register</h2>
        <form>
            <div className="mt-4">
            <label className="block mb-2 text-sm" htmlFor="email">Username</label>
            <input
            required
            type="username"
            placeholder='username'
            name="username"
            className="w-full py-2 px-3 border rounded-md border-gray-300" 
            onChange={(e)=> setUsername(e.target.value)}
            />
                <label className="block mb-2 text-sm" htmlFor="email">Email Address</label>
            <input
            required
            type="email"
            placeholder='email'
            name="email"
            className="w-full py-2 px-3 border rounded-md border-gray-300" 
            onChange={(e)=> setEmail(e.target.value)}
            />
            
                <label className="block mb-2 text-sm" htmlFor="password">Password</label>
            </div>
            <input
            required
            type="password"
            placeholder='password'
            name="password"
            className="w-full py-2 px-3 border rounded-md border-gray-300" 
            onChange={(e)=> setPassword(e.target.value)}
            />
            
            <button onClick={handleSubmit} className="flex px-6 py-3 mt-8 space-x-2 rounded bg-blue-400 text-gray-900">Register</button>
            
            <div className="flex justify-center mt-6 space-x-2 text-center text-sm">
                Already have an account 
                <span></span>
                <Link to="/login">Login</Link>
            </div>
          
        </form>
    
    </div>
)

}
export default Register;