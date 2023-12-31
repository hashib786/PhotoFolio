function Navbar({ resetCurrentAlbums }) {
  return (
    <nav className="navbar">
      <div className="full__logo" onClick={resetCurrentAlbums}>
        {/* Logo */}
        <div className="logo">
          <img
            src="https://stalwart-wisp-382f3c.netlify.app/assets/logo.png"
            alt="Logo"
          />
        </div>
        {/* Project Name */}
        <div className="project-name">PhotoFolio</div>
      </div>
    </nav>
  );
}

export default Navbar;
