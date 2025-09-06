import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SLoad, SNavigation, SPage, SText, SView } from 'servisofts-component';
import Parent from '../index';
import SSocket from 'servisofts-socket';
import Upload from '../../../Components/Upload';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam('key');
        this.key_servicio = SNavigation.getParam('key_servicio');

    }

    buildProps = () => {
        var pobj = {};
        Object.keys(Parent.table_props).map(key => {
            pobj[key] = {
                label: Parent.table_props[key].label || key,
                isRequired: Parent.table_props[key].required || false,
                type: Parent.table_props[key].type || 'text',
            }
        })
        return pobj;
    }
    getForm() {
        if (this.key) {
            this.data = Parent.Actions.getByKey(this.key, this.key_servicio, this.props);
            if (!this.data) return <SLoad />;
        } else {
            this.data = {};
        }
        // if(reducer.type == "registro" || red)
        return <SForm
            ref={(ref) => { this.form = ref; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "calistenia"
            }}
            inputs={{
                // ...this.buildProps()
                foto_p: { type: "image", isRequired: false, defaultValue: `${SSocket.api.root}page/${this.key}` },
                descripcion: { isRequired: true, type: 'text', label: "descripcion", defaultValue: this.data["descripcion"] },
                url: { isRequired: true, type: 'text', label: "url", defaultValue: this.data["url"] },
                //key_servicio: { required: true, type: 'text', label: "key_servicio", defaultValue: this.key_servicio },

            }}
            onSubmitName={'Aceptar'}
            onSubmit={(values) => {
                // alert(JSON.stringify(values));
                // values.key_servicio = this.key_servicio;
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.data,
                        ...values
                    }, this.key_servicio, this.props);
                    // SNavigation.goBack();

                } else {
                    Parent.Actions.registro(values, this.key_servicio, this.props);
                    // SNavigation.goBack();
                }
            }}
        />
    }
    render() {
        var reducer = this.props.state[Parent.component + "Reducer"];
        if (reducer.type == "registro" || reducer.type == "editar") {
            if (reducer.estado == "exito") {

                if (!this.key) {
                    this.key = reducer.lastRegister.key;
                }

                //alvaro
                reducer.estado = "";
                var url = `${SSocket.api.root}upload/page/${this.key}`
                //alvarin
                if (this.form) {
                    if (this.form.getFiles()) {
                        var files = this.form.getFiles()["foto_p"];
                        if (files) {
                            if (typeof files != "string") {
                                Upload.send(files, url);
                            }
                        }
                    }
                }
                SNavigation.goBack();
            }
        }
        return (
            <SPage title={'Registro'}>
                <SView col={"xs-12"} center >
                    {this.getForm()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);