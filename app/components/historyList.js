import React, {Component} from 'react';
import MobxFirebaseStore from 'mobx-firebase-store';
import {observer} from 'mobx-react/native';
import {autoSubscriber} from 'firebase-nest';
import Firebase from 'firebase';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ListView
} from 'react-native';
import { 
  Button,
  List,
  ListItem,
  Icon,
  Spinner,
  Thumbnail
} from 'native-base'

class HistoryList extends Component {
   static getSubs(props, state) {
        return props.stores.history.subs();
    }
    subscribeSubs(subs, props, state) {
        const store = props.stores.history;
        const {unsubscribe, promise} = store.subscribeSubsWithPromise(subs); 
        this.setState({fetching: true, fetchError: null}, () => {
            promise.then(
                () => this.setState({fetching: false}),
                (error) => this.setState({fetching: false, fetchError: error})
            );
        });
        return unsubscribe;
    }

    constructor (props) {
       super(props);
        this.state = {
            fetching: false,
            fetchError: null
        }
    }

    renderRow(postKey)
    {
      const { history } = this.props.stores;
      const postObj = postKey ? history.getData('post_'+ postKey[0]) : postKey;
      const ents = postObj ? postObj.entries() :postObj

      if (postObj)
      {
        let pic = {uri: postObj.get('url')}
        let text = postObj.get('text')
        let icon = postKey[1] ? 'thumb-up' : 'thumb-down'
        let color = postKey[1] ? 'green' : 'red'

        return (
           <ListItem>
            { pic.uri != undefined ? <Thumbnail source={pic}/> : null }
            <Text> {text} </Text>
            <Icon name={icon} style={{color:color}}/>
          </ListItem>
        )
      }
      else
      {
        return (
          <ListItem>
            <Spinner/>
            <Text> Loading... </Text>
          </ListItem>
        )
      }
    }
    renderList() {
  
      const { history } = this.props.stores;
      const { fetching, fetchError } = this.state;
      const historyList = history.getData('history');
      const list = historyList ? historyList.entries() : []

      return (
        <List
          dataArray={list}
          renderRow={this.renderRow.bind(this)}
          >
        </List>
      )
    }

    render()
    { 
      return (
        <View>
          {this.state.fetching ? <Spinner/> : null}
          {this.renderList()}
        </View>
      )
    }
}

export default autoSubscriber(observer(HistoryList));