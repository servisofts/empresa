import React, { Component } from 'react';
import View from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SImage, SLoad, SNavigation, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../Components/BarraSuperior';
import BotonesPaginas from '../../Components/BotonesPaginas';
import NavBar from '../../Components/NavBar';
// import { SSRolesPermisosGetPages, SSRolesPermisosValidate } from '../../SSRolesPermisos';

// import Usuario from '../Usuario';
// import UsuarioSession from '../Usuario';
class InicioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getPaginas() {
        var pages =[]
        if (!pages) {
            return <SLoad />
        }
        return Object.keys(pages).map((key) => {
            var obj = pages[key];
            // console.log(obj)
            if (!obj.is_page) {
                return null;
            }
            // if (!SSRolesPermisosValidate({ page: obj.url, permiso: "ver" })) {
            //     return null;
            // }
            var urlImage = SSocket.api.rp + "page/" + obj.key;
            return <SView col={"xs-3 sm-2.5 md-2 lg-1.5 xl-1.3"} colSquare style={{
                padding: 4,
            }}>
                <SView flex onPress={() => {
                    SNavigation.navigate(obj.url)
                }}>
                    <SView center>
                        <SView col={"xs-7"} colSquare>
                            <SImage src={urlImage} style={{
                                width: "100%",
                                height: "100%",
                            }} />
                        </SView>
                    </SView>
                    <SHr />
                    <SView center>
                        <SText center fontSize={12}>{obj.descripcion}</SText>
                    </SView>
                </SView>
            </SView>

        });
    }
    

    render() {
        // if (!Usuario.Actions.getUsuarioLogueado(this.props)) {
        //     SNavigation.replace("carga");
        //     return null;
        // }
        var source = require("./Images/catalogo.png");
        var camisa = require("./Images/camisa.jpg");
        return (
            <SPage
                title="Inicio"
            >
                <SView col={"xs-12"} row center >
                        {/* {this.getPaginas()} */}
                </SView>

                <BotonesPaginas data={[
                    { label: "Servicios", url: "servicios", icon: "Servisofts" },
                ]} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(InicioPage);