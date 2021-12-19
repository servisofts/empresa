import React, { Component } from 'react';
import { SHr, SIcon, SInput, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';

export default class ComprobanteDetalleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputStyle: "calistenia",
            monto: null,
        };
    }

    getData() {
        var valid = true;
        var data = {};
        if (!this._ref_cuenta.verify()) {
            valid = false;
        }
        if (!this._ref_monto_d.verify() && this._ref_monto_h.verify()) {
            valid = false;
        }
        if (!this._ref_descripcion.verify()) {
            valid = false;
        }
        if (!valid) return null;
        var obj = {
            ...this.data,
            debe: this.data.debe ? this.data.debe : "0.00",
            haber: this.data.haber ? this.data.haber : "0.00",
        }
        return obj;
    }
    getItem() {
        var obj = {
            key: this.props?.obj?.key,
            key_cuenta_contable: this.state?.cuenta?.key,
            debe: this.state.monto_d,
            haber: this.state.monto_h,
            descripcion: this.state.descripcion
        }
        this.data = obj;
        if (JSON.stringify(obj) != JSON.stringify(this.props.obj)) {
            if (this.props.onChange) {
                this.props.onChange(obj);
            }
        }
        return <SView col={"xs-12"} row style={{
            justifyContent: "space-between",
        }}>
            <SView col={"xs-5 sm-6"} row style={{
                justifyContent: "space-between",
            }}>
                <SView col={"xs-12 "} center>
                    <SInput
                        ref={(ref) => { this._ref_cuenta = ref; }}
                        customStyle={this.state.inputStyle}
                        placeholder={"Cuenta"}
                        editable={false}
                        isRequired={!this.state.cuenta}
                        value={this.state.cuenta ? `${this.state?.cuenta?.codigo}  "${this.state?.cuenta?.descripcion}"` : ''}
                        onPress={() => {
                            SNavigation.navigate("cuenta_contable/tabla", {
                                key_empresa: this.props.key_empresa, onSelect: (obj) => {
                                    this.setState({ cuenta: obj })
                                }
                            })
                        }} />
                </SView>

            </SView>
            <SView col={"xs-3.4 sm-2.8"} center >
                <SInput ref={(ref) => { this._ref_monto_d = ref; }} customStyle={this.state.inputStyle} placeholder={"Debe"} type='money' value={this.state.monto_d} onChangeText={(val) => {
                    this.setState({ monto_d: val, monto_h: "" })
                }} />
            </SView>
            <SView col={"xs-3.4 sm-2.8"} center>
                <SInput ref={(ref) => { this._ref_monto_h = ref; }} customStyle={this.state.inputStyle} placeholder={"Haber"} type='money' value={this.state.monto_h} onChangeText={(val) => {
                    this.setState({ monto_h: val, monto_d: "" })
                }} />
            </SView>
            <SHr />
            <SView col={"xs-10 md-8 "} center>
                <SInput ref={(ref) => { this._ref_descripcion = ref; }} isRequired={true} customStyle={this.state.inputStyle} placeholder={"glosa"} value={this.state.descripcion}
                    onChangeText={(val) => {
                        this.setState({ descripcion: val })
                    }}
                />
            </SView>
            <SView col={"xs-2 md-4 "} center card>
                <SView width={30} height={30} onPress={this.props.onDelete}>
                    <SIcon name='Delete' />
                </SView>
            </SView>
        </SView>
    }

    render() {
        return (
            <SView col={"xs-12"} center>
                <SHr />
                <SHr height={2} color={STheme.color.card} />
                <SHr />
                {this.getItem()}
                <SHr />
                <SHr height={2} color={STheme.color.card} />
                <SHr />
            </SView>
        );
    }
}