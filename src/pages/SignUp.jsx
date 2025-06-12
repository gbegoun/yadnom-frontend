import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { login,/* signup */} from "../store/actions/user.actions"

export default function SignUp() {
    const navigate = useNavigate()
    const [guestMode, setGuestMode] = useState(false)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            setTimeout(() => {
                showSuccessMsg(`Redirecting to home page...`)
                navigate('/') // Redirect to home page after successful login
            }, 400);
        } catch (err) {
            showErrorMsg('Cannot login')
            throw err
        }
    }

    // async function onSignup(credentials) {
    //     try {
    //         const user = await signup(credentials)
    //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //         setTimeout(() => {
    //             navigate('/') // Redirect to home page after successful signup
    //         }, 2000);
    //     } catch (err) {
    //         showErrorMsg('Cannot signup')
    //         throw err
    //     }
    // }

    async function handleSubmit(ev) {
        ev.preventDefault();
        const form = ev.target.closest('form');
        const formData = new FormData(form);
        let credentials

        if (guestMode) {
            credentials = {
                username: 'OfirRozanes',
                password: 'ofir123'
            }
            
        } else {
            const email = formData.get('email');
            const password = formData.get('password');
            credentials = { username: email, password: password }
        }

        try {
            await onLogin(credentials)
        } catch (err) {
            console.error('Login failed, please try again');
            showErrorMsg('An error occurred during signup/login. Please try again.');
            return;
        }
    }

    return (
        <div className="signin-page">
            <div className="signin-left">
                <div className="signin-content">
                    <h1>Welcome to Yadnom.com</h1>
                    <p className="subtitle">Get started - it's free. No credit card needed.</p>
                    <form className="signin-form">
                        <div className="guest-toggle-wrapper">
                            <span className="guest-toggle-label">Guest Mode</span>
                            <label className="guest-switch">
                                <input
                                    type="checkbox"
                                    checked={guestMode}
                                    onChange={() => setGuestMode(g => !g)}
                                />
                                <span className="guest-slider"></span>
                                <span className="guest-knob" style={{ left: guestMode ? '22px' : '4px' }}></span>
                            </label>
                            <span className={`guest-toggle-state${guestMode ? ' on' : ''}`}>{guestMode ? 'ON' : 'OFF'}</span>
                        </div>
                        {!guestMode && (
                            <>
                                <input type="email" name="email" placeholder="name@company.com" required />
                                <input type="password" name="password" placeholder="Password" required />
                            </>
                        )}
                        <button type="button" onClick={(ev) => handleSubmit(ev)} className="continue-btn">Continue</button>
                    </form>
                    <p className="terms">By proceeding, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
                    <p className="login-link">Already have an account? <a href="#">Log in</a></p>
                </div>
            </div>
            <div className="signin-right">
                <img src="https://res.cloudinary.com/drunensjg/image/upload/v1748722484/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-05-31_231000_nkwmfe.png" alt="Signin visual" className="signin-visual" />
            </div>
        </div>
    )
}


