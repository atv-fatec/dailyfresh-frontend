import { faUser, faIdCard, faMobileScreen, faEnvelope, faLock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Form, Modal } from "react-bootstrap";
import { Input } from "../input";
import { useEffect, useState } from "react";
import { IModal } from "../../interface/modal";
import { Botao } from "..";
import "./modal.css"
import axios from "axios";
import { UserData } from "../../interface/dadosUsuario";

export function ModalEdit(props: IModal) {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const userData: string | null = localStorage.getItem("usuario");
    const userObject = JSON.parse(userData || "{}") as UserData ;
    const [formData, setFormData] = useState({
        nome: '',
        //email: '',
        dataNascimento: '',
        telefone: '',
        senha: ''
    });
    const [termoData, setTermoData] = useState({
        termos: {
            armazenamentoDados: false,
            pagamentoDados: false,
            propagandas: false,
            envioEmail: false,
            envioSms: false,
        },
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const getUserId = (userData: string) => {
        const userObject = JSON.parse(userData);
        return userObject.id;
    
      };

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        console.log(formData)
        

        try {
            const response = await axios.put(`http://localhost:7890/user/update/${userObject.id}`, formData);
            const resposta = await axios.put(`http://localhost:7890/user/updateConditions/${userObject.id}`, termoData);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        } finally {
            localStorage.setItem("usuario", JSON.stringify(formData));
            props.OnHide();
        }
    };

    useEffect (() => {
        if (props.formData && props.formData.resposta && Array.isArray(props.formData.resposta) && props.formData.resposta.length > 0) {
            const lastResponse = props.formData.resposta[props.formData.resposta.length - 1];
            if (lastResponse) {
                setTermoData({
                    termos: {
                        armazenamentoDados: lastResponse.armazenamentoDados || false,
                        pagamentoDados: lastResponse.pagamentoDados || false,
                        propagandas: lastResponse.propagandas || false,
                        envioEmail: lastResponse.envioEmail || false,
                        envioSms: lastResponse.envioSms || false,
                    },
                });
            }
        }
        setFormData({
            //email: props.formData.email,
            nome: props.formData.nome,
            dataNascimento: props.formData.dataNascimento,
            telefone: props.formData.telefone,
            senha: props.formData.senha,
        })
    }, [props.formData])

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.Show}
                onHide={props.OnHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
                        Edição do usuário
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            value={formData.nome}
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
                            value={formData.dataNascimento}
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
                            value={formData.telefone}
                        />
{/*                         <Input
                            label={"Email"}
                            type={"email"}
                            placeholder={"example@example.com"}
                            icon={faMobileScreen}
                            cid={"idTel"}
                            error="O campo telefone é obrigatório"
                            onChange={handleInputChange}
                            name={"email"}
                            value={formData.email}
                        /> */}
                        <Form.Check
                            type="switch"
                            id="aceitarDados"
                            label="Aceitar armazenamento de dados e armazenamento de dados de pagamento"
                            checked={termoData.termos.armazenamentoDados}
                            onChange={() => {
                                const updatedFormData = {
                                    ...termoData,
                                    termos: {
                                        ...termoData.termos,
                                        armazenamentoDados: !termoData.termos.armazenamentoDados,
                                        pagamentoDados: !termoData.termos.pagamentoDados,
                                    }
                                };
                                setTermoData(updatedFormData);
                            }}
                            className="custom-switch"
                        />
                        <Form.Check
                            type="switch"
                            id="aceitarSMS"
                            label="Aceitar receber SMS"
                            checked={termoData.termos.envioSms}
                            onChange={() => {
                                const updatedFormData = {
                                    ...termoData,
                                    termos: {
                                        ...termoData.termos,
                                        envioSms: !termoData.termos.envioSms,
                                    }
                                };
                                setTermoData(updatedFormData);
                            }}
                            className="custom-switch"
                        />
                        <Form.Check
                            type="switch"
                            id="aceitarEmail"
                            label="Aceitar receber emails"
                            checked={termoData.termos.envioEmail}
                            onChange={() => {
                                const updatedFormData = {
                                    ...termoData,
                                    termos: {
                                        ...termoData.termos,
                                        envioEmail: !termoData.termos.envioEmail,
                                    }
                                };
                                setTermoData(updatedFormData);
                            }}
                            className="custom-switch"
                        />
                        <Form.Check
                            type="switch"
                            id="aceitarPropaganda"
                            label="Aceitar receber propaganda"
                            checked={termoData.termos.propagandas}
                            onChange={() => {
                                const updatedFormData = {
                                    ...termoData,
                                    termos: {
                                        ...termoData.termos,
                                        propagandas: !termoData.termos.propagandas,
                                    }
                                };
                                setTermoData(updatedFormData);
                            }}
                            className="custom-switch"
                        />
                        <Botao 
                            label="Salvar" 
                            id="signup-btn" 
                            type="submit" 
                        />
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}