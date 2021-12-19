import { SPageListProps } from 'servisofts-component'

const ServiceName = "contabilidad";


import empresa from './Components/empresa';
import cuenta_contable from './Components/cuenta_contable';
import moneda from './Components/moneda';
import tipo_comprobante from './Components/tipo_comprobante';
import tipo_cambio from './Components/tipo_cambio';
import gestion from './Components/gestion';
import comprobante from './Components/comprobante';
const Pages: SPageListProps = {
    ...empresa.Pages,
    ...cuenta_contable.Pages,
    ...moneda.Pages,
    ...tipo_comprobante.Pages,
    ...tipo_cambio.Pages,
    ...gestion.Pages,
    ...comprobante.Pages,
}

const Reducers = {
    ...empresa.Reducers,
    ...cuenta_contable.Reducers,
    ...moneda.Reducers,
    ...tipo_comprobante.Reducers,
    ...tipo_cambio.Reducers,
    ...gestion.Reducers,
    ...comprobante.Reducers,
}

export default {
    ServiceName,
    Pages,
    Reducers,
};