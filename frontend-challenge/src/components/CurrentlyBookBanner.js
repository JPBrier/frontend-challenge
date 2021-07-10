import React, { Component } from 'react'
import './CurrentlyBookBanner.css'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import { withRouter } from 'react-router-dom';
export class CurrentlyBookBanner extends Component {
    state = {
        items: []
    }
    async componentDidMount() {
        // GET request using fetch with async/await
        fetch('https://www.googleapis.com/books/v1/volumes?q=hooked')
            .then(response => response.json())
            .then(data => this.setState({ items: data }));
    }
    handleClick = e => {
        this.props.history.push({
            pathname: '/bookdetails',
            search: '?id=Cy86CQAAQBAJ'
        });
    };

    render() {
        return (
            <div onClick={this.handleClick}>
                <div className="currentlyBookPreview">
                    <img alt="currentlyBookImage" className="currentlyBookImage" src="https://images-na.ssl-images-amazon.com/images/I/511qyzBH42L._SX322_BO1,204,203,200_.jpg"></img>
                </div>
                <div className="currentlyBookBanner">
                    <div className="currentlyBookInfo">
                        <span className="currentlyBookTitle">Originals</span>
                        <span className="currentlyBookAuthor">by Adam Grant</span>
                        <div className="currentlyBookNumbers">
                            <BookOutlinedIcon className="bookmarkIcon"> </BookOutlinedIcon>
                            <span>Chapter</span>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>&nbsp; 2</span>
                            <span>&nbsp; From 9</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CurrentlyBookBanner)
