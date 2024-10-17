import { FC, ReactNode } from 'react'
import { Toaster } from 'sonner'
import {AuthProvider, useAuth} from './contexts/AuthContext';
import {BrowserRouter as Router, Routes, Route , Navigate, Outlet} from 'react-router-dom';
import SignIn from './pages/signin';
import "./lib/i18n.ts";
import CantileverPage from './pages/cantilever.tsx';
import HomePage from './pages/home.tsx';
import CantileversPage from './pages/cantilevers.tsx';
import Logout from './pages/logout.tsx';
import ViasPage from './pages/vias.tsx';
import ConfigPage from './pages/config.tsx';
import ProfilePage from './pages/profile.tsx';
import DroppersPage from './pages/droppers.tsx';
import VanesPage from './pages/vanes.tsx';
import NotFoundPage from './pages/404.tsx';


interface ProtectedRouteProps {
  isAllowed: boolean | undefined;
  redirectPath?: string;
  children?: ReactNode;
};

const ProtectedRoute = ({ isAllowed, redirectPath = '/signin', children }:ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const AppRoutes: FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>

      <Route
        path="/"
        element={
          <ProtectedRoute
            isAllowed={user != null && user != undefined}
          >
            <HomePage/>
          </ProtectedRoute>
        }
      />

      <Route path="/vias" element={ <ProtectedRoute isAllowed={user != null && user != undefined}> <ViasPage/> </ProtectedRoute> } />
      <Route path="/vanes" element={ <ProtectedRoute isAllowed={user != null && user != undefined}> <VanesPage/> </ProtectedRoute> } />


      <Route
        path="/cantilevers"
        element={
          <ProtectedRoute
            isAllowed={user != null && user != undefined}
          >
            <CantileversPage/>
          </ProtectedRoute>
        }
      />

      <Route path="/cantilever/:cantileverId" element={ <ProtectedRoute isAllowed={user != null && user != undefined} > <CantileverPage/> </ProtectedRoute> }/>
      <Route path="/droppers" element={ <ProtectedRoute isAllowed={user != null && user != undefined}> <DroppersPage/> </ProtectedRoute> } />
      <Route path="/config" element={ <ProtectedRoute isAllowed={user != null && user != undefined}> <ConfigPage/> </ProtectedRoute> } />
      <Route path="/profile" element={ <ProtectedRoute isAllowed={user != null && user != undefined}> <ProfilePage/> </ProtectedRoute> } />

      <Route path="/signin" element={<ProtectedRoute  redirectPath="/dashboard" isAllowed={user == null || user == undefined}>
        <SignIn/>
      </ProtectedRoute>} />



      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/logout" element={<Logout />} />

    </Routes>
  )

};

function App() {

  return (
      <AuthProvider>
          <Toaster position="bottom-right" expand={false} />
          <Router>
            <AppRoutes />
          </Router>
      </AuthProvider>
  )
}

export default App
