import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { IModalTermos } from "../../interface/modalTermos";
import "./modal.css";

export function ModalTermos(props: IModalTermos & { formData: any; setFormData: any }) {
    const { formData, setFormData } = props;
    const [validated, setValidated] = useState(false);

    const handleAceitar = () => {
        const updatedFormData = {
            ...formData,
            termos: {
                armazenamentoDados: true,
                pagamentoDados: true,
                propagandas: true,
                envioEmail: true,
                envioSms: true,
            }
        };

        setFormData(updatedFormData);
        props.OnAccept();
        props.OnHide();
    };

    const handleRecusar = () => {
        const updatedFormData = {
            ...formData,
            termos: {
                armazenamentoDados: false,
                pagamentoDados: false,
                propagandas: false,
                envioEmail: false,
                envioSms: false,
            }
        };

        setFormData(updatedFormData);
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
                    <p>Lorem Ipsum...</p>
                    <Form noValidate validated={validated}>
                        <Form.Check
                            type="switch"
                            id="aceitarDados"
                            label="Aceitar armazenamento de dados e armazenamento de dados de pagamento"
                            checked={formData.termos.armazenamentoDados}
                            onChange={() => {
                                const updatedFormData = {
                                    ...formData,
                                    termos: {
                                        ...formData.termos,
                                        armazenamentoDados: !formData.termos.armazenamentoDados,
                                        pagamentoDados: !formData.termos.pagamentoDados,
                                    }
                                };
                                setFormData(updatedFormData);
                            }}
                            className="custom-switch"
                        />
                        <Form.Check
                            type="switch"
                            id="aceitarSMS"
                            label="Aceitar receber SMS"
                            checked={formData.termos.envioSms}
                            onChange={() => {
                                const updatedFormData = {
                                    ...formData,
                                    termos: {
                                        ...formData.termos,
                                        envioSms: !formData.termos.envioSms,
                                    }
                                };
                                setFormData(updatedFormData);
                            }}
                            className="custom-switch"
                        />
                        <Form.Check
                            type="switch"
                            id="aceitarEmail"
                            label="Aceitar receber emails"
                            checked={formData.termos.envioEmail}
                            onChange={() => {
                                const updatedFormData = {
                                    ...formData,
                                    termos: {
                                        ...formData.termos,
                                        envioEmail: !formData.termos.envioEmail,
                                    }
                                };
                                setFormData(updatedFormData);
                            }}
                            className="custom-switch"
                        />
                        <Form.Check
                            type="switch"
                            id="aceitarPropaganda"
                            label="Aceitar receber propaganda"
                            checked={formData.termos.propagandas}
                            onChange={() => {
                                const updatedFormData = {
                                    ...formData,
                                    termos: {
                                        ...formData.termos,
                                        propagandas: !formData.termos.propagandas,
                                    }
                                };
                                setFormData(updatedFormData);
                            }}
                            className="custom-switch"
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleRecusar} className="btn-recusar">Recusar todas</Button>
                    <Button onClick={handleAceitar} className="btn-aceitar">Aceitar todos</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
