import React from 'react';

const Navbar = () => {
  const navbarStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    color: '#fff',
    padding: '10px 20px',
    zIndex: '1000',
    display: 'flex',
    justifyContent: 'space-between', // Align content at both ends
    alignItems: 'center', // Vertically center content
    backdropFilter: 'blur(5px)', // Apply a blur effect to the background (requires CSS backdrop-filter support)
  };

  const logoStyle = {
    fontSize: '24px', // Adjust font size
    fontWeight: 'bold', // Make the text bold
    marginLeft: '20px', // Add some left margin
  };

  return (
    <nav style={navbarStyle}>
      <div className="navbar-brand" style={logoStyle}>
        Your Logo
      </div>
      {/* You can add additional elements on the right side if needed */}
    </nav>
  );
};

export default Navbar;
