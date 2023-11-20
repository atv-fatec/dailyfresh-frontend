import { Button } from "react-bootstrap";
import { IBotao } from "../../interface/botao";
import "./Botao.css"
import { Link } from "react-router-dom";

export function Botao(props: IBotao){
    return(
        <>
            <div className="botao-container">
                    <Button className="botao-style" id={props.id} onClick={props.OnClick} type={props.type}>
                        {props.label}
                    </Button>
            </div>
        </>
    )
}