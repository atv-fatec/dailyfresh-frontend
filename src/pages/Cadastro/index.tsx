import { faCalendar, faEnvelope, faIdCard, faLock, faMobileScreen, faUser } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { branco } from "../../assets";
import { Input, Botao } from "../../componentes";
import { ModalTermos } from "../../componentes/modalTermos/modalTermos";
import "./Cadastro.css";
import axios from "axios";
import { UserData } from "../../interface/dadosUsuario";

export function Cadastro() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        senha: '',
        aceitaTermos: false,
        termos: {
            armazenamentoDados: false,
            pagamentoDados: false,
            propagandas: false,
            envioEmail: false,
            envioSms: false,
        }
    });

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false || !acceptedTerms) {
            setValidated(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:7890/user/create', formData);
            console.log("CADASTRO REALIZADO COM SUCESSO", formData)
            navigate("/");
            
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTermosClick = () => {
        setShowModal(true);
    };

    const handleAcceptTerms = () => {
        setShowModal(false);
        setFormData(prevData => ({
            ...prevData,
            aceitaTermos: true,
        }));
        setAcceptedTerms(true);
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
                                <Input 
                                    label={"Nome"} 
                                    type={"text"} 
                                    placeholder={"nome"} 
                                    icon={faUser} 
                                    cid={"idNome"} 
                                    error="O campo nome é obrigatório" 
                                    onChange={handleInputChange} 
                                    name={"nome"}
                                 />
                                <Input
                                    label={"CPF"}
                                    type={"number"}
                                    placeholder={"123.456.789-01"}
                                    icon={faIdCard}
                                    cid={"idCPF"}
                                    error="O campo CPF é obrigatório"
                                    onChange={handleInputChange}
                                    name={"cpf"}
                                />
                                <Input
                                    label={"Data de nascimento"}
                                    type={"date"}
                                    placeholder={""}
                                    icon={faCalendar}
                                    cid={"idData"}
                                    error="O campo data de nascimento é obrigatório"
                                    onChange={handleInputChange}
                                    name={"dataNascimento"}
                                />
                                <Input
                                    label={"Telefone"}
                                    type={"telephone"}
                                    placeholder={"(12) 12345-6789"}
                                    icon={faMobileScreen}
                                    cid={"idTel"}
                                    error="O campo telefone é obrigatório"
                                    onChange={handleInputChange}
                                    name={"telefone"}
                                />
                                <Input 
                                    label={"Email"} 
                                    type={"email"} 
                                    placeholder={"usuario@email.com"} 
                                    icon={faEnvelope} cid={"idEmailC"} 
                                    error="O campo email é obrigatório" 
                                    onChange={handleInputChange} 
                                    name={"email"} 
                                />
                                <Input 
                                    label={"Senha"} 
                                    type={"password"} 
                                    placeholder={""} 
                                    icon={faLock} 
                                    cid={"idSenhaC"} 
                                    error="O campo senha é obrigatório" 
                                    onChange={handleInputChange} 
                                    name={"senha"} 
                                />
                                <Input 
                                    label={"Repetir senha"} 
                                    type={"password"} 
                                    placeholder={""} 
                                    icon={faLock} 
                                    cid={"idSenhaC2"}
                                    error="O campo senha é obrigatório" 
                                    name={"repetirSenha"}
                                    onChange={handleInputChange}
                                 />
                                <Form.Check
                                    className="termo"
                                    type="checkbox"
                                    id="cadastro-checkbox"
                                    label="Você aceita o Termo de Uso de Dados?"
                                    required
                                    feedback="Você deve aceitar os termos para se cadastrar"
                                    feedbackType="invalid"
                                    checked={acceptedTerms}
                                    onChange={(e) => {
                                        setAcceptedTerms(e.target.checked);
                                        setFormData(prevData => ({
                                            ...prevData,
                                            aceitaTermos: e.target.checked,
                                        }));
                                    }}
                                    name="aceitaTermos"
                                />
                                <a onClick={handleTermosClick} 
                                className="termos-modal">Saiba mais sobre os Termos aqui!</a>
                                <Botao 
                                    label="Sign Up" 
                                    id="signup-btn" 
                                    type="submit" 
                                    disabled={!acceptedTerms}
                                 />
                            </Form>
                        </div>
                    </div>
                </Col>
                {/* ... */}
            </Row>
            {showModal && (
                <ModalTermos
                    Show={showModal}
                    OnHide={() => setShowModal(false)}
                    formData={formData}
                    setFormData={setFormData}
                    OnAccept={handleAcceptTerms}
                    OnReject={() => {
                        setAcceptedTerms(false);
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
}
