import { Routes, Route } from 'react-router';
import NavBar from '@/components/NavBar/NavBar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import styles from './App.module.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/*"
          element={
            <>
              <NavBar />
              <main className={styles.main}>
                <div className={styles.container}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/edit/:taskId" element={<Home />} />
                  </Routes>
                </div>
              </main>
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
