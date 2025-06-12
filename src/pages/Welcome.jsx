import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/actions/user.actions';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service';
import '../assets/styles/pages/welcome.scss';

export const Welcome = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const categories = [
        { key: 'projects', label: 'Projects', icon: '📁' },
        { key: 'tasks', label: 'Tasks', icon: '📋' },
        { key: 'marketing', label: 'Marketing', icon: '📈' },
        { key: 'design', label: 'Design', icon: '🎨' },
        { key: 'crm', label: 'CRM', icon: '🤝' },
        { key: 'software', label: 'Software', icon: '💻' },
        { key: 'it', label: 'IT', icon: '🔧' },
        { key: 'operations', label: 'Operations', icon: '⚙️' },
        { key: 'product', label: 'Product', icon: '📦' }
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleGetStarted = () => {
        setTimeout(() => {
            // Simulate loading time
            navigate('/');
        }, 500);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    async function handleGuestStart() {
        try {
            const user = await login({ username: 'OfirRozanes', password: 'ofir123' });
            showSuccessMsg(`Welcome: ${user.fullname || 'Guest'}`);
            setTimeout(() => {
                navigate('/');
            }, 400);
        } catch (err) {
            showErrorMsg('Cannot login as guest');
        }
    }

    return (
        <div className="welcome-page scrollable-bg">
            <header className="welcome-header-bar">
                <div className="welcome-header-left">
                    <img
                        src="https://res.cloudinary.com/drunensjg/image/upload/v1748779183/full_logo_wjvwck.png"
                        alt="Yadnom"
                        className="welcome-header-logo"
                    />
                </div>
                <div className="welcome-header-right">
                    <button className="welcome-header-login" onClick={handleLogin}>Log in</button>
                    <button className="welcome-header-get-started" onClick={handleGetStarted}>Get Started</button>
                    <button className="welcome-header-get-started" onClick={handleGuestStart}>Get Started As a Guest</button>
                </div>
            </header>

            <div className="welcome-hero-section">
                <img
                    src="https://res.cloudinary.com/drunensjg/image/upload/v1748779183/full_logo_wjvwck.png"
                    alt="Yadnom"
                    className="welcome-logo"
                />
                <h1 className="welcome-title">
                    Made for work,<br />
                    designed to love
                </h1>
                <p className="welcome-subtitle">
                    Streamline workflows, gain clear visibility across teams, and empower<br />
                    smarter decisions with AI seamlessly woven into your work.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                    <button className="get-started-btn" onClick={handleGetStarted}>
                        Get Started →
                    </button>
                    <button className="get-started-guest-btn" onClick={handleGuestStart}>
                        Get started as a guest
                    </button>
                </div>
                <p className="welcome-note">
                    No credit card needed &nbsp; <span className="dot">•</span> &nbsp; Unlimited time on Free plan
                </p>
            </div>
            <div className="welcome-bottom-area">
                <div className="welcome-board-and-categories">
                    <div className="board-preview">
                        <img
                            src="https://res.cloudinary.com/drunensjg/image/upload/v1749126419/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-05_152635_gv9mzu.png"
                            alt="Project planning board"
                            className="board-preview-image"
                        />
                    </div>

                    <div className="category-selector">
                        <h3>What would you like to manage?</h3>
                        <div className="category-grid">
                            {categories.map((category) => (
                                <button
                                    key={category.key}
                                    className={`category-item ${selectedCategory === category.key ? 'selected' : ''}`}
                                    onClick={() => handleCategoryClick(category.key)}
                                >
                                    <span className="category-icon">{category.icon}</span>
                                    <span className="category-label">{category.label}</span>
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                            <button className="category-get-started" onClick={handleGetStarted}>
                                Get Started →
                            </button>
                            <button className="category-get-started-guest" onClick={handleGuestStart}>
                                Get started as a guest
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="welcome-footer">
                <div className="footer-main">
                    <div className="footer-col logo-col">
                        <img src="https://res.cloudinary.com/drunensjg/image/upload/v1748779183/full_logo_wjvwck.png" alt="yadnom" className="footer-logo" />
                        <ul>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Templates</a></li>
                            <li><a href="#">SMB</a></li>
                            <li><a href="#">Enterprise</a></li>
                            <li><a href="#">Nonprofits</a></li>
                            <li><a href="#">App marketplace</a></li>
                            <li><a href="#">24/7 support</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Features</h4>
                        <ul>
                            <li><a href="#">Docs</a></li>
                            <li><a href="#">Integrations</a></li>
                            <li><a href="#">Automations</a></li>
                            <li><a href="#">AI</a></li>
                            <li><a href="#">Dashboards</a></li>
                            <li><a href="#">Kanban</a></li>
                            <li><a href="#">Gantt</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>yadnom products</h4>
                        <ul>
                            <li><a href="#">yadnom work management</a></li>
                            <li><a href="#">yadnom CRM</a></li>
                            <li><a href="#">yadnom dev</a></li>
                            <li><a href="#">yadnom service</a></li>
                        </ul>
                        <h4>More by yadnom.com</h4>
                        <ul>
                            <li><a href="#">WorkCanvas</a></li>
                            <li><a href="#">WorkForms</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Use cases</h4>
                        <ul>
                            <li><a href="#">Marketing</a></li>
                            <li><a href="#">Project management</a></li>
                            <li><a href="#">Sales</a></li>
                            <li><a href="#">Developers</a></li>
                            <li><a href="#">HR</a></li>
                            <li><a href="#">IT</a></li>
                            <li><a href="#">Operations</a></li>
                            <li><a href="#">Construction</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Careers - We're hiring!</a></li>
                            <li><a href="#">Insights for leaders</a></li>
                            <li><a href="#">Press</a></li>
                            <li><a href="#">Customer stories</a></li>
                            <li><a href="#">Become a partner</a></li>
                            <li><a href="#">Sustainability & ESG</a></li>
                            <li><a href="#">Affiliates</a></li>
                            <li><a href="#">Emergency Response</a></li>
                            <li><a href="#">Investor relations</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">What's new</a></li>
                            <li><a href="#">yadnom academy</a></li>
                            <li><a href="#">Global events</a></li>
                            <li><a href="#">yadnom spaces</a></li>
                            <li><a href="#">Startup for startup</a></li>
                            <li><a href="#">App development</a></li>
                            <li><a href="#">Find a partner</a></li>
                            <li><a href="#">Hire an expert</a></li>
                            <li><a href="#">Compare</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <span className="footer-lang">🌐 English</span>
                        <span className="footer-legal-links">
                            <a href="#">Security</a> |
                            <a href="#">Terms and privacy</a> |
                            <a href="#">Privacy policy</a> |
                            <a href="#">Your privacy choices</a> |
                            <a href="#">Status</a>
                        </span>
                        <span className="footer-copyright">All Rights Reserved © yadnom.com</span>
                    </div>
                    <div className="footer-bottom-right">
                        <a href="#" className="footer-app-badge google-play" aria-label="Google Play"></a>
                        <a href="#" className="footer-app-badge app-store" aria-label="App Store"></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
