import { Button, Container } from "react-bootstrap";
import { Botao, ModalEdit, NavBar } from "../../componentes";
import "./Usuario.css"
import { useEffect, useState } from "react";
import { UserData } from "../../interface/dadosUsuario";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export function Usuario() {
    const [modalShow, setModalShow] = useState(false);
    const userDataCookie = Cookies.get("usuario");
    const userObject = userDataCookie ? (JSON.parse(userDataCookie) as UserData) : null;
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false)
    const [respostaUser, setRespostaUser] = useState<UserData>();
    

    useEffect(() => {
        if (userObject && userObject.id) {
            axios.get(`http://localhost:5000/user/read/${userObject.id}`)
                .then((response) => {
                    setRespostaUser(response.data.data);
                })
                .catch((error) => {
                    console.error('Erro ao obter dados do usuário:', error);
                });
        }
    }, [userObject]);

    const handleDelete = async () => {
        try {
            if (userObject && userObject.id) {
                const response = await axios.delete(`http://localhost:5000/user/delete/${userObject.id}`);
            }
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    let dataFormatada: string | undefined;
    const dataNascimento = userObject?.dataNascimento;
    if (dataNascimento) {
        const data = new Date(dataNascimento);
        const adicionarZero = (numero: number) => (numero < 10 ? `0${numero}` : numero);
        const dia = adicionarZero(data.getDate());
        const mes = adicionarZero(data.getMonth() + 1);
        const ano = data.getFullYear();
        dataFormatada = `${dia}/${mes}/${ano}`;
    }
    
    return(
        <>
            <NavBar/>
            <Container className="user-container">
                {userObject &&(
                    <>
                        <h1 className="user-titles tiltle-principal">Olá, {userObject.nome}</h1>
                        <hr/>
                        <h4 className="user-titles">CPF</h4>
                        <p className="user-info">{userObject.cpf}</p>
                        <h4 className="user-titles">Data de Nascimento</h4>
                        <p className="user-info">{dataFormatada}</p>
                        <h4 className="user-titles">Telefone</h4>
                        <p className="user-info">{userObject.telefone}</p>
                        <h4 className="user-titles">Email</h4>
                        <p className="user-info">{userObject.email}</p>
                    </>
                    )
                }
                <hr/>
                <Botao label={"Editar"} id={"edit-btn"} OnClick={() => setModalShow(true)}/>
                <Botao label={"Log Out"} id={"logout-btn"} OnClick={() => {
                    localStorage.clear()
                    navigate("/");    
                }}/>
                <Botao label={"Deletar conta"} id={"delete-btn"} OnClick={() => {
                    handleDelete();
                    navigate("/"); 
                }}/>
                <ModalEdit 
                    OnHide={() => setModalShow(false)} 
                    Show={modalShow} formData={userObject || undefined}
                />
            </Container>
        </>
    )
}