import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView } from 'servisofts-component';
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var obj = this.props.item;
        return (
            <>
                <SHr />
                <SView card col={"xs-12"} height={50} center onPress={this.props.onPress}>
                    <SView col={"xs-12"} row>
                        <SView width={8} height />
                        <SText>{obj?.codigo}</SText>
                        <SView width={8} height />
                        <SText>{obj?.descripcion}</SText>
                    </SView>
                </SView>
                <SHr />
            </>
        );
    }
}
export default Item;