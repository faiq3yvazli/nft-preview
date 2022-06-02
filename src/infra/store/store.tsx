import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { ercConnector } from '@root/infra/erc-connector';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware({
  context: { ercConnector },
});

const composeEnhancers = (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
