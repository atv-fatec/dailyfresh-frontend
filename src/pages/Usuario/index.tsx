import { Button, Container } from "react-bootstrap";
import { Botao, ModalEdit, NavBar } from "../../componentes";
import "./Usuario.css"
import { useState } from "react";
import { UserData } from "../../interface/dadosUsuario";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Usuario() {
    const [modalShow, setModalShow] = useState(false);
    const userData: string | null = localStorage.getItem("usuario");
    const userObject = JSON.parse(userData || "{}") as UserData ;
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/user/delete/${userObject.id}`);
            
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    const data = new Date(userObject.dataNascimento);
    const adicionarZero = (numero:number) => (numero < 10 ? `0${numero}` : numero);
    const dia = adicionarZero(data.getDate());
    const mes = adicionarZero(data.getMonth() + 1);
    const ano = data.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

console.log(userObject)
    return(
        <>
            <NavBar/>
            <Container className="user-container">
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
                <hr/>
                {userObject.resposta.length > 0 && userObject.resposta[userObject.resposta?.length - 1].armazenamentoDados? <>
                <h4 className="user-titles">Armazenamento de dados</h4>
                <p className="user-info">{userObject.resposta[userObject.resposta?.length - 1].armazenamentoDados? "Aceito" : "Negado"}</p>
                </>
                : <> </> }
                 {userObject.resposta.length > 0 && userObject.resposta[userObject.resposta?.length - 1].pagamentoDados? <>
                <h4 className="user-titles">Dados de pagamentos</h4>
                <p className="user-info">{userObject.resposta[userObject.resposta?.length - 1].pagamentoDados? "Aceito" : "Negado"}</p>
                
                </> : <> </> }
                {userObject.resposta.length > 0 && userObject.resposta[userObject.resposta?.length - 1].pagamentoDados? <>
                <h4 className="user-titles">Aceito receber propagandas</h4>
                <p className="user-info">{userObject.resposta[userObject.resposta?.length - 1].propagandas? "Aceito" : "Negado"}</p>
                </> : <> </> }

                {userObject.resposta.length > 0 && userObject.resposta[userObject.resposta?.length - 1].pagamentoDados? <>
                <h4 className="user-titles">Aceito receber email</h4>
                <p className="user-info">{userObject.resposta[userObject.resposta?.length - 1].envioEmail? "Aceito" : "Negado"}</p>
                </> : <> </> }

                {userObject.resposta.length > 0 && userObject.resposta[userObject.resposta?.length - 1].pagamentoDados? <>
                <h4 className="user-titles">Aceito receber SMS</h4>
                <p className="user-info">{userObject.resposta[userObject.resposta?.length - 1].envioSms? "Aceito" : "Negado"}</p>
                </> : <> </> }
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
                    Show={modalShow} formData={userObject}
                />
            </Container>
        </>
    )
}