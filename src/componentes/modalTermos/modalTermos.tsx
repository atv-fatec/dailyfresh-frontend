import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IModalTermos } from "../../interface/modalTermos";
import "./modal.css";
import axios from "axios";

export function ModalTermos(props: IModalTermos & { formData: any; setFormData: any }) {
    const { formData, setFormData } = props;
    const [validated, setValidated] = useState(false);
    const [latestTermId, setLatestTermId] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [versao, setVersao] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obter o ID mais recente
                const idResponse = await axios.get('http://localhost:5000/term/readLatest');
                const id = idResponse.data.latestTermId;

                // Verificar se há um ID válido
                if (id !== null && id !== undefined) {
                    // Usar o ID para obter os dados do termo mais recente
                    const termResponse = await axios.get(`http://localhost:5000/term/read/${id}`);
                    const termo = termResponse.data;

                    // Atualizar os estados com os dados do termo mais recente
                    const data = new Date(termo.data.data);
                    const adicionarZero = (numero:number) => (numero < 10 ? `0${numero}` : numero);
                    const dia = adicionarZero(data.getDate());
                    const mes = adicionarZero(data.getMonth() + 1);
                    const ano = data.getFullYear();
                    const dataFormatada = `${dia}/${mes}/${ano}`;

                    setLatestTermId(id);
                    setMensagem(termo.data.mensagem);
                    setData(dataFormatada);
                    setVersao(termo.data.versao);
                } else {
                    console.error('ID do termo mais recente inválido.');
                }
            } catch (error) {
                console.error('Erro ao obter dados do termo mais recente:', error);
            }
        };

        fetchData();
    }, []);

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
                        Termos e Condições - Versão {versao} ({data})
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{mensagem}</p>
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
