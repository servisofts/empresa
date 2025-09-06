import { SPageListProps } from 'servisofts-component'

const ServiceName = "roles_permisos";

import rol from './Components/rol';
import usuarioPage from './Components/usuarioPage';

const Pages: SPageListProps = {
    ...usuarioPage.Pages,
    ...rol.Pages
}

const Reducers = {
    ...usuarioPage.Reducers,
    ...rol.Reducers
}

export default {
    ServiceName,
    Pages,
    Reducers,
};