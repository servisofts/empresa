import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SPage, SText, SNavigation, SLoad, SView, SIcon, SPopup, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Parent from '../index'
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
    }
    getContent() {
        this.usr = {};
        if (this.key) {
            this.usr = Parent.Actions.getByKey(this.key, this.props);
            if (!this.usr) return <SLoad />
        }
        return <SForm
            ref={(form) => { this.form = form; }}
            col={"xs-11 sm-9 md-7 lg-5 xl-4"}
            inputProps={{
                customStyle: "kolping",
            }}
            inputs={{
                foto_p: { type: "image", isRequired: false, defaultValue: `${SSocket.api.root}${Parent.component}/${this.key}` },
                Nombres: { label: "Nombres", isRequired: true, defaultValue: this.usr.Nombres, icon: <SIcon name={"InputUser"} width={40} height={30} /> },
                Apellidos: { label: "Apellidos", isRequired: true, defaultValue: this.usr.Apellidos, icon: <SIcon name={"InputUser"} width={40} height={30} /> },
                Correo: { label: "Correo", isRequired: true, defaultValue: this.usr.Correo, icon: <SIcon name={"InputEmail"} width={40} height={30} /> },
                Password: { label: "Password", isRequired: true, type: "password", defaultValue: this.usr.Password, icon: <SIcon name={"InputPassword"} width={40} height={30} /> },
                RepPassword: { label: "Repetir password", type: "password", isRequired: true, defaultValue: this.usr.Password, icon: <SIcon name={"InputRePassword"} width={40} height={30} /> },
            }}
            onSubmit={(values) => {
                if (this.key) {
                    Parent.Actions.editar({
                        ...this.usr,
                        ...values
                    }, this.props);
                } else {
                    Parent.Actions.registro(values, this.props);
                }
            }}
        />
    }

    alertError(error) {
        return <SView col={"xs-12 md-8 xl-6"} row style={{ height: 250, borderRadius: 8, }} backgroundColor={STheme.color.background}>
            {/* <BackgroundImage /> */}
            <SView style={{
                width: "100%",
                top: 0,
                left: 0,
                position: "absolute",
                ...this.props.style,
            }}>
                <SIcon name={"Enfermera10"} height={500} />
            </SView>
            <SView col={"xs-3"}  ></SView>
            <SView col={"xs-9"} style={{
                // width: "100%",
                // height: "100%",
            }} center>
                <SText secondary style={{ fontSize: 16, }}>El usuario ya existe</SText>
                <SView height={8} />
                {/* <SText secondary style={{ fontSize: 12, }}>{`Nombre: ${error["Nombres"] + " " + error["Apellidos"]}`}</SText> */}
                <SText secondary style={{ fontSize: 12, }}>{`Correo: ${error["Correo"]}`}</SText>
                <SView height={30}></SView>
                {/* <SText style={{ fontSize: 12, }}>{`Fecha nacimiento: ${error["Fecha nacimiento"]}`}</SText> */}
                {/* <SText secondary style={{ fontSize: 12, }}>{`CI: ${error["CI"]}`}</SText>
                <SText secondary style={{ fontSize: 12, }}>{`Telefono: ${error["Telefono"]}`}</SText> */}
            </SView>
        </SView>
    }

    render() {
        var error = Parent.Actions.getError("registro", this.props);
        if (error) {
            SPopup.open({ key: "errorRegistro", content: this.alertError(error) });
        }
        if (this.props.state.usuarioReducer.estado == "exito" && (this.props.state.usuarioReducer.type == "registro" || this.props.state.usuarioReducer.type == "editar")) {
            this.props.state.usuarioReducer.estado = "";
            if (this.form) {
                this.form.submitFiles();
            }
            SNavigation.goBack();
        }
        return (
            <SPage title={'Registro de ' + Parent.component} center>
                <SView height={30}></SView>
                {this.getContent()}
                <SHr height={25} />
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