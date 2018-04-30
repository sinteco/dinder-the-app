import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  Icon,
  View,
  Button,
  Title
} from 'native-base'
import MatchList from '../components/matchList'

export default class MatchScene extends Component {
  constructor(props) {
    super(props)
  }
  
  postScene() {
    this.props.navigator.push({
      title: 'Post',
      passProps: this.props
    })
  }
  render() {
    return (
      <Container theme={this.props.theme}>
        <Header>
          <Button transparent
            onPress={this.props.toggleDrawer}>
            <Icon name='menu'/>
          </Button>
          <Title>
            Matches
          </Title>
          <Button transparent
            onPress={this.postScene.bind(this)}>
            <Icon name='camera' color='white' size={28}/>
          </Button>
        </Header>
        <View>
          <MatchList stores={this.props.stores}/>
        </View>
      </Container>
    )
  }
}