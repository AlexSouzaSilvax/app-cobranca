import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Principal from './pages/Principal';
import DetalheTitulo from './pages/DetalheTitulo';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Principal,
        DetalheTitulo,
    })
);

export default Routes;