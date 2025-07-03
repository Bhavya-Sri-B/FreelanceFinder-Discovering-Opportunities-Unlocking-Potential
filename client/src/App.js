import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GeneralProvider } from './context/GeneralContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Authenticate from './pages/Authenticate';
import Landing from './pages/Landing';
import Client from './pages/client/Client';
import NewProject from './pages/client/NewProject';
import ProjectApplications from './pages/client/ProjectApplications';
import ProjectWorking from './pages/client/ProjectWorking';
import Freelancer from './pages/freelancer/Freelancer';
import AllProjects from './pages/freelancer/AllProjects';
import MyProjects from './pages/freelancer/MyProjects';
import MyApplications from './pages/freelancer/MyApplications';
import WorkingProject from './pages/freelancer/WorkingProject';
import ProjectData from './pages/freelancer/ProjectData';
import Admin from './pages/admin/Admin';
import AdminProjects from './pages/admin/AdminProjects';
import AllApplications from './pages/admin/AllApplications';
import AllUsers from './pages/admin/AllUsers';
import { Container } from '@mui/material';

function App() {
  return (
    <GeneralProvider>
      <Router>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/client" element={<Client />} />
            <Route path="/client/new-project" element={<NewProject />} />
            <Route path="/client/project/:id/applications" element={<ProjectApplications />} />
            <Route path="/client/project/:id/working" element={<ProjectWorking />} />
            <Route path="/freelancer" element={<Freelancer />} />
            <Route path="/freelancer/projects" element={<AllProjects />} />
            <Route path="/freelancer/my-projects" element={<MyProjects />} />
            <Route path="/freelancer/my-applications" element={<MyApplications />} />
            <Route path="/freelancer/project/:id/working" element={<WorkingProject />} />
            <Route path="/freelancer/project/:id" element={<ProjectData />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/applications" element={<AllApplications />} />
            <Route path="/admin/users" element={<AllUsers />} />
          </Routes>
        </Container>
      </Router>
    </GeneralProvider>
  );
}

export default App;