import { Container, Navbar, NavbarBrand, Image, Nav } from "react-bootstrap";
import { pretoH } from "../../assets";
import "./NavBar.css"

export function NavBar(){
    return(
        <>
                <Navbar className="df-navbar">
                    <Container>
                        <NavbarBrand href="/home">
                            <Image src={pretoH} className="navbar-logo"/>
                        </NavbarBrand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav className="mr-auto">
                            <Nav.Link href="/home" className="navbar-itens">Home</Nav.Link>
                            <Nav.Link href="/usuario" className="navbar-itens">Usuário</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
        </>
    )
}