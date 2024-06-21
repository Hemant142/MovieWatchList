import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {reducer as movieReducer} from "../Redux/movieReducer/reducer"
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
    movieReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))