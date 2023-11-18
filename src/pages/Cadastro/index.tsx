import { faEnvelope, faIdCard, faLock, faMobileScreen, faUser } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Image, Form } from "react-bootstrap";
import { branco } from "../../assets";
import { Input, Botao } from "../../componentes";
import "./Cadastro.css"
import { useNavigate } from "react-router-dom";

export function Cadastro() {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/');
      };

    return(
        <>
            <Row>
                <Col>
                    <div className="cad-container">
                        <div className="cad-form">
                            <div className="cad-container-logo">
                                <Image src={branco} rounded className="cad-logo"/>
                            </div>
                            <Input label={"Nome"} type={"text"} placeholder={"nome"} icon={faUser}/>
                            <Input label={"CPF"} type={"number"} placeholder={"123.456.789-01"} icon={faIdCard}/>
                            <Input label={"Telefone"} type={"telephone"} placeholder={"(12) 12345-6789"} icon={faMobileScreen}/>
                            <Input label={"Email"} type={"email"} placeholder={"usuario@email.com"} icon={faEnvelope}/>
                            <Input label={"Senha"} type={"password"} placeholder={""} icon={faLock}/>
                            <Input label={"Repetir senha"} type={"password"} placeholder={""} icon={faLock}/>
                            <Form.Check
                                className="termo"
                                type="checkbox"
                                id="cadastro-checkbox"
                                label="Você aceita o Termo de Uso de Dados?"
                            />
                            <Botao label="Sign Up" id="signup-btn" OnClick={handleSignUpClick}/>
                        </div>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}