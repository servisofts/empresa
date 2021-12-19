import Parent from './index';
import SSocket from "servisofts-socket";


export default class Actions {

    static getByKey = (key, key_servicio, props) => {
        var data = Actions.getAll(key_servicio, props);
        if (!data) return null;
        return data[key];
    }
    static getAll = (key_servicio, props) => {
        var reducer = props.state[Parent.component + "Reducer"];

        if (key_servicio != reducer.key_servicio) {
            reducer.data = null;
        }
        reducer.key_servicio = key_servicio;

        var data = reducer.data;

        if (!data) {
            if (reducer.estado == "cargando") return null;

            SSocket.send({
                component: Parent.component,
                type: "getAll",
                estado: "cargando",
                key_usuario: "admin",
                servicio: {
                    key: key_servicio
                }
            })
            return null;
        }
        return data;
    }
    static registro(data, key_servicio, props) {
        var reducer = props.state[Parent.component + "Reducer"];
        var object = {
            component: Parent.component,
            type: "registro",
            estado: "cargando",
            key_usuario: "admin",
            data: data,
            servicio: {
                key: key_servicio
            },
        }
        SSocket.send(object);
    }

    static editar(data, key_servicio, props) {
        var reducer = props.state[Parent.component + "Reducer"];
        var object = {
            component: Parent.component,
            type: "editar",
            estado: "cargando",
            key_usuario: "admin",
            data: data,
            servicio: {
                key: key_servicio
            },
        }
        SSocket.send(object);
    }
    static eliminar(data, key_servicio, props) {
        var reducer = props.state[Parent.component + "Reducer"];
        var object = {
            component: Parent.component,
            type: "editar",
            estado: "cargando",
            key_usuario: "admin",
            data: { ...data, estado: 0 },
            servicio: {
                key: key_servicio
            },
        }
        SSocket.send(object);
    }
}