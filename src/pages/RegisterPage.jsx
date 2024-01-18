// Library
import { useNavigate } from "react-router-dom";

// Utils
import { register } from "../utils/networkData";
// Component
import RegisterInput from "../components/RegisterInput";


function RegisterPage() {
    const navigate = useNavigate();

    const registerSubmitHandler = async ({name, email, password}) => {
        register({name, email, password}).then(({error, message}) => {
            if(error) {
                alert("Terjadi Kesalahan Saat Mendaftar : ");
                console.log(message);
            } else {
                alert("Berhasil Mendaftarkan Akun") ; 
                navigate('/'); 
            }
            
        });
        
    };
    
    
    return (
        <section className="register-page">
            <RegisterInput registerSubmitHandler={registerSubmitHandler}/>
        </section>
    );
}

export default RegisterPage;