import { LoginSignup } from "../components/LoginSignup"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { login } from "../store/actions/user.actions"
import '../assets/styles/pages/signin.scss'

export default function Signin() {

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    return (
        <div className="signin-page">
            <div className="signin-left">
                <div className="signin-content">
                    <h1>Welcome to monday.com</h1>
                    <p className="subtitle">Get started - it's free. No credit card needed.</p>
                    <button className="google-btn">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google logo" className="google-logo" />
                        Continue with Google
                    </button>
                    <div className="divider">
                        <span>Or</span>
                    </div>
                    <form className="signin-form" onSubmit={e => { e.preventDefault(); onLogin({ email: e.target.email.value, password: e.target.password.value }) }}>
                        <input type="email" name="email" placeholder="name@company.com" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit" className="continue-btn">Continue</button>
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


