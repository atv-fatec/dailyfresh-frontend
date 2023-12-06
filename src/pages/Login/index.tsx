import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Botao, Input } from "../../componentes";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { branco } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function Login() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [loginError, setLoginError] = useState("");

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            try {
                const response = await handleLogin(event.target.idEmail.value, event.target.idSenha.value);
                
                const userData = JSON.stringify(response.data);
                Cookies.set("usuario", userData, { expires: 7 });
                navigate("/home");
            } catch (error) {
                console.error(error);
            }
        }
        setValidated(true);
    };
    
    const handleLogin = async (email: string, senha: string) => {
        try {
            const response = await axios.post("http://localhost:5000/user/login", {
                email,
                senha
            });
    
            return response;
        } catch (error:any) {
            if (error.response && error.response.data && error.response.data.data) {
                alert('Erro: ' + error.response.data.data);
              } else {
                alert('Erro ao realizar login. Por favor, verificar se email e senha estão corretos.');
              }
            throw error;
        }
    }

    return(
        <>
            <Row className="login-row">
                <Col>
                    <div className="login-image"></div>
                </Col>
                <Col>
                    <div className="login-container">
                        <div className="login-form">
                            <div className="login-container-logo">
                                <Image src={branco} rounded className="login-logo"/>
                            </div>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Input label={"Email"} type={"email"} placeholder={"usuario@email.com"} icon={faEnvelope} cid={"idEmail"} error="Por favor, insira o email"/>
                                <Input label={"Senha"} type={"password"} placeholder={""} icon={faLock} cid={"idSenha"} error="Por favor, insira a senha"/>
                                <Botao label="Log In" id="login-btn" type="submit"/>
                                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                            </Form>
                            <div className="login-container-cad">
                                <p className="login-cadastro">Não possui cadastro? <a href="/cadastro" className="log-cad">Cadastre-se aqui!</a></p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
