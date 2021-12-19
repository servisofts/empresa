import SSocket from 'servisofts-socket';
import Parent from './index';
import Service from '../../index';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }

    static resetEstado = (props) => {
        var reducer = Actions._getReducer(props);
        reducer.estado = "";
    }
    static getEstado = (type, props) => {
        var reducer = Actions._getReducer(props);
        if (!type) return reducer.estado;
        if (type == reducer.type) return reducer.estado;
        return "";
    }

    static getAll = (key_gestion, props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                component: Parent.component,
                version: Parent.version,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer?.usuarioLog?.key,
                key_gestion: key_gestion
            })
            return null;
        }
        return data;
    }

    static getByKey = (key, key_gestion, props) => {
        var data = Actions.getAll(key_gestion, props);
        if (!data) return null;
        return data[key];
    }

    static registro = (data, key_gestion, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer?.usuarioLog?.key,
            data: data,
            key_gestion: key_gestion
        })
    }
    static editar = (data, key_gestion, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer?.usuarioLog?.key,
            data: data,
            key_gestion: key_gestion
        })
    }
    static eliminar = (data, key_gestion, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer?.usuarioLog?.key,
            data: {
                ...data,
                estado: 0,
            },
            key_gestion: key_gestion
        })
    }
}