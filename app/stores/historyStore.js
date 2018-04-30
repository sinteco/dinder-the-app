import MobxFirebaseStore, {primitiveKey} from 'mobx-firebase-store';
import {action} from 'mobx'
import firebase from 'firebase';

 const base = 'history';

 export default class HistoryStore extends MobxFirebaseStore {
   
   constructor()
   {
      super(firebase.database().ref());
      firebase.auth().onAuthStateChanged((user) => {
        this.user = user;
      })
   }

   // Accessors
   getAll()
   {
     return this.getData(base);
   }
    subs()  {
      return [{
        subKey: 'history',
        asList: true,
        forEachChild: {
          childSubs: (childKey, childVal) => {
            return [{
              subKey: 'post_'+childKey,
              asValue: true,
              path: 'posts/'+childKey
            }]
          }
        },
        path: 'history/' + this.user.uid
      }]
 
   } 

   @action
   add(key, liked)
   {
     let uid = this.user.uid;
     console.log('uid: ', uid);
     let updates = {}
     updates[key] = liked;
     this.fb.child(base).child(uid).update(updates);
   }

 }

