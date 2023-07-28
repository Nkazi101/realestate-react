import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {Route, Routes} from 'react-router-dom'
import { useEffect, useState  } from 'react';
import axios from 'axios'
import PropertyList from './pages/PropertyList'
import PageWrapper from './reusables/PageWrapper';
import Admin from './pages/Admin'
import AddProperty from './pages/AddProperty'
import EditProperty from './pages/EditProperty'

function App() {
  
  const [user, setUser] = useState({ id: undefined, email: "", password: "", isAdmin: false});

  
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      axios.get(`http://localhost:8080/findUserById/${id}`)
      .then((response)=>{
        setUser(response.data)
        console.log("response", response.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    }  
  }, [])


  return (
    <PageWrapper user = {user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser}/>}/>
        <Route path="/sign-in" element={<SignIn user={user} setUser={setUser}/>}/>
        <Route path="/sign-up" element={<SignUp user={user} setUser={setUser}/>}/>
        <Route path="/propertylist" element={<PropertyList user={user} setUser={setUser}/>}/>
        <Route path="/admin" element={<Admin user={user} setUser={setUser} />} />
        <Route path="/addProperty" element={<AddProperty  user={user} setUser={setUser}  />} />
        <Route path="/editProperty" element={<EditProperty  user={user} setUser={setUser}/>} />


      </Routes>
    </PageWrapper>
  );
}

export default App;
