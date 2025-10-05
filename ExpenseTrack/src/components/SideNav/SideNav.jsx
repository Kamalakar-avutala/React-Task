import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="sidenav-custom min-vh-100 border-top-1">
        <ul className="list-group list-group-flush ">
          <Link to="/dashboard" className="text-decoration-none mt-4">
            <li
              className={`list-group-item d-flex align-items-center bg-transparent border-0 text-dark ${
                activeItem === 'dashboard' ? 'active' : ''
              }`}
              onClick={() => handleItemClick('dashboard')}
            >
              <i className="pi pi-home me-2"></i>
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/charts" className="text-decoration-none">
            <li
              className={`list-group-item d-flex align-items-center bg-transparent border-0 text-dark ${
                activeItem === 'charts' ? 'active' : ''
              }`}
              onClick={() => handleItemClick('charts')}
            >
               <i className="pi pi-chart-bar me-2"></i>
              <span>Charts</span>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default SideNav;