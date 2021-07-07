import React from "react";
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a className="footer__git-link" href="https://github.com/Blazhkomikhail"
          target="_blank"
          style={{ backgroundImage: `url(./icons/github.png)` }}
        />
        <a className="footer__logo"
          href="https://rs.school/js/"
          target="_blank"
          style={{ backgroundImage: `url(./icons/rs_school_js.svg)` }}
        />
        <p className="footer__year">2021&copy;</p>
      </div>
    </footer>
  )
}

export default Footer;