import { faCalendar, faEnvelope, faIdCard, faLock, faMobileScreen, faUser } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { branco } from "../../assets";
import { Input, Botao } from "../../componentes";
import { ModalTermos } from "../../componentes/modalTermos/modalTermos";
import "./Cadastro.css"

export function Cadastro() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            navigate("/");
        }
        setValidated(true);
    };

    const handleTermosClick = () => {
        setShowModal(true);
    };

    return (
        <>
            <Row>
                <Col>
                    <div className="cad-container">
                        <div className="cad-form">
                            <div className="cad-container-logo">
                                <Image src={branco} rounded className="cad-logo" />
                            </div>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Input label={"Nome"} type={"text"} placeholder={"nome"} icon={faUser} cid={"idNome"} error="O campo nome é obrigatório"/>
                                <Input label={"CPF"} type={"number"} placeholder={"123.456.789-01"} icon={faIdCard} cid={"idCPF"} error="O campo CPF é obrigatório"/>
                                <Input label={"Data de nascimento"} type={"date"} placeholder={""} icon={faCalendar} cid={"idData"} error="O campo data de nascimento é obrigatório"/>
                                <Input label={"Telefone"} type={"telephone"} placeholder={"(12) 12345-6789"} icon={faMobileScreen} cid={"idTel"} error="O campo telefone é obrigatório"/>
                                <Input label={"Email"} type={"email"} placeholder={"usuario@email.com"} icon={faEnvelope} cid={"idEmailC"} error="O campo email é obrigatório"/>
                                <Input label={"Senha"} type={"password"} placeholder={""} icon={faLock} cid={"idSenhaC"} error="O campo senha é obrigatório"/>
                                <Input label={"Repetir senha"} type={"password"} placeholder={""} icon={faLock} cid={"idSenhaC2"} error="O campo senha é obrigatório"/>
                                <Form.Check
                                    className="termo"
                                    type="checkbox"
                                    id="cadastro-checkbox"
                                    label="Você aceita o Termo de Uso de Dados?"
                                    required
                                    feedback="Você deve aceitar os termos para se cadastrar"
                                    feedbackType="invalid"
                                />
                                <a onClick={handleTermosClick} className="termos-modal">Saiba mais sobre os Termos aqui!</a>
                                <Botao label="Sign Up" id="signup-btn" type="submit" />
                            </Form>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="login-image"></div>
                </Col>
            </Row>
            {showModal && (
                <ModalTermos
                    Show={showModal}
                    OnHide={() => setShowModal(false)}
                />
            )}
        </>
    );
}