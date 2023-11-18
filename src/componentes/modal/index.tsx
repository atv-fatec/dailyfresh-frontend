import { faUser, faIdCard, faMobileScreen, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { Input } from "../input";
import { useState } from "react";
import { IModal } from "../../interface/modal";

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
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edição do usuário
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input label={"Nome"} type={"text"} placeholder={"nome"} icon={faUser}/>
                    <Input label={"CPF"} type={"number"} placeholder={"123.456.789-01"} icon={faIdCard}/>
                    <Input label={"Telefone"} type={"telephone"} placeholder={"(12) 12345-6789"} icon={faMobileScreen}/>
                    <Input label={"Email"} type={"email"} placeholder={"usuario@email.com"} icon={faEnvelope}/>
                    <Input label={"Senha"} type={"password"} placeholder={""} icon={faLock}/>
                    <Input label={"Repetir senha"} type={"password"} placeholder={""} icon={faLock}/>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}