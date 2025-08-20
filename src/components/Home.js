import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="home-title">
            Empower Your Future with <span className="highlight">Online Learning</span>
          </h1>
          <p className="home-desc">
            Join thousands of learners and unlock new skills, advance your career, 
            and achieve your goals — anytime, anywhere.
          </p>
          <Link to="/exp2" className="cta-btn">
            Get Started
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
            alt="Online learning"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">🌐 100% Online, Flexible Learning</div>
          <div className="feature-card">🎓 Expert Instructors & Curated Courses</div>
          <div className="feature-card">📱 Learn on Any Device, Anytime</div>
          <div className="feature-card">🏆 Earn Certificates & Badges</div>
          <div className="feature-card">💬 Community Support & Networking</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Learners Say</h2>
        <div className="testimonials-grid">
          <blockquote className="testimonial-card">
            “The platform made it easy to learn at my own pace. The instructors are top-notch!”
            <footer>- Priya S.</footer>
          </blockquote>
          <blockquote className="testimonial-card">
            “I landed my dream job after completing several courses here. Highly recommended!”
            <footer>- Arjun M.</footer>
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <address>
          Contact: <a href="mailto:support@onlinelearning.com">support@onlinelearning.com</a> | +1-800-123-4567
        </address>
        <small className="footer-note">
          © {new Date().getFullYear()} Online Learning Platform. All rights reserved.
        </small>
      </footer>
    </main>
  );
}
