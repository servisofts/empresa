import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText, SNavigation, SLoad, SView, SHr, STheme, SIcon, SButtom, SImage } from 'servisofts-component';
import Parent from '..';

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
    }
    getPerfil() {
        var data = Parent.Actions.getByKey(this.key, this.props);
        if (!data) return <SLoad />
        // <SText>{data.nombre}</SText>
        return <SView col={"xs-12"} center card>
            <SHr height={32} />
            <SText fontSize={22} font={"Roboto-Light"} >{`servisofts.`}<SText fontSize={32} bold style={{
                textTransform: "uppercase"
            }} font={"Roboto-Bold"}>{`${data.nombre}`}</SText></SText>
            <SHr />

            <SText fontSize={10} color={STheme.color.lightGray} >{`${data.puerto}\t|\t${data.puerto_ws}\t|\t${data.puerto_http}`}</SText>
            <SHr />

            <SText fontSize={10} color={STheme.color.lightGray} >{`${data.ip || ""}`}</SText>
            <SText fontSize={10} color={STheme.color.lightGray} >{`${data.ip_public || ""}`}</SText>

            <SHr />
            <SText fontSize={10} color={STheme.color.lightGray} >{`${data.key}`}</SText>
            <SHr height={32} />
        </SView>
    }
    getIcon({ url, label, page }) {
        return <SView flex center height >
            <SView height={120} colSquare center onPress={() => {
                SNavigation.navigate(page, { key_servicio: this.key });
            }}>
                <SImage src={url} style={{ width: "100%", height: "100%", resizeMode: "cover", opacity: 1, }} />
            </SView>
            <SView height={2} />
            <SText fontSize={12} center >{label}</SText>
        </SView>
    }
    render() {
        return (
            <SPage title={'Perfil'}>
                <SView col={"xs-12"} center>
                    <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center>
                        <SHr height={32} />
                        {this.getPerfil()}
                        <SHr height={32} />

                        <SView col={'xs-12'} row height={100}>
                            {this.getIcon({ url: require("./Images/1.png"), label: "Empresas", page: "empresa" })}
                        </SView>

                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Perfil);