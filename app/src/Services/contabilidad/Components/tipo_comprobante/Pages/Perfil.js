import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView, SImage, SOrdenador } from 'servisofts-component';
import FloatButtom from '../../../../../Components/FloatButtom';
import Parent from '../index'
import SSocket from 'servisofts-socket'
import Item from './Item';
class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_empresa = SNavigation.getParam("key_empresa");
    }


    getPerfil() {
        var data = Parent.Actions.getByKey(this.key, this.key_empresa, this.props);
        if (!data) return <SLoad />
        return <Item item={data} />
    }
    getContent() {
        var data = Parent.Actions.getAll(this.key_empresa, this.props);
        if (!data) return <SLoad />;
        return new SOrdenador([{ key: "codigo", order: "asc" }]).ordernarObject(data).map((key) => {
            var obj = data[key];
            if (obj.key_cuenta_contable != this.key) return null;
            return <Item item={data[key]} onPress={() => {
                SNavigation.navigate(Parent.component + "/perfil", { key: key, key_empresa: this.key_empresa })
            }} />
        })
    }
    render() {
        this.key = SNavigation.getParam("key");
        var data = Parent.Actions.getByKey(this.key, this.key_empresa, this.props);
        if (!data) return <SLoad />
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll center hidden>
                <SView height={40} backgroundColor='#000' col={"xs-12"}>
                    <SView width={36} center height onPress={() => {
                        if (data.key_cuenta_contable) {
                            SNavigation.navigate(Parent.component + "/perfil", { key: data.key_cuenta_contable, key_empresa: this.key_empresa })
                        } else {
                            SNavigation.goBack();
                        }

                    }}>
                        <SIcon name='Arrow' fill='#fff' width={25} />
                    </SView>
                </SView>
                {this.getPerfil()}
                <SView col={"xs-11 sm-9 md-7 lg-5 xl-4"} flex>
                    {this.getContent()}
                </SView>
                <FloatButtom onPress={() => {
                    SNavigation.navigate(Parent.component + "/registro", { key_cuenta_contable: this.key, key_empresa: this.key_empresa })
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Perfil);