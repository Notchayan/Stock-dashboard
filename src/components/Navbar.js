import React from 'react';

const Navbar = () => {
  const navbarStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    color: '#fff',
    padding: '10px 20px',
    zIndex: '1000',
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backdropFilter: 'blur(5px)', 
  };

  const logoStyle = {
    fontSize: '24px', 
    fontWeight: 'bold', 
    marginLeft: '20px', 
  };

  return (
    <nav style={navbarStyle}>
      <div className="navbar-brand" style={logoStyle}>
        Your Logo
      </div>
    </nav>
  );
};

export default Navbar;
