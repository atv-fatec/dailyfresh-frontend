import { Button, Col, Form, FormFloating, Image, Row } from "react-bootstrap";
import { Botao, Input } from "../../componentes";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Login.css"
import { branco } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event:any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else{
            navigate("/home")
        }
        setValidated(true);
      };

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
                            </Form>
                            <div className="login-container-cad">
                                <p className="login-cadastro">Não possui cadastro? <a href="/cadastro">Cadastre-se aqui!</a></p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}