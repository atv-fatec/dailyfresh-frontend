import { Button, Container } from "react-bootstrap";
import { Botao, ModalEdit, NavBar } from "../../componentes";
import "./Usuario.css"
import { useState } from "react";
import { UserData } from "../../interface/dadosUsuario";
import { useNavigate } from "react-router-dom";

export function Usuario() {
    const [modalShow, setModalShow] = useState(false);
    const userData: string | null = localStorage.getItem("usuario");
    const userObject = JSON.parse(userData || "{}") as UserData ;
    const navigate = useNavigate();



    return(
        <>
            <NavBar/>
            <Container className="user-container">
                <h1 className="user-titles tiltle-principal">Olá, {userObject.nome}</h1>
                <hr/>
                <h4 className="user-titles">CPF</h4>
                <p className="user-info">{userObject.cpf}</p>
                <h4 className="user-titles">Data de Nascimento</h4>
                <p className="user-info">{userObject.dataNascimento}</p>
                <h4 className="user-titles">Telefone</h4>
                <p className="user-info">{userObject.telefone}</p>
                <h4 className="user-titles">Email</h4>
                <p className="user-info">{userObject.email}</p>
                <hr/>
                <Botao label={"Editar"} id={"edit-btn"} OnClick={() => setModalShow(true)}/>
                <Botao label={"Log Out"} id={"logout-btn"} OnClick={() => {
                    localStorage.clear()
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