import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SImage, SNavigation, SPage, SView, SButtom } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import * as SImageImput from '../../../../Components/SImageImput';
import CerrarSession from './CerrarSession';

// import AppParams from '../../Params';
// import FilePreview from '../CarpetasPage/FilePreview';
// import * as SImageImput from '.././../Component/SImageImput';
// import moment from 'moment';
// import SImage from '../../Component/SImage';
// import CerrarSession from './CerrarSession';


class Perfil extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        // this.props.dispatch({
        //     component: "image",
        //     type: "cambio",
        //     url: AppParams.urlImages + "usuario_" + usuario.key,
        // })
    }
    getPerfil() {
        var usuario = this.props.state.usuarioReducer.usuarioLog;
        if (!usuario) {
            SNavigation.navigate('login');
            return <SView />
        }
        return (
            <SView center>
                <SView style={{
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SView style={{
                        width: "90%",
                        height: "90%",
                        backgroundColor: "#66000022",
                        borderRadius: 40,
                        overflow: "hidden",
                    }} onPress={() => {
                        SImageImput.choseFile({
                            servicio: "root",
                            component: "usuario",
                            type: "subirFoto",
                            estado: "cargando",
                            key: usuario.key,
                            key_usuario: usuario.key,
                        }, (resp) => {
                            this.props.dispatch({
                                component: "image",
                                type: "cambio",
                                url: SSocket.api.root + "usuario_" + usuario.key,
                            })
                        });
                    }}>
                        <SImage src={`${SSocket.api.root}${"usuario_" + usuario.key + `?date=${new Date().getTime()}`}`} style={{
                            width: "100%",
                            height: "100%",
                        }} />


                    </SView>
                </SView>
                <SView >
                    <SView center>
                        <Text style={{
                            // flex: 5,
                            fontSize: 20,
                            fontWeight: "bold",
                            // color: "#fff"
                        }}>{usuario["Nombres"] + " " + usuario["Apellidos"]} </Text>
                    </SView>
                    <SView center>
                        <Text style={{
                            fontSize: 14,
                            color: "#bbb"
                        }}>{usuario["Correo"]} </Text>
                        <Text style={{
                            fontSize: 14,
                            color: "#bbb"
                        }}>{usuario["Telefono"]} </Text>
                        {/* <Text style={{
                            width: "90%",
                            fontSize: 10,
                            color: "#bbb"
                        }}>Fecha de registro: {new SDate(usuario.fecha_on).toString("dd/MM/yyyy")} </Text> */}
                    </SView>
                </SView>
            </SView>
        )
    }
    render() {
        var usuario = this.props.state.usuarioReducer.usuarioLog;
        if (!usuario) {
            SNavigation.navigate('login');
            return <SView />
        }
        return (
            <SPage title="Editar Perfil">
                <SView col={"xs-12"} center>
                    <SView height={80}></SView>
                    {this.getPerfil()}
                    <SButtom primary onPress={() =>{
                        SNavigation.navigate("registro", {
                            key: usuario.key,
                          })
                    }}>EDITAR</SButtom>
                    <SView height={10}></SView>
                    <CerrarSession />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Perfil);