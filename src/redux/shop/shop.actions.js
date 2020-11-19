import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return (dispatch) => {
        const collectionRef = firestore.collection('collections');

        dispatch(fetchCollectionsStart());
        //The below code is copied from shop page's componentDidMount. We basically moved all the async functionality here, so that the collectionsMap
        //data can be used by other components or pages if needed even if the user never goes to the shop page. Earlier, the user had to go the 
        // shop page to load our shopPage component and thus firing the async functionality of getting data from firebase.
        
        collectionRef.get().then(async snapshot => { 
            // console.log('Collection SNAPSHOT:',snapshot.docs[0].data())  
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // console.log('collectionsMap:',collectionsMap);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))

    }
}