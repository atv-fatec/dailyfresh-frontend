import { faUser, faIdCard, faMobileScreen, faEnvelope, faLock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Form, Modal } from "react-bootstrap";
import { Input } from "../input";
import { useState } from "react";
import { IModal } from "../../interface/modal";
import { Botao } from "..";
import "./modal.css"

export function ModalEdit(props: IModal){
    const [modalShow, setModalShow] = useState(false);
    return(
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
                    <Form>
                        <Input label={"Nome"} type={"text"} placeholder={"nome"} icon={faUser} cid={""}/>
                        <Input label={"CPF"} type={"number"} placeholder={"123.456.789-01"} icon={faIdCard} cid={""}/>
                        <Input label={"Data de nascimento"} type={"date"} placeholder={""} icon={faCalendar} cid={""}/>
                        <Input label={"Telefone"} type={"telephone"} placeholder={"(12) 12345-6789"} icon={faMobileScreen} cid={""}/>
                        <Input label={"Email"} type={"email"} placeholder={"usuario@email.com"} icon={faEnvelope} cid={""}/>
                        <Input label={"Senha"} type={"password"} placeholder={""} icon={faLock} cid={""}/>
                        <Input label={"Repetir senha"} type={"password"} placeholder={""} icon={faLock} cid={""}/>
                        <Botao label="Salvar" id="signup-btn" type="submit"/>
                    </Form>
                </Modal.Body>
                
            </Modal>
        </>
    )
}