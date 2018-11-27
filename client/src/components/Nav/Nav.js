import React from 'react'

const Nav = () => (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Sitescraper
      </a>
      <a className="navbar-brand" href="/">
        {option}
      </a>
      <a className="navbar-brand" href="/">
        Score: {score}| Top Score: {topScore}
      </a>
    </nav>
  );
  

  export default Nav;