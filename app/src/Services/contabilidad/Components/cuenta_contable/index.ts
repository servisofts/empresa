//  COMPONENT CONFIG
const component = "cuenta_contable"; // COMPONENT NAME 
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Lista from "./Pages/Lista";
import Registro from "./Pages/Registro";
import Perfil from "./Pages/Perfil";
import Tabla from "./Pages/Tabla";

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
        [component + "/perfil"]: Perfil,
        [component + "/tabla"]: Tabla,
    }
}