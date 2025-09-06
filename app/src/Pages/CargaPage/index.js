import React, { Component } from 'react';
import { SPage, SText, SThread, SView, SNavigation, STheme, SIcon } from 'servisofts-component';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

class CargaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }
    render() {
        new SThread(2500, "cargaHilo", true).start(() => {
                SNavigation.replace("inicio");
        });
        return (

            <SPage
                hidden
                title="CargaPage"
            >
                {/* <Splash /> */}
                <SView center flex>
                    <SView
                        col={"xs-11 sm-10 md-9 lg-8 xl-6"} center>
                        {/* <LogoAnimado /> */}
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CargaPage);