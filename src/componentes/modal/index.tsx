import { faUser, faIdCard, faMobileScreen, faEnvelope, faLock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Form, Modal } from "react-bootstrap";
import { Input } from "../input";
import { useEffect, useState } from "react";
import { IModal } from "../../interface/modal";
import { Botao } from "..";
import "./modal.css"
import axios from "axios";

export function ModalEdit(props: IModal) {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        //email: '',
        dataNascimento: '',
        telefone: '',
        senha: '',
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
        try {
            const response = await axios.put(`http://localhost:7890/user/update/${props.formData.id}`, formData);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        } finally {
            localStorage.setItem("usuario", JSON.stringify(formData));
            props.OnHide();
        }
    };

    useEffect (() => {
        setFormData({
            //email: props.formData.email,
            nome: props.formData.nome,
            dataNascimento: props.formData.dataNascimento,
            telefone: props.formData.telefone,
            senha: props.formData.senha,
        })
    }, [])

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