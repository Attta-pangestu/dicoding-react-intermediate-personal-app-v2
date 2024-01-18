import { Link, useNavigate } from "react-router-dom";
// utils
import { login } from "../utils/networkData";

// Component
import LoginInput from "../components/LoginInput";


function LoginPage({successLoginHandler}) {
    const navigate = useNavigate();

    const loginSubmitHandler = async ({email, pass}) => {
        const {error, message} = await login({email, password : pass}); 
        alert(message);
        if(!error) {
            successLoginHandler(error);
            navigate('/');
        }
    }


    return (
        <section className="login-page">
            <LoginInput loginSubmitHandler={loginSubmitHandler}/>
        </section>
    );
}

export default LoginPage;