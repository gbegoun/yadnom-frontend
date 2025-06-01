import { useNavigate } from "react-router-dom"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { login, signup } from "../store/actions/user.actions"
import '../assets/styles/pages/signin.scss'

export default function Signin() {
    const navigate = useNavigate()

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            setTimeout(() => {
                showSuccessMsg(`Redirecting to home page...`)
                navigate('/') // Redirect to home page after successful login
            }, 2000);
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
            setTimeout(() => {
                navigate('/') // Redirect to home page after successful signup
            }, 2000);
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function handleSubmit(ev) {
        console.log('Signin: handleSubmit', ev);
        ev.preventDefault();
        const form = ev.target.closest('form');
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        // For signup, use email as username and create fullname for now
        const credentials = {
            username: email, // Use email as username
            password: password,
            fullname: email.split('@')[0], // Use email prefix as fullname
            email: email // Keep email field for future use
        };

        // Try signup first (create new user), fallback to login if user exists
        try {
            await onSignup(credentials)
            console.log('Signup successful, user created');
        } catch (err) {
            console.log('Signup failed, trying login with existing user');
            try {
                await onLogin({ username: email, password: password })
            } catch (err) {
                console.error('Login failed, please try again');
                showErrorMsg('An error occurred during signup/login. Please try again.');
                return;
            }
        }
    }

    return (
        <div className="signin-page">
            <div className="signin-left">
                <div className="signin-content">
                    <h1>Welcome to Yadnom.com</h1>
                    <p className="subtitle">Get started - it's free. No credit card needed.</p>
                    <form className="signin-form">
                        <input type="email" name="email" placeholder="name@company.com" required />
                        <input type="password" name="password" placeholder="Password" required />
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


