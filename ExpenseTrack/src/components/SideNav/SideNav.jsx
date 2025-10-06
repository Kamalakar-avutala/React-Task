import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuOptions from '../../menuoptions';

const SideNav = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="sidenav-custom min-vh-100 border-top-1">
        <ul className="list-group list-group-flush">
          {menuOptions.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="text-decoration-none mt-4"
            >
              <li
                className={`list-group-item d-flex align-items-center bg-transparent border-0 text-dark ${
                  activeItem === item.id ? 'active' : ''
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <i className={`${item.icon} me-2`}></i>
                <span>{item.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideNav;