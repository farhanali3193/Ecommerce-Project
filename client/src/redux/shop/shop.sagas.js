import { takeLatest, call, all, put } from 'redux-saga/effects'

import { firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess,fetchCollectionsFailure } from './shop.actions'
import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync(){
    // yield console.log('CHECKING')
    try{    
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get()
        // console.log('.get', snapshot.docs[0].data())
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot) //Is similar to writing convertCollectionsSnapshotToMap(snapshot)
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch(error){
        yield put(fetchCollectionsFailure(error.message))
    }
} 

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}