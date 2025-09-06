//  COMPONENT CONFIG
const component = "usuario"; // COMPONENT NAME 
const version = "2.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Lista from "./Pages/Lista";
import Registro from "./Pages/Registro";
import RecuperarPass from "./Pages/RecuperarPass";
import CodigoRecuperarPass from "./Pages/CodigoRecuperarPass";
import NuevoPass from "./Pages/NuevoPass";
import TipoUsuario from "./Pages/TipoUsuario";
import Login from "./Pages/Login";
import Editar from "./Pages/EditarUsuario";

//alvaro
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component]: Lista,
        [component + "/registro"]: Registro,
        [component + "/recuperarContrasena"]: RecuperarPass,
        [component + "/codigoRecuperarContrasena"]: CodigoRecuperarPass,
        [component + "/nuevaContrasena"]: NuevoPass,
        "login":Login,
        "editar": Editar
    }
}