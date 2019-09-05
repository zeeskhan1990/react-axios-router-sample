import React, { Component } from 'react';
import axios from "../../Axios"

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId:  null,
        error: false
    }

    componentDidMount(){
        axios.get('/posts')
        .then((res) => {
            const posts = res.data.slice(0,4)
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            })
            this.setState({posts:updatedPosts})
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            this.setState({error:true})
        })
    }

    postClickHandler = (postId) => {
        this.setState({selectedPostId: postId})
    }

    render () {
        if(this.state.error)
            return (<p>Something went Wrong!</p>)

        const posts = this.state.posts.map((post) => {
            return (<Post key={post.id} title={post.title} author={post.author}
                 clicked={() => this.postClickHandler(post.id)}/>)
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;