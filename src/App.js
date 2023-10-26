import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import Home from './components/Home';
import ResetPassword from './components/ResetPassword';
import UserProfile from './components/UserProfile';
import EditPost from './components/EditPost';

function App() {
  return (
    <div className="App">
    <h3 className='container-fluid head text-center p-2'>Social Media App</h3>
     <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/reset-password/:resetToken' element={<ResetPassword/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/user-profile' element={<UserProfile/>}/>
        <Route path='/edit-post/:id' element={<EditPost/>}/>
     </Routes>
    </div>
  );
}

export default App;
