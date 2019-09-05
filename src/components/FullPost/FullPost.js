import React, { Component } from 'react';
import axios from "axios"

import './FullPost.css';

class FullPost extends Component {
    state= {
        loadedPost: null
    }

    deleteHandler = () => {
        axios.delete(`/posts/${this.props.id}`)
        .then(res => console.log(res))
    }

    render () {
        let post = <p>Please select a Post!</p>;
        if(this.props.id)
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

    componentDidUpdate() {
        console.log('[FullPost] comupd')
        if(this.props.id) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.props.id !== this.state.loadedPost.id)) {
                axios.get(`/posts/${this.props.id}`)
                .then(res => {
                    console.log(res)
                    //This would cause re-render and hence infinte loop if pre-checks aren't there.
                    //Every state update in cdu should be used in conjunction w/pre-checks
                    this.setState({loadedPost: res.data})
                })
            }
        }
    }

}

export default FullPost;