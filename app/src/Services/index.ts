
import contabilidad from './contabilidad';
import Usuario from './Usuario';
import Roles_permisos from './Roles_permisos';
const Pages = {
    ...contabilidad.Pages,
    ...Usuario.Pages,
    ...Roles_permisos.Pages,
}

const Reducers = {
    ...contabilidad.Reducers,
    ...Usuario.Reducers,
    ...Roles_permisos.Reducers,
}

export default {
    Pages,
    Reducers
}