import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input, NavBar } from "../../componentes";
import "./Home.css";
import { Row, Col, Card, Container } from "react-bootstrap";
import { ModalTermos } from "../../componentes/modalTermos/modalTermos";
import { useEffect, useState } from "react";
import { card, card2, card3, card4 } from "../../assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const pratos = [
  {
    nome: "Salada de Quinoa",
    preco: 12.99,
    avaliacao: 4.5,
    imagem: card,
  },
  {
    nome: "Wrap de Frango Grelhado",
    preco: 9.99,
    avaliacao: 4.2,
    imagem: card2,
  },
  {
    nome: "Sopa de Legumes",
    preco: 7.99,
    avaliacao: 4.0,
    imagem: card3,
  },
  {
    nome: "Smoothie de Frutas Frescas",
    preco: 5.99,
    avaliacao: 4.7,
    imagem: card4,
  },
  {
    nome: "Bowl de Quinoa e Vegetais",
    preco: 10.99,
    avaliacao: 4.4,
    imagem: card,
  },
  {
    nome: "Frango ao Curry com Brócolis",
    preco: 14.99,
    avaliacao: 4.6,
    imagem: card2,
  },
  {
    nome: "Tigela de Açaí com Granola",
    preco: 8.99,
    avaliacao: 4.8,
    imagem: card3,
  },
  {
    nome: "Peixe Grelhado com Molho de Limão",
    preco: 13.99,
    avaliacao: 4.3,
    imagem: card4
  },
  {
    nome: "Salada de Frutas Tropicais",
    preco: 6.99,
    avaliacao: 4.9,
    imagem: card
  },
  {
    nome: "Tofu Stir-Fry com Legumes",
    preco: 11.99,
    avaliacao: 4.1,
    imagem: card2
  },
  {
    nome: "Sanduíche de Abacate e Ovo",
    preco: 9.49,
    avaliacao: 4.5,
    imagem: card3
  },
  {
    nome: "Ceviche de Camarão",
    preco: 15.99,
    avaliacao: 4.7,
    imagem: card4
  },
];

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const [allTermsAccepted, setAllTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    obrigatorios: [],
    condicoes: [],
    meios: [],
  });

  const navigate = useNavigate();
  const userData: string | undefined = Cookies.get("usuario");
  //console.log("cookieeeee", userData);

  useEffect(() => {
    if (userData) {
      const userObject = JSON.parse(userData);
      if (userObject.resposta && Array.isArray(userObject.resposta) && userObject.resposta.length > 0) {
        const termsResponse = String(userObject.resposta[0].obrigatorios);
        const arrayObrigatorios = termsResponse.split(',').map((obrigatorio) => obrigatorio === 'true');
        const termoNaoAceito = arrayObrigatorios.findIndex((obrigatorio) => !obrigatorio);
        if (termoNaoAceito !== -1) {
          setShowModal(true);
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
            if (userData){
              const userObject = JSON.parse(userData);

              const idResponse = await axios.get('http://localhost:5000/term/readLatest');
              const id = idResponse.data.latestTermId;

              const termResponse = await axios.get(`http://localhost:5000/term/read/${id}`);
              const termo = termResponse.data;
              console.log("termo", termo);
              if (new Date(userObject.resposta[userObject.resposta.length - 1].data) < new Date(termo.data.data)){
                setShowModal(true);
              }
            }
        } catch (error) {
            console.error('Erro ao obter dados do termo mais recente:', error);
        }
    };

    fetchData();
}, []);

  const updateUserConditions = (userId: any, updatedData: { armazenamentoDados: boolean; pagamentoDados: boolean; propagandas: boolean; envioEmail: boolean; envioSms: boolean; }) => {
    //console.log("Condições do usuário:", updatedData);
    axios
      .put(`http://localhost:5000/user/updateConditions/${userId}`, updatedData)
      .then((response) => {
        console.log("Condições do usuário atualizadas:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao atualizar condições:", error);
      });
  };

  // const handleAcceptTerms = async () => {
    
  //   const { armazenamentoDados, pagamentoDados } = formData.resposta[0];
  //   const atLeastOneRequiredAccepted = armazenamentoDados && pagamentoDados;
  //   const allAccepted = armazenamentoDados && pagamentoDados;
  //   formData.termos.armazenamentoDados = true
  //   formData.termos.pagamentoDados = true
    
  //   if (formData.termos.armazenamentoDados === true && formData.termos.pagamentoDados === true) {
  //     setShowModal(false);
  //     setAllTermsAccepted(allAccepted);
  
  //     if (userData) {
  //       const userObject = JSON.parse(userData);
  //       const userId = userObject.id;
  
  //       updateUserConditions(userId, formData.termos);
  //     }
  //   } else {
  //     navigate('/');
  //   }
  // };
  

  const getUserId = (userData: string | null) => {
    if (userData !== null) {
      const userObject = JSON.parse(userData);
      return userObject.id;
    }
    return null;
  };


  return (
    <>
      <NavBar />
      <div className="home-banner">
        <Container className="home-banner-container">
          <div className="home-banner-cont">
            <Input
              label={"Pesquisar..."}
              type={"text"}
              placeholder={"nome dos pratos"}
              icon={faMagnifyingGlass}
              cid={""}
            />
            <h2 className="home-banner-title">Explore nossos pratos!</h2>
          </div>
        </Container>
      </div>
      <Container className="home-container">
        <Row>
          {pratos.map(({ nome, preco, imagem }, index) => {
            return (
              <Col md={3} className="home-container-card" key={index}>
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
            );
          })}
        </Row>
      </Container>
    </>
  );
}
