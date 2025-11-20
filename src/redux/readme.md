Understanding Redux (basic)

A redux directory could have this folder structure

Redux -> actionsD,actionTypesD,reducersD 
+ store.js file 

# UNDERSTANDING THE ROLE OF EACH DIRECTORY

### Store.js File
This file is the parent wrapper of all the app reducers
it's being used to create a store, combine reducers into a single rootReducer and being consumed from a Redux Context Provider for the application

### ActionTypes
Specify `types` for a redux action
e,g : const INCREMENT = "INCREMENT";
// declared types must be exported for outside usage

### Actions
An action is an entry key to a component reducer
(like counterReducer), in this reducer example
we can declare actual functions a reducer could handle
along with their pre-declared types and a payload if applicable

### REDUCERS
The reducer is the main factory for an app component,
The reducer component, is normally initialized with initial state object, and exporting a function ("thunk") that handle all the necessary methods to execute for a give pre-declared action

** All of these processes are mainly used for state management

# TRIGGERING REDUCERS
Reducers are being triggered from dispatching actions
e,g an add post button will consume the useDispatch() hook by dispatching an add_post action, the action will then perform the method declared inside the parent reducer.


#### UNDERSTANDING mapStateToProps and mapDispatchToProps

# Starting with mapStateToProps
In this example, we have an UpdatePost Component, the component will normally have a title state (mutable state), means, the title is not a static text an it's being treated contextually from the passed post using props.
Since a Reducer is used to handle state, we declare our state variables inside our reducer, then we use the `connect` hook to mapStateToProps from the reducer to the component

```
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        posts: state.PostsReducer.posts
    }
}

const ConnectedPostsList = connect(mapStateToProps)(PostsList);

```

-------------------

# mapDispatchToProps
in this context, a dispatch parameter is being passed to the function,
the function will consume that dispatch, to encapsulate it's return value into a key,value pair 
e,g : `const mapDispatchToProps = dispatch => {
    return {
        addArticle: post => dispatch(add_post(post))
    }
}`
in this example the `return` method, will return {addArticle: $resultFromDispatchingAnAction(params)}

In this case, we can use the `addArticle` method inside the visual component
using `props.addArticle(params)`

## INTERSECTING WiTH {connect} method
the connect method is used to inject a custom hook, into a visual component.
