import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'
const config = {
      apiKey: "AIzaSyDNGFFB9rfXCdnDsLe5WYCwVtsWcTzfhBo",
      authDomain: "awesomeproject-2e7b3.firebaseapp.com",
      databaseURL: "https://awesomeproject-2e7b3.firebaseio.com",
      storageBucket: "awesomeproject-2e7b3.appspot.com",
      messagingSenderId: "251261654880"
  }
export default class SettingsStore extends MobxFirebaseStore {
  constructor() {
    firebase.initializeApp(config)
    super(firebase.database().ref())

    this.splashTime = 1000
    this.splashImg = require('../../images/splash.jpg')
    this.loginBG = require('../../images/login.jpg')
  }
  get LoginBG() {
    return this.loginBG
  }
  get SplashTime() {
    return this.splashTime
  }
  get SplashImg() {
    return this.splashImg
  }
}