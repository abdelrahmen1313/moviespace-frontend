import { createStore, combineReducers } from "redux"
import counterReducer from "./reducers/counterReducer"
import PostsReducer from "./reducers/PostsReducer";


const rootReducer = combineReducers({
    counterReducer: counterReducer,
    PostsReducer: PostsReducer
});

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export default store;