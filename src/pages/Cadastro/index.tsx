import { faCalendar, faEnvelope, faIdCard, faLock, faMobileScreen, faUser } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { branco } from "../../assets";
import { Input, Botao } from "../../componentes";
import "./Cadastro.css";
import axios from "axios";
import { UserData } from "../../interface/dadosUsuario";
import { ModalTermos } from "../../componentes/modalTermos/modalTermos";

export function Cadastro() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idResponse = await axios.get('http://localhost:5000/term/readLatest');
                const id = idResponse.data.latestTermId;
                console.log(id)

                const termResponse = await axios.get(`http://localhost:5000/term/read/${id}`);
                const termo = termResponse.data;
                console.log(termo.data.obrigatorios.split(','))
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
        console.log(formData);
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
            console.log('Submit button clicked and validated!');
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }else{
            event.preventDefault();
            try {
                const response = await axios.post('http://localhost:5000/user/create', {
                    ...formData,
                })
                navigate('/');
            } catch (error:any) {
                console.error('Erro ao enviar dados:', error);
                if (error.response && error.response.data && error.response.data.data) {
                    alert('Erro: ' + error.response.data.data);
                } else {
                    alert('Erro ao enviar dados. Por favor, tente novamente mais tarde.');
                }
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
                                    label={"Email"} 
                                    type={"email"} 
                                    placeholder={"usuario@email.com"} 
                                    icon={faEnvelope} cid={"idEmailC"} 
                                    error="O campo email é obrigatório" 
                                    onChange={handleInputChange} 
                                    name={"email"} 
                                />
                                <Input 
                                    required
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
                                    required
                                    label={"Repetir senha"} 
                                    type={"password"} 
                                    placeholder={""} 
                                    icon={faLock} 
                                    cid={"idSenhaC2"}
                                    error="O campo senha é obrigatório" 
                                    name={"repetirSenha"}
                                    onChange={handleInputChange}
                                 />

                                <h4>Ao se cadastrar, você concorda com os termos:</h4>
                                 {obrigatoriosTermo.map((item, index) => (
                                    <Form.Check
                                        onChange={(e) => handleCheckboxChangeObrigatorios(e)}
                                        required
                                        key={index}
                                        label={`${item}`}
                                        name={`obrigatorios-${index}`}
                                        type="checkbox"
                                        id={`seila-${index + 1}`}
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
                                    />
                                ))}

                                <h4>Ao se cadastrar, você concorda receber notícias e propagandar por:</h4>
                                {meiosTermo.map((item, index) => (
                                    <Form.Check
                                        key={index}
                                        onChange={(e) => handleCheckboxChangeMeios(e)}
                                        label={item}
                                        name={`meios-${index}`}
                                        type="checkbox"
                                        id={`seila-meios-${index + 1}`}
                                    />
                                ))}
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
            </Row>
        </>
    );
}
