import { Route, Routes as Switch } from "react-router-dom";
import { Cadastro, Home, Login, Usuario } from "../pages";

export default function Routes() {
    return(
        <Switch>
            <Route path="/" element={<Login />}></Route>
            <Route path="/cadastro" element={<Cadastro />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/usuario" element={<Usuario />}></Route>
        </Switch>
    )
}