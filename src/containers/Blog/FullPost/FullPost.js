import React, { Component } from 'react';
import axios from "axios"

import './FullPost.css';

class FullPost extends Component {
    state= {
        loadedPost: null
    }

    deleteHandler = () => {
        axios.delete(`/posts/${this.props.match.params.id}`)
        .then(res => console.log(res))
    }

    render () {
        let post = <p>Please select a Post!</p>;
        if(this.props.match.params.id)
            post = <p>Loading....</p>;
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deleteHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }

    loadData() {
        const postId = this.props.match.params.id
        if(postId) {
            if(!this.state.loadedPost || (this.state.loadedPost && parseInt(postId) !== this.state.loadedPost.id)) {
                axios.get(`/posts/${postId  }`)
                .then(res => {
                    console.log(res)
                    //This would cause re-render and hence infinte loop if pre-checks aren't there.
                    //Every state update in cdu should be used in conjunction w/pre-checks
                    this.setState({loadedPost: res.data})
                })
            }
        }
    }

    componentDidMount() {
        console.log('[FullPost] compDM')
        console.log(this.props)
        this.loadData()
    }

    componentDidUpdate() {
        console.log('[FullPost] compDU')
        console.log(this.props)
        this.loadData()

    }

}

export default FullPost;