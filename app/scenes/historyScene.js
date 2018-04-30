import React, { Component } from 'react'
import HistoryList from '../components/historyList'
import {
  Container, 
  Header, 
  View, 
  Icon, 
  Button, 
  Title 
} from 'native-base'

export default class HistoryScene extends Component {
  constructor(props)
  {
    super(props);
  }
  
  render () {
    const { theme, stores, toggleDrawer } = this.props
    
    return (
      <Container theme={theme}>
        <Header>  
          <Button transparent
            onPress={toggleDrawer}>
              <Icon name='menu' />
          </Button>
          <Title>History</Title>
        </Header>
        <View>
          <HistoryList stores={stores}/>
        </View>
      </Container>
    )
  }
}