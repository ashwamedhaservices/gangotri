import React, { useContext } from 'react'
import {HomeRoundedIcon, DashboardIcon, SettingsIcon, LogoutIcon, FormatListNumberedIcon} from '@mui/icons-material/HomeRounded';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/authentication/authContextProvider';
import './index.css'
const Sidebar = () => {
  const { logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout()
  }
  return (
    <aside className="sidebar">
      <div className="k-flex k-fdc k-jcsb h-100">
        <ul>
            <li className="sidebar__nav-item">
              <NavLink to="/dashboard" className={isActive => "nav-link" + (isActive ? " nav-link__active" : "")}><HomeRoundedIcon /><span className="sidebar__nav-item--name">Dashboard</span></NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink to="/product" className={isActive => "nav-link" + (isActive ? " nav-link__active" : "")}><DashboardIcon /><span className="sidebar__nav-item--name">Product</span></NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink to="/orders" className={isActive => "nav-link" + (isActive ? " nav-link__active" : "")}><FormatListNumberedIcon/><span className="sidebar__nav-item--name">Orders</span></NavLink>
            </li>
        </ul>
        <ul>
          <li className="sidebar__nav-item">
            <NavLink to="/setting" className={isActive => "nav-link" + (isActive ? " nav-link__active" : "")}><SettingsIcon /><span className="sidebar__nav-item--name">Setting</span></NavLink>
          </li>
          <li className="sidebar__nav-item" onClick={handleLogout}>
            <LogoutIcon /><span className="sidebar__nav-item--name">Logout</span>
          </li>
        </ul>

      </div>
    </aside>
    
  )
}

export default Sidebar