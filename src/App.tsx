import NavBar from '@/components/NavBar/NavBar';
import Home from '@/pages/Home/Home';
import { Routes, Route } from 'react-router';
import styles from './App.module.css';

function App() {
  return (
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
  );
}

export default App;
