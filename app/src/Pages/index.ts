import { SPageListProps } from 'servisofts-component'

import Services from '../Services';

import InicioPage from "./InicioPage";
import CargaPage from './CargaPage/index';
import AjustesPage from './AjustesPage';
import Servicios from './Servicios';
import Page from './Page';

const Pages: SPageListProps = {
    "inicio": InicioPage,
    "carga": CargaPage,
    AjustesPage,
    ...Services.Pages,
    ...Servicios.Pages,
    ...Page.Pages,

}


export const Reducers = {
    ...Services.Reducers,
    ...Servicios.Reducers,
    ...Page.Reducers,
}
export default Pages;