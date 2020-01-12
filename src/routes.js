import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import Principal from "./pages/Principal";
import DetalheTitulo from "./pages/DetalheTitulo";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Cadastrar,
    Principal,
    DetalheTitulo
  })
);

export default Routes;
