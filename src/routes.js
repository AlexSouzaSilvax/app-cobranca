import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import EsqueciSenha from "./pages/EsqueciSenha";
import Principal from "./pages/Principal";
import DetalheUsuario from "./pages/DetalheUsuario";
import DetalheTitulo from "./pages/DetalheTitulo";

const Routes = createAppContainer(
  createSwitchNavigator({
    Loading,
    Login
    /*Cadastrar,
    EsqueciSenha,
    Principal,
    DetalheUsuario,
    DetalheTitulo*/
  })
);

export default Routes;
