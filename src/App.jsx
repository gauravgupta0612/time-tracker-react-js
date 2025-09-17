import { useAuth } from '../useAuth.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import './App.css';

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          <header className="header">
            <h1>Welcome, {user.name}!</h1>
            <button onClick={logout}>Logout</button>
          </header>
          <main>
            <Dashboard />
          </main>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;