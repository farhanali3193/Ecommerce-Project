//USING THUNK
// import { applyMiddleware, createStore } from 'redux';
// import { persistStore } from 'redux-persist';
// import { logger } from 'redux-logger';
// import thunk from 'redux-thunk';

// import rootReducer from './root-reducer';

// const middlewares = [thunk];
    
// if(process.env.NODE_ENV === 'development'){
//     middlewares.push(logger);
// }

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// export const persistor = persistStore(store);
//------------------------------------------------------------------------------------------------

//USING SAGA
import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer';

import { fetchCollectionsStart } from './shop/shop.sagas';

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];
    
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(fetchCollectionsStart);

export const persistor = persistStore(store);
