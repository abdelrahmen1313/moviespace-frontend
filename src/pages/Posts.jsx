import { useState } from 'react'
import { connect } from 'react-redux'
import { add_post } from '../redux/actions/posts'

const mapStateToProps = state => {
    return {
        posts: state.PostsReducer.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addArticle: post => dispatch(add_post(post))
    }
}


const CreatePost = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addArticle({ id: Math.random(), title, content })
    }

    return (
        <form onSubmit={handleSubmit} className='p-8'>
            <div >

                <label htmlFor="Title">Title</label>
                <input type="text" name="title" id="title" onChange={e => setTitle(e.target.value)} className='input-lg' />
            </div>
            <div>
                <label htmlFor="Content">Content:</label>
                <textarea name="content" id="content" cols="30" rows="10" onChange={e => setContent(e.target.value)} className='input-lg' />
            </div>
            <div>
                <button type="submit" value="Add" className='btn-primary'>Add</button>
            </div>

        </form>

    )
}

const PostsList = (props) => {
    if (props.posts?.length === 0 || props.posts === undefined) return <div>No Posts Yet</div>
    return (
        <div className='p-8'>

            {props.posts.map(p => (
                <div key={p.id} id={p.id}>
                    <h1>{p.title}</h1>
                    <p>{p.content}</p>

                </div>
            ))}

        </div>
    )
}

const ConnectedPostsList = connect(mapStateToProps)(PostsList);
const ConnectedPostCreator = connect(null, mapDispatchToProps)(CreatePost);


const Posts = () => {
    return (
        <div>
            <ConnectedPostCreator />
            <ConnectedPostsList />
        </div>
    )
}

export default Posts