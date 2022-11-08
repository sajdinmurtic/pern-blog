import Register from './pages/Register'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import SinglePost from './pages/SinglePost'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing'


function App() {
  
  return (
        <BrowserRouter>
  
        <main>
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<CreatePost />} />
         
        <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
        </main>
        </BrowserRouter>
    
  );
}

export default App;

