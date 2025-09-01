import { Link } from 'react-router-dom';
import './Navbar.css';
import {jwtDecode} from 'jwt-decode'  
import logo from "./school_logo.jpg"

export default function Navbar() {

  const handleLogout = () =>{
    localStorage.removeItem("token")
    window.location = "/admin"
  }

  const role = jwtDecode(localStorage.token).role

  return (
    <aside className="sidebar">
      <div className='nav_logo_section'> 
      <img src={logo}  alt='logo'/>
      <h2 className="title">Admin Dashboard</h2>
      </div>
      <nav className="nav">
         <Link to="/admin/dashboard/event"><button >Event</button></Link>
         <Link to="/admin/dashboard/announcement"><button >Announcement</button></Link>
         <Link to="/admin/dashboard/gallery"><button >Gallery</button></Link> 
         { role === "superadmin" &&(
       <Link to="/admin/dashboard/admin"><button >Admins</button></Link>
         )}
      </nav>

      <div className='log_btn'>
        <button onClick={()=>{handleLogout()}}> Logout</button>
      </div>
    </aside>
  );
}