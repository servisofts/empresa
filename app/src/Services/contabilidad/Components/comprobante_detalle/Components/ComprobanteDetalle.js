import React, { Component } from 'react';
import { SHr, SInput, SNavigation, SPage, SText, STheme, SUuid, SView } from 'servisofts-component';
import ComprobanteDetalleItem from './ComprobanteDetalleItem';

export default class ComprobanteDetalle extends Component {
    constructor(props) {
        super(props);
        var dcd = this.createCD();
        this.state = {
            lista: { [dcd.key]: dcd }
        };
    }
    getData() {
        var lista = {}
        var valid = true;
        Object.keys(this.state.lista).map((itm) => {
            if (this._ref[itm]) {
                var obj = this._ref[itm].getData();
                if (!obj) valid = false;
                lista[itm] = obj;
            }
        })
        if (!valid) return null;
        return lista;
    }
    getCabecera() {
        return <SView col={"xs-12"} row style={{
            justifyContent: "space-between",
        }}>
            <SView col={"xs-5 sm-6"} center>
                <SText>Cuenta</SText>
            </SView>
            <SView col={"xs-3.4 sm-2.8"} center>
                <SText>Debe</SText>
            </SView>
            <SView col={"xs-3.4 sm-2.8"} center>
                <SText>Haber</SText>
            </SView>

        </SView>
    }

    createCD() {
        var defaultKey = SUuid();
        var obj = {
            key: defaultKey,
            key_cuenta_contable: null, debe: 0, haber: 0
        }
        return obj;
    }
    getBtnAdd() {
        return <SView col={"xs-12"} height={40} card center onPress={() => {
            var cd = this.createCD();
            this.setState({ lista: { ...this.state.lista, [cd.key]: cd } });
        }}>
            <SText>Agregar</SText>
        </SView>
    }
    getComprobantesDetalle() {
        this._ref = {};
        return Object.keys(this.state.lista).map((itm) => {
            return <ComprobanteDetalleItem
                ref={(ref) => { this._ref[itm] = ref; }}
                key={itm}
                key_empresa={this.props.key_empresa}
                obj={this.state.lista[itm]}
                onChange={(obj) => {
                    this.state.lista[itm] = obj;
                    this.setState({ lista: { ...this.state.lista } });
                }}
                onDelete={() => {
                    delete this.state.lista[itm];
                    this.setState({ lista: { ...this.state.lista } });
                }} />
        })
    }
    getTotal() {
        var totalD = 0;
        var totalH = 0;
        Object.keys(this.state.lista).map((itm) => {
            totalD += parseFloat(this.state.lista[itm].debe) || 0;
            totalH += parseFloat(this.state.lista[itm].haber) || 0;
            // total += this.state.lista[itm].haber;
        })
        var partidaDoble = (totalD - totalH) == 0 ? true : false;
        return <SView col={"xs-12"} row style={{
            justifyContent: "space-between",
        }}>
            <SView col={"xs-5 sm-6"} center>
                <SText>Total</SText>
            </SView>
            <SView col={"xs-3.4 sm-2.8"} center backgroundColor={partidaDoble ? STheme.color.success + 66 : STheme.color.danger + 66}>
                <SHr />
                <SText fontSize={18}>{totalD}</SText>
                <SHr />
            </SView>
            <SView col={"xs-3.4 sm-2.8"} center backgroundColor={partidaDoble ? STheme.color.success + 66 : STheme.color.danger + 66}>
                <SHr />
                <SText fontSize={18}>{totalH}</SText>
                <SHr />
            </SView>
        </SView>
    }
    render() {
        return (
            <SView col={"xs-11.6 sm-10 md-8"} center>
                <SHr />
                {this.getCabecera()}
                <SHr />
                {this.getComprobantesDetalle()}
                <SHr />
                {this.getTotal()}
                <SHr />
                <SHr />
                {this.getBtnAdd()}

                <SHr height={50} />
            </SView>
        );
    }
}