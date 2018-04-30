import React, { Component } from 'react'
import { Image } from 'react-native'
import { View } from 'native-base'

export default class SplashScene extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { stores } = this.props
    setTimeout(() => {
      this.props.navigator.replace({title: "Login", passProps: this.props})
    }, stores.settings.SplashTime)
  }

  render() {
    const { settings } = this.props.stores
    return (
      <View style={{flex:1}}>
        <Image style={{flex:1, width:null, height:null}} source={settings.SplashImg}/>
      </View>
    )
  }
}