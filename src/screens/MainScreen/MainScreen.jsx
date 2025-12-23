import { Link } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets/logo.png";
import "./MainScreen.css";

const MainScreen = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing">
      <nav className="navbar reveal reveal-down">
        <div className="nav-left">
          <img src={logo} alt="RunIt Logo" className="logo" />
          <span className="brand">RunIt</span>
        </div>
        <div className="nav-right">
          <Link to="/get-started" className="nav-btn">
            Get Started
          </Link>
        </div>
      </nav>

      {/*Hero Section*/}
      <section className="hero reveal reveal-up">
        <h1>
          Code. Run. Build. <br />
          <span>All in your browser.</span>
        </h1>
        <p>
          RunIt is a fast, powerful online coding execution platform where you
          can write, run, and test code instantly — no setup required.
        </p>
        <div className="hero-actions stagger">
          <Link to="/get-started" className="primary-btn">
            Start Coding Free
          </Link>
          <a href="#features" className="secondary-btn">
            See Features
          </a>
        </div>
      </section>

      {/*Preview*/}
      <section className="preview reveal reveal-left">
        <h2>See RunIt in Action</h2>
        <p>Write and execute real code in seconds.</p>

        <div className="preview-window preview-carousel">
          <div className="preview-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>

          <div className="carousel-body">
            <pre className="code-snippet code-slide slide-python">
      {`# Python
      def greet(name):
          return f"Hello, {name} 🚀"

      print(greet("RunIt"))`}
            </pre>

            <pre className="code-snippet code-slide slide-cpp">
      {`// C++
      #include <iostream>
      using namespace std;

      int main() {
        cout << "Hello, RunIt 🚀";
        return 0;
      }`}
            </pre>

            <pre className="code-snippet code-slide slide-js">
      {`// JavaScript
      function greet(name) {
        return \`Hello, \${name} 🚀\`;
      }

      console.log(greet("RunIt"));`}
            </pre>

            <pre className="code-snippet code-slide slide-java">
      {`// Java
      class Main {
        public static void main(String[] args) {
          System.out.println("Hello, RunIt 🚀");
        }
      }`}
            </pre>
          </div>
        </div>
      </section>

      {/*How it works */}
      <section className="how-it-works reveal">
        <h2 className="reveal-up">How RunIt Works</h2>
        <div className="steps stagger">
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
      
      {/* Languages */}
      <section className="languages reveal reveal-zoom">
        <h2>Languages Supported</h2>
        <div className="lang-list stagger">
          <span>🐍 Python</span>
          <span>⚡ JavaScript</span>
          <span>☕ Java</span>
          <span>🧠 C++</span>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases reveal reveal-right">
        <div className="use-content">
          <div className="use-text">
            <h2>Who Uses RunIt?</h2>
            <p>
              RunIt is designed for anyone who wants to write and run code instantly —
              whether learning, testing, or preparing for interviews.
            </p>
          </div>
          <div className="use-grid stagger">
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
      
      {/* Features */}
      <section className="features reveal" id="features">
        <h2 className="reveal-up">Why RunIt?</h2>
        <div className="feature-grid stagger">
          <div className="feature-card">
            <h3>🌐 Browser Based IDE</h3>
            <p>No installs. No configuration. Just open your browser and code.</p>
          </div>
          <div className="feature-card">
            <h3>🧠 Multi-Language Support</h3>
            <p>Write and execute code in multiple programming languages.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Isolated</h3>
            <p>Each execution runs in a secure, isolated environment.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta reveal reveal-up">
        <h2>Ready to build something amazing?</h2>
        <p>Join developers using RunIt to experiment, learn, and ship faster.</p>
        <Link to="/get-started" className="primary-btn large">
          Launch Editor
        </Link>
      </section>
      
      {/*Footer*/}
      <footer className="footer reveal reveal-up">
        <p>
          Built with ❤️ by <strong>Harshit Pant</strong>
        </p>
        <p className="footer-sub">
          © {new Date().getFullYear()} RunIt. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainScreen;
