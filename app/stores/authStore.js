import { observable, action } from 'mobx'
import firebase from 'firebase'

export default class AuthStore {
  @observable authUser = null
  
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      this.authUser = user;
    })
  }

  @action
  signIn({email, password}) {
    if(this.authUser) {
      return Promise.resolve(this.authUser)
    }
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
  @action
  signUp({email, password}) {
    if(this.authUser) {
      let p = new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              resolve()
            },(err) => {
              reject(err)
            })
        }, (err) => {
          reject(err)
        })
      })
      return p
    }
    else {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    }
  }
  @action
  forgotPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email)
  }
}