import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad, SView, SIcon } from 'servisofts-component';
import Parent from '../index'
import SSocket from 'servisofts-socket';
import ComprobanteDetalle from '../../comprobante_detalle/Components/ComprobanteDetalle';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_gestion = SNavigation.getParam("key_gestion");
        this.key = SNavigation.getParam("key");
        this.key_empresa = SNavigation.getParam("key_empresa");

        this.data={
            codigo:"P-a-s-s-",
            fecha:"2019-01-01",
            glosa:"Esta es la glosa de prueba",
            descripcion:"Esta es la descripcion de prueba",
        }
    }
    getContent() {
        // this.data = {};
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
                codigo: { label: "Codigo", isRequired: true, defaultValue: this.data["codigo"], col: "xs-5.8", editable: false },
                fecha: { label: "Fecha", isRequired: true, defaultValue: this.data["fecha"], type: "date", col: "xs-5.8" },
                glosa: { label: "glosa", defaultValue: this.data["glosa"], type: "textArea", isRequired: true, },
                descripcion: { label: "descripcion", defaultValue: this.data["descripcion"], type: "textArea", isRequired: true, },
            }}
            onSubmit={(values) => {
                var detalle = this.refCD.getData();
                if(!detalle) return;
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.data,
                        ...values
                    }, this.key_gestion, this.props);
                } else {
                    values.key_tipo_comprobante = "fd11ba33-ca9d-43fe-9eae-c376bd661f8a";
                    values.key_gestion = this.key_gestion;
                    Parent.Actions.registro(values, detalle, this.key_gestion, this.props);
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
                <ComprobanteDetalle key_empresa={this.key_empresa} ref={(ref) => this.refCD = ref} />
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