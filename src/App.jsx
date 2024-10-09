import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import HootList from './components/HootList/HootList';
import * as hootService from './services/hootService';
import HootDetails from './components/HootDetails/HootDetails';
import HootForm from './components/HootForm/HootForm';


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  async function handleAddHoot(formData) {
    const newHoot = await hootService.create(formData);
    setHoots([...hoots, newHoot]);
    // navigate to the hoots page after creating a new hoot
    navigate('/hoots');
  }

  async function handleDeleteHoot(id) {
    console.log('delete hoot id:', id);
    const deletedHoot = await hootService.deleteHoot(id);
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate('/hoots');
  }

  async function handleUpdateHoot(id, formData) {
    const updatedHoot = await hootService.update(id, formData);
    setHoots(hoots.map((hoot) => (hoot._id === updatedHoot._id ? updatedHoot : hoot)));

    //=================================================================
    //not single line of code
    // const newHootarray = hoots.map((hoot) => {
    //   if (hoot._id === updatedHoot._id) {
    //     return updatedHoot;
    //   } else {
    //     return hoot;
    //   }
    // });


    navigate(`/hoots/${id}`);
  }

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      console.log('hootsData:', hootsData);
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/hoots" element={<HootList hoots={hoots}/>} />
            <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot}/>} />
            <Route path="/hoots/:id" element={<HootDetails handleDeleteHoot={handleDeleteHoot}  />} />
            <Route path="/hoots/:id/edit" element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
