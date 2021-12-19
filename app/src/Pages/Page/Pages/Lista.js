import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SLoad, SNavigation, SPage, STable2, SText, SView, SIcon, SImage, SPopup } from 'servisofts-component';
import FloatButtom from '../../../Components/FloatButtom';
import Parent from '../index';
import SSocket from 'servisofts-socket';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_servicio = SNavigation.getParam('key_servicio');
    }

    buildProps = () => {
        return Object.keys(Parent.table_props).map(key => {
            return {
                key: key,
                label: Parent.table_props[key].label || key,
                width: Parent.table_props[key].width || 100,
            }
        })
    }
    getLista() {
        var data = Parent.Actions.getAll(this.key_servicio, this.props);
        if (!data) return <SLoad />

        return <STable2
            // header={[
            //     { key: "index", label: "#", width: 50, },
            //     ...this.buildProps()
            // ]}

            header={[
                { key: "index", label: "#", width: 50, },
                {
                    key: "key-foto", label: "Foto", width: 70, center: true, component: (key) => {
                        return <SView width={50} height={50} onPress={() => {
                        }}>
                            <SImage src={SSocket.api.root + "page/" + key} />
                        </SView>
                    }
                },
                { key: "descripcion", label: "descripcion", width: 150, },
                { key: "url", label: "url", width: 200, },
                // { key: "key_servicio", label: "key_servicio", width: 150, },


                {
                    key: "key-eliminar", label: "Eliminar", width: 70, center: true, component: (key) => {
                        return <SView width={35} height={35} onPress={() => {
                            SPopup.confirm({
                                title: "Eliminar",
                                message: "¿Esta seguro de eliminar?",
                                onPress: () => {
                                    Parent.Actions.eliminar(data[key], this.key_servicio, this.props)
                                }
                            })
                        }}>
                            <SIcon name={'Delete'} />
                        </SView>
                    }
                },
                {
                    key: "key-editar", label: "Editar", width: 70, center: true, component: (key) => {
                        return <SView width={35} height={35} onPress={() => {
                            SNavigation.navigate(Parent.component + "/registro", { key: key, key_servicio: this.key_servicio })
                        }}>
                            <SIcon name={'Edit'} />
                        </SView>
                    }
                },

                {
                    key: "key-permisos", label: "Permisos", width: 70, center: true, component: (key_page) => {
                        return <SView width={35} height={35} onPress={() => {
                            SNavigation.navigate("permiso", { key_servicio: this.key_servicio, key_page: key_page })
                        }}>
                            <SIcon name={'Ajustes'} />
                        </SView>
                    }
                },



            ]}

            filter={(data) => {
                if (data.estado != 1) return false;
                return true;
            }}
            data={data}
            limit={50}
        />
    }
    render() {
        return (
            <SPage title={'Lista'} disableScroll>
                {this.getLista()}
                <FloatButtom onPress={() => {
                    SNavigation.navigate(Parent.component + "/registro", { key_servicio: this.key_servicio })
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);