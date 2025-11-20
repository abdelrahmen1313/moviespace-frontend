import { ADD_ARTICLE } from "../actionTypes/actionTypes";


const initialState = {
    posts: [
        {
            id: 1,
            title: 'my first post',
            content: 'my first content'
        }
    ]
}

function PostsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            console.log(action.payload);
            return {
                posts: [...state.posts, action.payload]
            }
        default:
            return state
    }

}


export default PostsReducer;