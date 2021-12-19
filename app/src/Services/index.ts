
import empresa from './empresa';
import Usuario from './Usuario';
import Roles_permisos from './Roles_permisos';
const Pages = {
    ...Usuario.Pages,
    ...Roles_permisos.Pages,
    ...empresa.Pages,
}

const Reducers = {
    ...Usuario.Reducers,
    ...Roles_permisos.Reducers,
    ...empresa.Reducers,
}

export default {
    Pages,
    Reducers
}