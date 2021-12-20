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
        this.key_empresa = SNavigation.getParam("key_empresa");
    }

    getContent() {
        var data = Parent.Actions.getAll(this.key_empresa, this.props);
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
                { key: "descripcion", label: "descripcion", width: 150 },
                { key: "observacion", label: "Observacion", width: 150 },
                // { key: "codigo_impuestos", label: "C. Impuestos", width: 150 },
                { key: "direccion", label: "Direccion", width: 150 },
                { key: "key-editar", label: "Editar", width: 100, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate(Parent.component + "/registro", { key: item }) }}> <SIcon name={"Edit"} width={35} /></SView> } },
                { key: "key-eliminar", label: "Eliminar", width: 100, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Parent.Actions.eliminar(data[key], this.key_empresa, this.props) } }) }}> <SIcon name={'Delete'} /> </SView> } },
                { key: "key-pv", label: "Punto de venta", width: 100, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SNavigation.navigate("punto_venta", { key_sucursal: key, key_empresa: this.key_empresa }) }}> <SIcon name={'Caja'} /> </SView> } },
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
                    SNavigation.navigate(Parent.component + "/registro", { key_empresa: this.key_empresa })
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);