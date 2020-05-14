import React from 'react';
import {connect} from 'react-redux';
import {createPost, hideAlert, showAlert} from "../redux/actions";
import {Alert} from "../redux/Alert";

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    handlerSubmit = (event) => {
        event.preventDefault();
        const {title} = this.state;
        const newPost = {
            title, id: Date.now().toString()
        };
        console.log(newPost);

        if (!title.trim()) {
            this.props.showAlert('Post title should not be empty!!!')
    }

        this.props.createPost(newPost);
        this.setState({title: ''});
    };

    changeInputHandler = (event) => {
        event.persist();
        this.setState(prev => ({
            ...prev, ...{
                [event.target.name]: event.target.value
            }
        }))
    };

    render() {
        return (
            <form onSubmit={this.handlerSubmit}>

                {this.props.alert && <Alert text={this.props.alert}/>}

                <div className="form-group">
                    <label htmlFor="title">Post title</label>
                    <input type="text"
                           className="form-control"
                           id="title"
                           value={this.state.title}
                           name='title'
                           onChange={this.changeInputHandler}/>
                </div>
                <button className='btn btn-success' type='submit'>Create</button>
            </form>
        )
    }
};


const mapDispatchProps = {
    createPost, showAlert, hideAlert
};

const mapStateToProps = state => ({
    alert: state.app.alert
});

export default connect(mapStateToProps, mapDispatchProps)(PostForm);