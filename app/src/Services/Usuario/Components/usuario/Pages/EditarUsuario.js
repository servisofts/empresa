import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad } from 'servisofts-component';
import { SButtom, SDate, SForm, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Usuario from '..';
import BackgroundImage from '../../../../../Components/BackgroundImage';

class EditarUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getForm() {

        return <SForm
            ref={(ref) => { this.form = ref; }}
            row
            style={{
                justifyContent: "space-between",
            }}
            inputProps={{
                col: "xs-12",
                customStyle: "kolping",

            }}
            inputs={{
                Nombres: { label: "Nombres", isRequired: true, defaultValue: this.usr.Nombres, },
                Apellidos: { label: "Apellidos", isRequired: true, defaultValue: this.usr.Apellidos, },
                Correo: { label: "Correo", type: "email", isRequired: true, defaultValue: this.usr.Correo, },
                Password: { label: "Password", type: "password", isRequired: true, defaultValue: this.usr.Password, },
                RepPassword: { label: "Repetir password", type: "password", isRequired: true, defaultValue: this.usr.Password, },

            }}
            onSubmit={(values) => {
                if (this.key) {
                    Usuario.Actions.editar({
                        ...this.usr,
                        ...values
                    }, this.props);
                } else {
                    Usuario.Actions.registro(values, this.key_rol, this.props);
                }
            }}
        />
    }

    render() {
        var usuario = Usuario.Actions.validateSession(this.props);
        this.usr = usuario;
        return (
            <SPage title={"Registro"}>
                <SView center>
                    <SView col={"xs-11 md-6 xl-4"} center>
                        <SView height={8} />
                        <SText fontSize={20} bold>{"Edite su usuario"}</SText>
                        <SView height={8} />
                        {/* <KFotoPerfil data={usuario} component={"usuario"} /> */}
                        <SText color={"#DE5738"} fontSize={18} font={"LondonBetween"}>MIS DATOS</SText>

                        {/* {this.getForm()} */}
                        <SView height={16} />
                        {/* <SView col={"xs-11"} row center>
                            <Kolping.KButtom primary props={{
                                type: "outline"
                            }}
                                onPress={() => {
                                    this.form.submit();
                                }}
                            >{"CONFIRMAR"}</Kolping.KButtom>
                        </SView> */}
                        <SView height={36} />
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EditarUsuario);