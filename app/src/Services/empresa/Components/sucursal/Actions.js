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

    static getAll = (key_empresa, props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.data;
        if(key_empresa!= reducer.key_empresa){
            data = null;
        }
        reducer.key_empresa = key_empresa;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                component: Parent.component,
                version: Parent.version,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer?.usuarioLog?.key,
                key_empresa: key_empresa
            })
            return null;
        }
        return data;
    }

    static getByKey = (key, key_empresa, props) => {
        var data = Actions.getAll(key_empresa, props);
        if (!data) return null;
        return data[key];
    }

    static registro = (data, key_empresa, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer?.usuarioLog?.key,
            data: data,
            key_empresa: key_empresa
        })
    }
    static editar = (data, key_empresa, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer?.usuarioLog?.key,
            data: data,
            key_empresa: key_empresa
        })
    }
    static eliminar = (data, key_empresa, props) => {
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
            key_empresa: key_empresa
        })
    }
}