import {BrowserRouter,Routes,Route} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      -<Route path='/profile' element={<Profile />}/>
      <Route path='/sign-in' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
  )
}
