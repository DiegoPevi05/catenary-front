import { FC, ReactNode } from 'react'
import { Toaster } from 'sonner'
import {AuthProvider, useAuth} from './contexts/AuthContext';
import {BrowserRouter as Router, Routes, Route , Navigate, Outlet} from 'react-router-dom';
import SignIn from './pages/signin';
import "./lib/i18n.ts";


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
            <h1>home</h1>
          </ProtectedRoute>
        }
      />

      <Route path="/signin" element={<ProtectedRoute  redirectPath="/dashboard" isAllowed={user == null || user == undefined}>
        <SignIn/>
      </ProtectedRoute>} />

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
