import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { IModal } from "../../interface/modal";
import "./modal.css";

export function ModalTermos(props: IModal) {
    const [modalShow, setModalShow] = useState(false);
    const [aceitaSMS, setAceitaSMS] = useState(false);
    const [aceitaEmail, setAceitaEmail] = useState(false);
    const [aceitaWhatsApp, setAceitaWhatsApp] = useState(false);

    const handleAceitar = () => {
        setModalShow(false);
        props.OnHide();
    };

    const handleRecusar = () => {
        setAceitaSMS(false);
        setAceitaEmail(false);
        setAceitaWhatsApp(false);
        props.OnHide();
    };

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
                        Termos e Condições
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="aceitarSMS"
                            label="Aceitar receber SMS"
                            checked={aceitaSMS}
                            onChange={() => setAceitaSMS(!aceitaSMS)}
                            className="custom-switch"
                        />
                        <Form.Check
                            type="switch"
                            id="aceitarEmail"
                            label="Aceitar receber emails"
                            checked={aceitaEmail}
                            onChange={() => setAceitaEmail(!aceitaEmail)}
                            className="custom-switch"
                        />
                        <Form.Check
                            type="switch"
                            id="aceitarWhatsApp"
                            label="Aceitar receber mensagens no WhatsApp"
                            checked={aceitaWhatsApp}
                            onChange={() => setAceitaWhatsApp(!aceitaWhatsApp)}
                            className="custom-switch"
                        />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleRecusar} className="btn-recusar">Recusar</Button>
                    <Button onClick={handleAceitar} className="btn-aceitar">Aceitar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
