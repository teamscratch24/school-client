
import { Outlet } from 'react-router-dom';
import Sidebar from './Component/Nav/Navbar';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Sidebar />
        <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
