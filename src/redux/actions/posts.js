import { ADD_ARTICLE, GET_ARTICLES } from "../actionTypes/actionTypes";

export const add_post = (newPost) => ({
  type: ADD_ARTICLE,
  payload : newPost
});

export const get_posts = () => ({
    type: GET_ARTICLES,
    payload: [
        {
            id: 1,
            title: 'my first post',
            content: 'my first content'
        },
        {
            id: 2,
            title: 'my second post',
            content: 'my second content'
        },
        {
            id: 3,
            title: 'my third post',
            content: 'my third content'
        }
    ]

})