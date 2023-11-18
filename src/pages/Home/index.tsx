import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input, NavBar } from "../../componentes";
import "./Home.css"
import { Row, Col, Card, Container } from "react-bootstrap";
import { card, card2, card3, card4 } from "../../assets";

const pratos = [
    {
      "nome": "Salada de Quinoa",
      "preco": 12.99,
      "avaliacao": 4.5,
      "imagem": card
    },
    {
      "nome": "Wrap de Frango Grelhado",
      "preco": 9.99,
      "avaliacao": 4.2,
      "imagem": card2
    },
    {
      "nome": "Sopa de Legumes",
      "preco": 7.99,
      "avaliacao": 4.0,
      "imagem": card3
    },
    {
      "nome": "Smoothie de Frutas Frescas",
      "preco": 5.99,
      "avaliacao": 4.7,
      "imagem": card4
    },
    {
      "nome": "Bowl de Quinoa e Vegetais",
      "preco": 10.99,
      "avaliacao": 4.4,
      "imagem": card
    },
    {
      "nome": "Frango ao Curry com Brócolis",
      "preco": 14.99,
      "avaliacao": 4.6,
      "imagem": card2
    },
    {
      "nome": "Tigela de Açaí com Granola",
      "preco": 8.99,
      "avaliacao": 4.8,
      "imagem": card3
    },
    {
      "nome": "Peixe Grelhado com Molho de Limão",
      "preco": 13.99,
      "avaliacao": 4.3,
      "imagem": card4
    },
    {
      "nome": "Salada de Frutas Tropicais",
      "preco": 6.99,
      "avaliacao": 4.9,
      "imagem": card
    },
    {
      "nome": "Tofu Stir-Fry com Legumes",
      "preco": 11.99,
      "avaliacao": 4.1,
      "imagem": card2
    },
    {
      "nome": "Sanduíche de Abacate e Ovo",
      "preco": 9.49,
      "avaliacao": 4.5,
      "imagem": card3
    },
    {
      "nome": "Ceviche de Camarão",
      "preco": 15.99,
      "avaliacao": 4.7,
      "imagem": card4
    }
  ];
  

export function Home() {
    return(
        <>
        <NavBar/>
        <div className="home-banner">
            <Container className="home-banner-container">
                <div className="home-banner-cont">
                    <Input label={"Pesquisar..."} type={"text"} placeholder={"nome dos pratos"} icon={faMagnifyingGlass}/>
                    <h2 className="home-banner-title">Explore nossos pratos!</h2>
                </div>
            </Container>
        </div>
        <Container className="home-container">
            <Row>
                {pratos.map(({nome, preco, imagem}, index)=>{
                    return(
                        <Col md={3} className="home-container-card">
                            <Card className="home-card" style={{ width: '14rem' }}>
                                <Card.Img variant="top" src={imagem} />
                                <Card.Body>
                                    <Card.Title className="home-card-title">{nome}</Card.Title>
                                    <Card.Text className="home-card-price">
                                        R$ {preco}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
        </>
    )
}