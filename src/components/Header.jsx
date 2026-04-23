function Header() {
  const navItems = ["Overview", "Patients", "Schedule", "Message", "Transactions"];

  return (
    <header className="top-header">
      <div className="brand">Tech.Care</div>

      <nav className="top-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <span key={item} className={item === "Patients" ? "nav-item active" : "nav-item"}>
            {item}
          </span>
        ))}
      </nav>

      <div className="header-profile">
        <div className="header-avatar" aria-hidden="true">
          JS
        </div>
        <div>
          <p className="header-name">Dr. Jose Simmons</p>
          <p className="header-role">General Practitioner</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
