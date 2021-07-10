import React, { Component } from 'react'
import './BookBanner2.css'
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import { withRouter } from 'react-router-dom';
export class BookBanner2 extends Component {
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
            search: '?id=rB2ZDQAAQBAJ'
        });
    };

    render() {
        return (
            <div className="bookBanner2" onClick={this.handleClick}>
                <div className="bookInfo2">
                    <span className="bookTitle2">The...</span>
                    <span className="bookAuthor2">Gary K.</span>
                    <div className="bookNumbers2">
                        <AssessmentOutlinedIcon className="graphIcon2"> </AssessmentOutlinedIcon>

                        <span style={{ fontWeight: 'bold' }}>90+ &nbsp; </span>
                        <span> Read.</span>
                    </div>
                </div>

                <div className="bookPreview2">
                    <img alt="bookImage2" className="bookImage2" src="http://books.google.com/books/content?id=94ScMQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"></img>
                </div>

            </div>
        )
    }
}

export default withRouter(BookBanner2)
