import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad, SView, SIcon } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket';
import ComprobanteDetalle from '../Components/ComprobanteDetalle';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_gestion = SNavigation.getParam("key_gestion");
        this.key = SNavigation.getParam("key");
        this.key_empresa = SNavigation.getParam("key_empresa");
    }
    getContent() {
        this.data = {};
        if (this.key) {
            this.data = Parent.Actions.getByKey(this.key, this.key_gestion, this.props);
            if (!this.data) return <SLoad />
        }
        return <SForm
            ref={(form) => { this.form = form; }}
            col={"xs-11 md-9 xl-6"}
            row
            style={{
                justifyContent: "space-between",
            }}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                codigo: { label: "Codigo", isRequired: true, defaultValue: this.data["codigo"], col: "xs-5.8" },
                fecha: { label: "Fecha", isRequired: true, defaultValue: this.data["fecha"], type: "date", col: "xs-5.8" },
                glosa: { label: "glosa", defaultValue: this.data["glosa"], type: "textArea", required: true },
            }}
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.data,
                        ...values
                    }, this.key_gestion, this.props);
                } else {
                    values.key_gestion = this.key_gestion;
                    Parent.Actions.registro(values, this.key_gestion, this.props);
                }
            }}
        />
    }
    render() {
        if (Parent.Actions.getEstado("registro", this.props) == "exito") {
            Parent.Actions.resetEstado(this.props);
            SNavigation.goBack();
        }
        if (Parent.Actions.getEstado("editar", this.props) == "exito") {
            Parent.Actions.resetEstado(this.props);
            SNavigation.goBack();
        }
        return (
            <SPage title={'Registro de ' + Parent.component} center>
                <SView height={30}></SView>
                {this.getContent()}
                <SHr />
                <ComprobanteDetalle key_empresa={this.key_empresa} />
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