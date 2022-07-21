import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView, SImage } from 'servisofts-component';
import FloatButtom from '../../../../../Components/FloatButtom';
import Parent from '../index'
import SSocket from 'servisofts-socket'
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getContent() {
        var data = Parent.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        return <STable2
            header={[
                { key: "index", label: "#", width: 50 },
                {
                    key: "key-foto", label: "Foto", width: 70, center: true, component: (key) => {
                        return <SView width={40} height={40} onPress={() => {
                        }}>
                            <SImage src={SSocket.api.root + Parent.component + "/" + key} />
                        </SView>
                    }
                },
                { key: "nit", label: "Nit", width: 150 },
                { key: "razon_social", label: "Razon social", width: 150 },
                { key: "key_servicio", label: "key_servicio", width: 150 },
                { key: "key-editar", label: "Editar", width: 100, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate(Parent.component + "/registro", { key: item }) }}> <SIcon name={"Edit"} width={35} /></SView> } },
                { key: "key-eliminar", label: "Eliminar", width: 100, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Parent.Actions.eliminar(data[key], this.key_servicio, this.props) } }) }}> <SIcon name={'Delete'} /> </SView> } },
                { key: "key-sucursal", label: "Sucursal", width: 100, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SNavigation.navigate("sucursal", { key_empresa: key }) }}> <SIcon name={'Ajustes'} /> </SView> } },
                // { key: "key-moneda", label: "Moneda", width: 100, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SNavigation.navigate("moneda", { key_empresa: key }) }}> <SIcon name={'Money'} /> </SView> } },
                // { key: "key-tipo_comprobante", label: "Tipo Comprobantes", width: 100, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SNavigation.navigate("tipo_comprobante", { key_empresa: key }) }}> <SIcon name={'Ajustes'} /> </SView> } },
                // { key: "key-gestion", label: "Gestion", width: 100, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SNavigation.navigate("gestion", { key_empresa: key }) }}> <SIcon name={'Caja'} /> </SView> } },
                // { key: "key-comprobante", label: "Comrpobante", width: 100, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SNavigation.navigate("comprobante/registro", { key_empresa: key }) }}> <SIcon name={'Card'} /> </SView> } },

            ]}
            filter={(data) => {
                if (data.estado != 1) return false;
                return true;
            }}
            data={data}
        />
    }
    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll center>
                {this.getContent()}
                <FloatButtom onPress={() => {
                    SNavigation.navigate(Parent.component + "/registro", { key_servicio: this.key_servicio })
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);