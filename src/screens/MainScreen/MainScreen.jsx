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

      {/* Product Preview */}
      <section className="preview">
        <h2>See Runit in Action</h2>
        <p>Write and execute real code in seconds.</p>

        <div className="preview-window">
          <div className="preview-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>

          <pre className="code-snippet">
      {`# Python example
      def greet(name):
          return f"Hello, {name} 🚀"

      print(greet("Runit"))`}
          </pre>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <h2>How Runit Works</h2>

        <div className="steps">
          <div className="step">
            <span>01</span>
            <h3>Write Code</h3>
            <p>Choose Python, C++, JavaScript, or Java.</p>
          </div>

          <div className="step">
            <span>02</span>
            <h3>Run Instantly</h3>
            <p>Your code executes securely in the cloud.</p>
          </div>

          <div className="step">
            <span>03</span>
            <h3>Get Output</h3>
            <p>See results and errors immediately.</p>
          </div>
        </div>
      </section>

      {/* Langauges */}
      <section className="languages">
        <h2>Languages Supported</h2>

        <div className="lang-list">
          <span>🐍 Python</span>
          <span>⚡ JavaScript</span>
          <span>☕ Java</span>
          <span>🧠 C++</span>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases">
        <div className="use-content">
          <div className="use-text">
            <h2>Who Uses Runit?</h2>
            <p>
              Runit is designed for anyone who wants to write and run code instantly —
              whether you are learning, testing, or preparing for interviews.
            </p>
          </div>

          <div className="use-grid">
            <div className="use-card">
              <h3>🎓 Students</h3>
              <p>Practice programming concepts without setup hassles.</p>
            </div>

            <div className="use-card">
              <h3>💻 Developers</h3>
              <p>Quickly test logic, debug snippets, and experiment.</p>
            </div>

            <div className="use-card">
              <h3>🧪 Interview Prep</h3>
              <p>Simulate real coding environments for interviews.</p>
            </div>
          </div>
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
