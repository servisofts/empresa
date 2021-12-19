import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

// ********* TABLE CONFIG **********
const component = "page";
const table_props = {
    descripcion: { required: true, type: 'text' },
    url: { required: true, type: 'text' },
    // fecha_on: { required: true, type: 'date' },
    // estado: { required: true, type: 'number' },
    key_servicio: { required: true, type: 'text' },


}

// ********* PAGES **********
import Lista from './Pages/Lista';
import Home from './Pages/Home';
import Registro from './Pages/Registro';
const Pages: SPageListProps = {
    [component]: Lista,
    [`${component}/lista`]: Lista,
    [`${component}/registro`]: Registro,

}

// ********* REDUCER **********
import reducer from './reducer';
const Reducers = {
    [component + "Reducer"]: reducer
}


// ********* EXPORTS **********
export default {
    component: component,
    table_props: table_props,
    Pages,
    Actions,
    Reducers
};