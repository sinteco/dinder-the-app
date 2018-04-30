import { action } from 'mobx'
import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'

export default class MatchStore extends MobxFirebaseStore {
  constructor() {
    super(firebase.database().ref())
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    })
  }
  resolveFirebaseQuery(sub) {
    return this.user ? this.fb.child(sub.path).orderByChild('viewedBy/'+this.user.uid).equalTo(null).limitToLast(10) : []
  }

  @action
  markViewed(post) {
    let updates = {}
    updates['viewedBy/' + this.user.uid] = true
    this.fb.child('posts').child(post).update(updates)
  }

  subs() {
    return [{
      subKey: 'matches',
      path: 'posts',
      asList: true, // was as last
      user: this.user
    }]
  }
}