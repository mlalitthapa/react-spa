import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from "../actions/index";
import {Link} from 'react-router-dom';

class PostDetail extends Component {

    componentDidMount()
    {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render(){

        const {post} = this.props;

        if(!post)
            return <div>Loading...</div>;

        return (
            <div>
                <Link to="/" className="btn btn-link">Back To Posts</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete
                </button>
                <h3>{post.title}</h3>
                <h5>Categories: {post.categories}</h5>
                <p>{post.title}</p>
            </div>
        )
    }

}

function mapStateToProps({posts}, ownProps) {
    return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostDetail);