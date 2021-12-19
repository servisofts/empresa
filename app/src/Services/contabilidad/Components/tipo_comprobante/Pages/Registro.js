import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad, SView, SIcon } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_empresa = SNavigation.getParam("key_empresa");
        this.key_cuenta_contable = SNavigation.getParam("key_cuenta_contable");
        this.key = SNavigation.getParam("key");
    }
    getContent() {
        this.data = {};
        if (this.key) {
            this.data = Parent.Actions.getByKey(this.key, this.key_empresa, this.props);
            if (!this.data) return <SLoad />
        }
        var defaultCode = "";
        if (this.key_cuenta_contable) {
            this.data_padre = Parent.Actions.getByKey(this.key_cuenta_contable, this.key_empresa, this.props);
            if (!this.data_padre) return <SLoad />
            defaultCode = this.data_padre.codigo + "-";
        }
        return <SForm
            ref={(form) => { this.form = form; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                descripcion: { label: "descripcion", defaultValue: this.data["descripcion"], type: "text", required: true },
                acronimo: { label: "acronimo", isRequired: true, defaultValue: this.data["acronimo"] },
                color: { label: "color", isRequired: true, defaultValue: this.data["color"] },
                // is_base: {
                //     label: "Es moneda base?",
                //     type: "select",
                //     defaultValue: this.data["id_base"] ? this.data["id_base"] : "0",
                //     options: [
                //         { key: "0", content: "No" },
                //         { key: "1", content: "Si" },
                //     ]
                // },
            }}
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.data,
                        ...values
                    }, this.key_empresa, this.props);
                } else {
                    values.key_empresa = this.key_empresa;
                    Parent.Actions.registro(values, this.key_empresa, this.props);
                }
            }}
        />
    }
    render() {
        if (Parent.Actions.getEstado("registro", this.props) == "exito") {
            Parent.Actions.resetEstado(this.props);
            var lr = Parent.Actions._getReducer(this.props).lastRegister;
            if (lr) {
                this.form.uploadFiles(`${SSocket.api.root}upload/${Parent.component}/${lr.key}`);
            }
            SNavigation.goBack();
        }
        if (Parent.Actions.getEstado("editar", this.props) == "exito") {
            Parent.Actions.resetEstado(this.props);
            this.form.uploadFiles(`${SSocket.api.root}upload/${Parent.component}/${this.key}`);
            SNavigation.goBack();
        }
        return (
            <SPage title={'Registro de ' + Parent.component} center>
                <SView height={30}></SView>
                {this.getContent()}
                <SHr />
                <SButtom
                    style={{ color: '#fff' }}
                    props={{
                        type: "outline"
                    }}
                    onPress={() => { this.form.submit() }}
                >{(this.key ? "Editar" : "Registrar")}</SButtom>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);