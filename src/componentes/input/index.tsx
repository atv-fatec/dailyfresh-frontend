import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatingLabel, Form } from "react-bootstrap";
import { IInput } from "../../interface/input";
import "./input.css"

export function Input(props: IInput){
    return(
        <>
            <FloatingLabel
                controlId={props.cid}
                label={<span className="input-label"><FontAwesomeIcon icon={props.icon} size="lg" className="input-icon"/> {props.label}</span>}
                className="mb-3 input-style"
            >
                <Form.Control type={props.type} placeholder={props.placeholder} required onChange={props.onChange} name={props.name}/>
                <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
            </FloatingLabel>
        </>
    )
}