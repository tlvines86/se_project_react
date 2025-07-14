import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__text">Developed by Troy Vines</h2>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
