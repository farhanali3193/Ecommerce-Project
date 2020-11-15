import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner'
import CollectionsOverview from '../../components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection';

const CollectionsOvervieWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    state = {                  //Same as writing a constructor with a call to super()
        loading: true,
    }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections'); //collectionRef.get() or .onSnapShot() will return a collection SnapShot obj.  
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot( async snapshot => { //By using .doc on the collection snapshot obj, we can get an array of doc snapshot objs.
            // console.log('Collection SNAPSHOT:',snapshot.docs[0].data())  //And the actual data is inside the doc snapshot obj, which can be accessed by using .data() method.
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // console.log('collectionsMap:',collectionsMap);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        })
    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'> 
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOvervieWithSpinner isLoading={loading} {...props}/>} />
                <Route path = {`${match.path}/:collectionId`} render = {(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);