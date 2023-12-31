import './App.scss'
import { Routes, Route } from 'react-router-dom';
import Yoga from './pages/Yoga'
import HomeView from './pages/HomeView';
import SignUp from './components/SignUp';
import Meditation from './pages/Meditation';
import Profile from './pages/ProfilPage';
import LogIn from './components/LogIn';
import PlaylistDetail from './pages/PlaylistDetail'
import LandingPage from './pages/LandingPage';
import Welcome from './pages/Welcome';
import Video from './pages/Video';
import Reminder from './pages/Reminder'
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/' element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/yoga' element={<Yoga />} />
          <Route path='/meditation' element={<Meditation />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/video/:id' element={<Video />} />
          <Route path='/music' element={<PlaylistDetail />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/home' element={<HomeView />} />
          <Route path='/reminder' element={<Reminder />} />
        </Route>
      </Routes >
    </>
  )
}

export default App;
