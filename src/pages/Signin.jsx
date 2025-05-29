
import { useSelector } from "react-redux"
import { LoginSignup } from "../components/LoginSignup"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { login, logout, signup } from "../store/actions/user.actions"

export default function Signin() {

        const user = useSelector(storeState => storeState.userModule.user)
    
    
        async function onLogin(credentials) {
            try {
                const user = await login(credentials)
                showSuccessMsg(`Welcome: ${user.fullname}`)
            } catch (err) {
                showErrorMsg('Cannot login')
            }
        }
    
        async function onSignup(credentials) {
            try {
                const user = await signup(credentials)
                showSuccessMsg(`Welcome new user: ${user.fullname}`)
            } catch (err) {
                showErrorMsg('Cannot signup')
            }
        }
    
        async function onLogout() {
            try {
                await logout()
                showSuccessMsg(`Bye now`)
            } catch (err) {
                showErrorMsg('Cannot logout')
            }
        }


    return <div className="about">
         <section className="container">
                {user &&
                    <span className="user-info">
                        {user.imgUrl && <img src={user.imgUrl} />}
                        {user.fullname}
                        <span className="score">{user.balance?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <div className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </div>
                }
            </section>
    </div>
}


