import { SNavigation, SStorage } from "servisofts-component";
import SSocket from "servisofts-socket";

export default class Actions {
    static getAll(props) {
        var reducer = props.state.servicioReducer;
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return null;

            SSocket.sendHttp(SSocket.api.servicio+"api", {
                component: "servicio",
                type: "getAllHabilitados",
                estado: "cargando",
                key_servicio: "2b32d417-97ea-4038-9622-5c1ba2f35790",
            })
            return null;
        }
        return data;
    }
    static getByKey(key, props) {
        var data = this.getAll(props);
        if (!data) return null;
        return data[key];
    }

}