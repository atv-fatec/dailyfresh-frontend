import { Col, Image, Row } from "react-bootstrap";
import { Botao, Input } from "../../componentes";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Login.css"
import { branco } from "../../assets";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate('/home');
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
                            <Input label={"Email"} type={"email"} placeholder={"usuario@email.com"} icon={faEnvelope}/>
                            <Input label={"Senha"} type={"password"} placeholder={""} icon={faLock}/>
                            <Botao label="Log In" id="login-btn" OnClick={handleLogInClick}/>
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