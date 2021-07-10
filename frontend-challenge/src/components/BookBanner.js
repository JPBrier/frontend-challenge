import React, { Component } from 'react'
import './BookBanner.css'
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import { withRouter } from 'react-router-dom';
export class BookBanner extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        // GET request using fetch with async/await
        fetch('https://www.googleapis.com/books/v1/volumes?q=hooked')
            .then(response => response.json())
            .then(data => this.setState({ items: data }));
    }

    handleClick = e => {
        this.props.history.push({
            pathname: '/bookdetails',
            search: '?id=dsz5AwAAQBAJ'
        });
    };

    render() {
        
        return (
            
                <div className="bookBanner" onClick={this.handleClick}>
                    <div className="bookInfo">
                        <span className="bookTitle">Hooked</span>
                        <span className="bookAuthor">Nir Eyal</span>
                        <div className="bookNumbers">
                            <AssessmentOutlinedIcon className="graphIcon"> </AssessmentOutlinedIcon>

                            <span style={{ fontWeight: 'bold' }}>120+ &nbsp; </span>
                            <span>Read Now</span>
                        </div>
                    </div>

                    <div className="bookPreview">
                        <img alt="bookImage" className="bookImage" src="http://books.google.com/books/content?id=dsz5AwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"></img>
                    </div>

                </div>
            
        )
    }
}

export default withRouter(BookBanner)
