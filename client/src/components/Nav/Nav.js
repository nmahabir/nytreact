import React from "react";

const Nav = () => (
  <nav className="navbar navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      Sitescraper
    </a>
    <div className="navbar-nav">
      <a className="nav-item nav-link active" href="#">
        Home
      </a>
      <a className="nav-item nav-link" href="#">
        Saved Articles
      </a>
      <button class="nav-item nav-link" href="#">
        Scrape New Articles
      </button>
      <button class="nav-item nav-link" href="#">
        Clear
      </button>
    </div>
  </nav>
);

export default Nav;
