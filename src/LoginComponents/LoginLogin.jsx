import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../userInfo/getTeamData";
import { useSelector, useDispatch } from "react-redux";
import { login } from '../redux/actions/team'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from "react-hot-toast";
import '../CSS/Login.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function LoginLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const team = useSelector((state) => state.team);
    const navigate = useNavigate();
    const role = getUserRole();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (role === "admin") {
            navigate('/admin/toutes-les-missions')
        } else if (role === 'masseur') {
            navigate('/masseur/toutes-les-missions')
        }
    }, [token])

    console.log(role);

    const handleSignIn = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
            .then((response) => {
                setEmail('');
                setPassword('');
                toast.success(`Connexion réussie !`)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    };

    return (
        <div className="container login-container d-flex flex-column justify-content-center align-items-center">
            <h4 className="oswald">
                Espace connexion loukoum masseur
            </h4>
            <Form className="d-flex flex-column align-items-start" onSubmit={handleSignIn}>
                <div>
                    <FormGroup floating>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder=" "
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                            className="form-style border-dark"
                            required
                        />
                        <Label for="Email" className="login-label">
                            Email
                        </Label>
                    </FormGroup>
                </div>
                <div>
                    <FormGroup floating>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onInput={(e) => setPassword(e.target.value) }
                        placeholder=" "
                        className="form-style border-dark"
                        required
                        />
                        <Label for="MDP" className="login-label">
                            Mot de passe
                        </Label>
                    </FormGroup>
                </div>
                <button
                    className="white-button"
                    type="submit"
                >
                    Se connecter
                </button>
            </Form>
        </div>
    );
}

export default LoginLogin;