import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./MainScreen.css";

const MainScreen = () => {
  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Runit Logo" className="logo" />
          <span className="brand">Runit</span>
        </div>
        <div className="nav-right">
          <Link to="/get-started" className="nav-btn">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Code. Run. Build. <br />
          <span>All in your browser.</span>
        </h1>
        <p>
          Runit is a fast, powerful online coding execution platform where you
          can write, run, and test code instantly — no setup required.
        </p>

        <div className="hero-actions">
          <Link to="/get-started" className="primary-btn">
            Start Coding Free
          </Link>
          <a href="#features" className="secondary-btn">
            See Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Why Runit?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🌐 Browser Based IDE</h3>
            <p>
              No installs. No configuration. Just open your browser and code.
            </p>
          </div>
          <div className="feature-card">
            <h3>🧠 Multi-Language Support</h3>
            <p>
              Write and execute code in multiple programming languages.
            </p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Isolated</h3>
            <p>
              Each execution runs in a secure, isolated environment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to build something amazing?</h2>
        <p>
          Join developers using Runit to experiment, learn, and ship faster.
        </p>
        <Link to="/get-started" className="primary-btn large">
          Launch Editor
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Built with ❤️ by <strong>Harshit Pant</strong>
        </p>
        <p className="footer-sub">
          © {new Date().getFullYear()} Runit. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainScreen;
