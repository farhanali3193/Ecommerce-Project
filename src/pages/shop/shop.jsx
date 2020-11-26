import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = ({ match, fetchCollectionsStart}) => {
    useEffect(()=>{
        fetchCollectionsStart()
    },[fetchCollectionsStart])
    // state = {                  //Same as writing a constructor with a call to super()
    //     loading: true,
    // }
    // unsubscribeFromSnapshot = null;

    // componentDidMount(){
        // const { updateCollections } = this.props;
        // const collectionRef = firestore.collection('collections'); //collectionRef.get() or .onSnapShot() will return a collection SnapShot obj.  
        
        //The below code uses the Observer-Observable pattern, where the observer subscribes to the observable (stream of events). The observer is an obj having 3 methods: next(), error(), complete()
        
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot( async snapshot => {  //This async fn is the next fn in an observer.  //By using .doc on the collection snapshot obj, we can get an array of doc snapshot objs.
        //     // console.log('Collection SNAPSHOT:',snapshot.docs[0].data())  //And the actual data is inside the doc snapshot obj, which can be accessed by using .data() method.
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log('collectionsMap:',collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // })

        //We can use Promises as well, but it would mean that we are only calling it once our component gets mounted. No live updates as we saw in the Observer pattern using onSnapShot.
        //So we will only get new data once our shop page component gets re mounted.

        // collectionRef.get().then(async snapshot => { 
        //     // console.log('Collection SNAPSHOT:',snapshot.docs[0].data())  
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log('collectionsMap:',collectionsMap);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // })

        //We can also use fetch as Firestore allows us to make REST API calls
        // fetch('https://firestore.googleapis.com/v1/projects/e-store-9c4e7/databases/(default)/documents/collections')
        // .then(resp => resp.json())
        // .then(collections => console.log(collections));
        // const { fetchCollectionsStart } = this.props;
    //     fetchCollectionsStart()
    // }


        // const { match, } = this.props;
        // const { loading } = this.state;
        return (
            <div className='shop-page'> 
                <Route exact path={`${match.path}`} component={ CollectionsOverviewContainer } />
                <Route path = {`${match.path}/:collectionId`} component = {CollectionPageContainer} />
            </div>
        )
    
}

const mapDispatchToProps = (dispatch) => ({
    // updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);