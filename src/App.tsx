import NavBar from './components/NavBar';
import Home from './pages/Home';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-violet-100 via-rose-50 to-sky-100">
        <div className="container mx-auto max-w-5xl p-6 md:p-8">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
