import { faUser, faIdCard, faMobileScreen, faEnvelope, faLock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Form, Modal } from "react-bootstrap";
import { Input } from "../input";
import { useEffect, useState } from "react";
import { IModal } from "../../interface/modal";
import { Botao } from "..";
import "./modal.css"
import axios from "axios";
import { UserData } from "../../interface/dadosUsuario";
import Cookies from "js-cookie";

export function ModalEdit(props: IModal) {
    const [modalShow, setModalShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const userData = Cookies.get("usuario");
    const userObject = JSON.parse(userData || "{}") as UserData;
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        email: '',
        senha: '',
        obrigatorios: [] as any[], 
        condicoes: [] as any[],     
        meios: [] as any[], 
    });
    const [obrigatoriosTermo, setObrigatoriosTermo] = useState<string[]>([]);
    const [condicoesTermo, setCondicoesTermo] = useState<string[]>([]);
    const [meiosTermo, setMeiosTermo] = useState<string[]>([]);
    console.log(userObject)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let formattedValue = value;
        if (name === 'dataNascimento') {
            formattedValue = formatMyDate(value);
        }
        (userObject as any)[name] = value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: formattedValue,
        }));
    };

    // Função para formatar a data, ajuste conforme necessário
    const formatMyDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getUserId = (userData: string) => {
        const userObject = JSON.parse(userData);
        return userObject.id;

    };
    
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

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            console.log('Submit button clicked and validated!');
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else{
            try {
                await axios.put(`http://localhost:5000/user/update/${userObject.id}`, formData);
                await axios.put(`http://localhost:5000/user/updateConditions/${userObject.id}`, {obrigatorios: formData.obrigatorios, condicoes: formData.condicoes, meios: formData.meios});
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
            } finally {
                let userData: any = {...userObject, ...formData}
                /* userData.resposta = [termoData.termos] */
                Cookies.set("usuario", JSON.stringify(userData));
                props.OnHide();
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idResponse = await axios.get('http://localhost:5000/term/readLatest');
                const id = idResponse.data.latestTermId;
                console.log(id)

                const termResponse = await axios.get(`http://localhost:5000/term/read/${id}`);
                const termo = termResponse.data;
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
                            onChange={handleInputChange}
                            name={"nome"}
                            value={formData.nome? formData.nome : userObject.nome}
                        />
                        <Input
                            label={"CPF"}
                            type={"text"}
                            placeholder={"000.000.000-00"}
                            icon={faUser}
                            cid={"idCpf"}
                            onChange={handleInputChange}
                            name={"cpf"}
                            value={formData.cpf? formData.cpf : userObject.cpf}
                        />
                        <Input
                            label={"Data de nascimento"}
                            type={"date"}
                            placeholder={""}
                            icon={faCalendar}
                            cid={"idData"}
                            onChange={handleInputChange}
                            name={"dataNascimento"}
                            value={formData.dataNascimento? formData.dataNascimento : userObject.dataNascimento}
                        />
                        <Input
                            label={"Telefone"}
                            type={"telephone"}
                            placeholder={"(12) 12345-6789"}
                            icon={faMobileScreen}
                            cid={"idTel"}
                            onChange={handleInputChange}
                            name={"telefone"}
                            value={formData.telefone? formData.telefone : userObject.telefone}
                        />
                        <Input
                            label={"Email"}
                            type={"email"}
                            placeholder={"example@example.com"}
                            icon={faMobileScreen}
                            cid={"idEmail"}
                            onChange={handleInputChange}
                            name={"email"}
                            value={formData.email? formData.email : userObject.email}
                        />
                        <Input
                            label={"Senha"}
                            type={"senha"}
                            placeholder={"******"}
                            icon={faMobileScreen}
                            cid={"idSenha"}
                            onChange={handleInputChange}
                            name={"senha"}
                            value={formData.senha? formData.senha : userObject.senha}
                        />
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