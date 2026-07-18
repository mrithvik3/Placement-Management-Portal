import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Placement Management Portal</h2>

      <ul className="nav-links">
        <li>Home</li>
        <li>Companies</li>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;