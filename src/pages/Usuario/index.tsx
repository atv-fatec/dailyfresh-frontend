import { Button, Container } from "react-bootstrap";
import { Botao, ModalEdit, NavBar } from "../../componentes";
import "./Usuario.css"
import { useState } from "react";

export function Usuario() {
    const [modalShow, setModalShow] = useState(false);
    return(
        <>
            <NavBar/>
            <Container className="user-container">
                <h1 className="user-titles tiltle-principal">Olá, Usuário!</h1>
                <hr/>
                <h4 className="user-titles">CPF</h4>
                <p className="user-info">Informação</p>
                <h4 className="user-titles">Data de Nascimento</h4>
                <p className="user-info">Informação</p>
                <h4 className="user-titles">Telefone</h4>
                <p className="user-info">Informação</p>
                <h4 className="user-titles">Email</h4>
                <p className="user-info">Informação</p>
                <hr/>
                <Botao label={"Editar"} id={"edit-btn"} OnClick={() => setModalShow(true)}/>
                <Botao label={"Log Out"} id={"logout-btn"}/>
                <ModalEdit 
                    OnHide={() => setModalShow(false)} 
                    Show={modalShow}
                />
            </Container>
        </>
    )
}