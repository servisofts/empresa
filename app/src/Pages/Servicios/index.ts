import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Lista from './Pages/Lista'
import Perfil from './Pages/Perfil'
const Pages: SPageListProps = {
    "servicios": Lista,
    "servicios/perfil": Perfil
}

import servicioReducer from './Reducer/servicioReducer'
const Reducers = {
    servicioReducer
}


export default {
    name: "servicio",
    Pages,
    Actions,
    Reducers
};