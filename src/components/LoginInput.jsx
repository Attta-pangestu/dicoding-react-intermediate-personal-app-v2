// LoginInput.jsx

import { Link } from "react-router-dom";
import { useEmailInput, usePassInput } from "../hooks/customHooks";
import Input from "./_base/Input";

function LoginInput({ loginSubmitHandler }) {
    const [email, changeEmailHandler] = useEmailInput('');
    const [pass, changePassHandler] = usePassInput('');

    return (
        <>
            <h2>Yuk, login untuk menggunakan aplikasi.</h2>
            <div className="input-login">
                <form onSubmit={(e) => { e.preventDefault(); loginSubmitHandler({ email, pass }) }}>
                    <Input type={"text"} id={"email"} label={"Email"} value={email} changeHandler={changeEmailHandler} />
                    <Input type={"password"} id={"password"} label={"Password"} value={pass} changeHandler={changePassHandler} />
                    <button type="submit">Login</button>
                </form>
            </div>
            <p>'Belum punya akun?' <Link to="/register">Daftar Disini</Link></p>
        </>
    );
}

export default LoginInput;
