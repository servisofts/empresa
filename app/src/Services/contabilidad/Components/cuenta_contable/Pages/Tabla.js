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
                // { key: "index", label: "#", width: 50 },
                { key: "codigo", label: "Codigo", width: 100, order: "asc" },
                { key: "descripcion", label: "Descripcion", width: 200 },
                // { key: "key-editar", label: "Editar", width: 50, center: true, component: (item) => { return <SView onPress={() => { SNavigation.navigate(Parent.component + "/registro", { key: item }) }}> <SIcon name={"Edit"} width={35} /></SView> } },
                // { key: "key-eliminar", label: "Eliminar", width: 70, center: true, component: (key) => { return <SView width={35} height={35} onPress={() => { SPopup.confirm({ title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => { Parent.Actions.eliminar(data[key], this.key_empresa, this.props) } }) }}> <SIcon name={'Delete'} /> </SView> } },
                {
                    key: "key-add", label: "Select", width: 60, center: true, component: (key) => {
                        return <SView width={35} height={35} onPress={() => {
                            var onSelect = SNavigation.getParam("onSelect");
                            if (onSelect) {
                                onSelect(data[key])
                            }
                            SNavigation.goBack();
                        }}> <SIcon name={'Add'} /> </SView>
                    }
                },
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