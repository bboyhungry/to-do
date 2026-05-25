import { Routes, Route } from 'react-router-dom';
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import AuthCallback from './states/AuthCallback';
import ProtectedRoute from './states/ProtectedRoute';



function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/tasks" element={
        <ProtectedRoute>
          <ListPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;