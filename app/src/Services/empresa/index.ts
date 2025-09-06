import { SPageListProps } from 'servisofts-component'

const ServiceName = "empresa";


import empresa from './Components/empresa';
import sucursal from './Components/sucursal';
import punto_venta from './Components/punto_venta';
const Pages: SPageListProps = {
    ...empresa.Pages,
    ...sucursal.Pages,
    ...punto_venta.Pages,
}

const Reducers = {
    ...empresa.Reducers,
    ...sucursal.Reducers,
    ...punto_venta.Reducers,
}

export default {
    ServiceName,
    Pages,
    Reducers,
};