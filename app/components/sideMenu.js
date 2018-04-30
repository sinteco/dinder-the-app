import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  View
} from 'native-base'

export default class SideMenu extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let list = [{
      title: "Match",
      onPress: () => {
        this.props.navigator.replace({
          title: 'Match',
          passProps: this.props
        })
        this.props.toggleDrawer();
      }
    }, {
      title: "History",
      onPress: () => {
        this.props.navigator.replace({
          title: 'History',
          passProps: this.props
        })  
        this.props.toggleDrawer();
  
      }
    }]
    return (
      <Container theme={this.props.theme}>
        <Header/>
        <Content>
        <View>
          <List dataArray={list} renderRow={(item) => 
            <ListItem button onPress={item.onPress.bind(this)}>
              <Text style={{color: 'black'}}> {item.title} </Text>
            </ListItem>
          }/>
        </View>
        </Content>
      </Container>
    )
  }
}