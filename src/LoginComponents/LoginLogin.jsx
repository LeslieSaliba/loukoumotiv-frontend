import { useState } from "react";
import { Form, FormGroup, Input, Label } from 'reactstrap';
import '../CSS/Login.css';
import '../CSS/General.css';
import '../CSS/bootstrap.min.css';

function LoginLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
    }

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

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
                            onChange={(e) => setEmail(e.target.value)}
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
                            // type={showPassword ? "text" : "password"}
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                            className="form-style border-dark"
                            required
                        />
                        <Label for="MDP" className="login-label">
                            Mot de passe
                        </Label>
                        {/* {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16"
                                    width="20"
                                    viewBox="0 0 640 512"
                                    onClick={togglePasswordVisibility}
                                >
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="16"
                                    width="18"
                                    viewBox="0 0 576 512"
                                    onClick={togglePasswordVisibility}
                                >
                                </svg>
                            )} */}
                    </FormGroup>
                </div>
                <button
                    className="white-button"
                    // disabled={state.submitting}
                    type="submit"
                >
                    Se connecter
                </button>

                {/* {state.succeeded && (
                    <p>Succès ! Redirection vers l'espace missions...</p>
                )} */}
            </Form>


        </div>
    );
}

export default LoginLogin;
