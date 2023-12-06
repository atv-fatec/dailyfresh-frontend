import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IModalTermos } from "../../interface/modalTermos";
import "./modal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../interface/dadosUsuario";
import Cookies from "js-cookie";

export function ModalTermos(props: IModalTermos & { formData: any; setFormData: any }) {
    const [formData, setFormData] = useState({
        obrigatorios: [] as any[], 
        condicoes: [] as any[],     
        meios: [] as any[], 
    });
    const [validated, setValidated] = useState(false);
    const userData = Cookies.get("usuario");
    const userObject = JSON.parse(userData || "{}") as UserData ;
    const [termosData, setTermosData] = useState({versao: '', mensagem: '', data: ''});
    const [obrigatoriosTermo, setObrigatoriosTermo] = useState<string[]>([]);
    const [condicoesTermo, setCondicoesTermo] = useState<string[]>([]);
    const [meiosTermo, setMeiosTermo] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idResponse = await axios.get('http://localhost:5000/term/readLatest');
                const id = idResponse.data.latestTermId;
                console.log(id)

                const termResponse = await axios.get(`http://localhost:5000/term/read/${id}`);
                const termo = termResponse.data;
                setTermosData(termo.data);
                console.log("ESSE AQUI!",termo.data)
                setObrigatoriosTermo(termo.data.obrigatorios.split(','));
                setCondicoesTermo(termo.data.condicoes.split(','));
                setMeiosTermo(termo.data.meios.split(','));
                setFormData({...formData, obrigatorios: termo.data.obrigatorios.split(',').map((term: any)=> false), condicoes: termo.data.condicoes.split(',').map((term: any)=> false), meios: termo.data.meios.split(',').map((term: any)=> false)})  

            } catch (error) {
                console.error('Erro ao obter dados do termo mais recente:', error);
            }
        };
    
        fetchData();
        
    }, []);
    const navigate = useNavigate();

    const handleCheckboxChangeObrigatorios = (event: any) => {
        let { name } = event.target;
        let  index  = name.split('-')[1]
        index = parseInt(index)
        const value = event.target.checked 
        
        setFormData({
            ...formData,
            obrigatorios: formData.obrigatorios.map((item: any, i: any) => {
                if (i == index) {
                    return value; 
                }
                return item; 
            }),
        });


    }

    const handleCheckboxChangeCondicoes = (event: any) => {
        let { name } = event.target;
        let  index  = name.split('-')[1]
        index = parseInt(index)
        const value = event.target.checked 
        
        setFormData({
            ...formData,
            condicoes: formData.condicoes.map((item: any, i: any) => {
                if (i == index) {
                    return value; 
                }
                return item; 
            }),
        });
    }

    const handleCheckboxChangeMeios = (event: any) => {
        let { name } = event.target;
        let  index  = name.split('-')[1]
        index = parseInt(index)
        const value = event.target.checked 
        
        setFormData({
            ...formData,
            meios: formData.meios.map((item: any, i: any) => {
                if (i == index) {
                    return value; 
                }
                return item; 
            }),
        });
    }

    const handleAceitar = () => {
        
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
                {termosData &&(
                    <>
                        <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
                            Termos e Condições - {termosData.versao}  ({termosData.data})
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="termo">{termosData.mensagem}</p>
                        <hr/>
                        <Form noValidate validated={validated}>
                        <h4 className="cadastro-subtitle">Ao se cadastrar, você concorda com os seguintes termos e condições:</h4>
                            {obrigatoriosTermo.map((item, index) => (
                                <Form.Check
                                    onChange={(e) => handleCheckboxChangeObrigatorios(e)}
                                    required
                                    key={index}
                                    label={`${item}`}
                                    name={`obrigatorios-${index}`}
                                    type="checkbox"
                                    id={`seila-${index + 1}`}
                                    className="cadastro-check"
                                />
                            ))}
                            {condicoesTermo.map((item, index) => (
                                <Form.Check
                                    key={index}
                                    onChange={(e) => handleCheckboxChangeCondicoes(e)}
                                    label={item}
                                    name={`condicoes-${index}`}
                                    type="checkbox"
                                    id={`seila-condicoes-${index + 1}`}
                                    className="cadastro-check"
                                />
                            ))}
                            <hr/>
                            <h4 className="cadastro-subtitle">Ao se cadastrar, você concorda receber notícias e propagandar por:</h4>
                            {meiosTermo.map((item, index) => (
                                <Form.Check
                                    key={index}
                                    onChange={(e) => handleCheckboxChangeMeios(e)}
                                    label={item}
                                    name={`meios-${index}`}
                                    type="checkbox"
                                    id={`seila-meios-${index + 1}`}
                                    className="cadastro-check"
                                />
                            ))}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleAceitar} className="btn-aceitar" type="submit">Enviar</Button>
                    </Modal.Footer>
                    </>
                )}
            </Modal>
        </>
    )
}