import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView, SImage, SOrdenador, SInput } from 'servisofts-component';
import FloatButtom from '../../../../../Components/FloatButtom';
import Parent from '../index'
import SSocket from 'servisofts-socket'
import Item from './Item';
import XLSX from 'xlsx';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_empresa = SNavigation.getParam("key_empresa");
    }

    getContent() {
        var data = Parent.Actions.getAll(this.key_empresa, this.props);
        if (!data) return <SLoad />;
        return new SOrdenador([{ key: "codigo", order: "asc" }]).ordernarObject(data).map((key) => {
            var obj = data[key];
            if(obj.key_cuenta_contable) return null;
            return <Item item={data[key]} onPress={() => {
                SNavigation.navigate(Parent.component + "/perfil", { key: key, key_empresa: this.key_empresa })
            }} />
        })
    }

    getFile(event){
        console.log(event);

        var reader = new FileReader();
        reader.readAsArrayBuffer(event[0].file);
        reader.onload = function(event) {
            var data = new Uint8Array(reader.result);
            var work_book = XLSX.read(data, {type: 'array'});
            var sheet_name = work_book.SheetNames;
            var json = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {
                header: 1
            });
    
            let jsonArray = [];
            for (let i=1; i < json.length; i++) {
                let json_={};
                for (let j=0; j < json[0].length; j++) {
                    json_[json[0][j]] = json[i][j];
                }
                jsonArray.push(json_);
            }
            state["excel"] = jsonArray;
            console.log(state["excel"]);
        };
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll center>
                <SView >
                    <SInput type={"file"}  label={"hola"} customStyle={"calistenia"} onChangeText={(event)=>{
                        this.getFile(event);
                    }}/>
                </SView>
                <SView col={"xs-11 sm-9 md-7 lg-5 xl-4"} flex>
                    {this.getContent()}
                </SView>
                    
                <FloatButtom onPress={() => {
                    SNavigation.navigate(Parent.component + "/registro", { key_empresa: this.key_empresa })
                }} />
                    
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);