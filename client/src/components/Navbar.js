import{useContext} from 'react'
import {Link} from 'react-router-dom'
import {Context} from '../context/userContext'

const Navbar = ()=>{
    
    const {user, dispatch} = useContext(Context)
    const handleLogout = ()=>{
        dispatch({type: "LOGOUT"})
    }
    return(
        
        <div className='container flex flex-wrap justify-between max-w-4xl px-10 py-6 mx-auto rounded-lg bg-900'>
            <div className='text-3xl text-left'>
                         Blog 
                    </div>
            
                <div className='space-x-3 lg:flex text-xl'>
                    <Link to="/createpost">New post</Link>
                    
                    {user ? (
                        <span onClick={handleLogout}>Logout</span>
                    ) : (
                    <Link to="/login">Login</Link>
                    )}
                    <Link to="/register">Register</Link>
            </div>

            </div>
          
    )
}
export default Navbar