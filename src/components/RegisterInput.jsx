import { Link } from "react-router-dom";

// hooks
import { useEmailInput, usePassInput, useNameInput } from "../hooks/customHooks";

// component
import Input from "./_base/Input";


function RegisterInput({registerSubmitHandler}){
    const [name, setName]= useNameInput();
    const [email, setEmail] = useEmailInput();
    const [password, setPassword] = usePassInput();


    return (
        <>
            <h2>Isi Form Untuk Mendaftarkan Akun </h2>
            <div className="input-register">
                <form onSubmit={(e) => { e.preventDefault();registerSubmitHandler({name, email, password})}}>
                    <Input type={"text"} id={"name"} label={"Username"} value={name} changeHandler={setName} />
                    <Input type={"text"} id={"email"} label={"Email"} value={email} changeHandler={setEmail} />
                    <Input type={"password"} id={"password"} label={"Password"} value={password} changeHandler={setPassword} />
                    <button type="submit">Register</button>
                </form>
            </div>
            <p>'Belum punya akun?' <Link to="/register">Daftar Disini</Link></p>
        </>
    );
}

export default RegisterInput;