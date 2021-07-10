import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import './BookDetails.css'
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import HeadsetOutlinedIcon from '@material-ui/icons/HeadsetOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShareIcon from '@material-ui/icons/Share';

const replaceImageNotFound = "https://books.google.com.br/googlebooks/images/no_cover_thumb.gif";
export class BookDetails extends Component {
    state = {
        book: [],
        loaded: false,
        value: 0,
    }

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    componentDidMount() {
        var bookId = this.props.location.search;
        bookId = bookId.substring(4, bookId.length)
        console.log(bookId)
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookId)
            .then(response => response.json())
            .then(data => this.setState({ book: data.items[0], loaded: true }));
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    handleClick = e => {
        this.props.history.pop();
    };

    render() {
        console.log(this.state.book)
        return (
            <div>
                {this.state.loaded === true ?
                    <div className="main">
                        <div className="backButtonDiv" onClick={this.goBack}>
                            <ArrowBackIcon className="backButtonIcon" />
                        </div>

                        <img alt="image" className="image" src={this.state.book.volumeInfo.imageLinks ? this.state.book.volumeInfo.imageLinks.thumbnail : replaceImageNotFound}></img>

                        <span className="title">
                            {this.state.book.volumeInfo.title} : &nbsp;
                            <span className="subtitle">
                                {this.state.book.volumeInfo.subtitle}
                            </span>
                        </span>

                        <span className="author">
                            {this.state.book.volumeInfo.authors[0]}
                        </span>

                        <span className="description">
                            {this.state.book.volumeInfo.description?.length > 700 ? this.state.book.volumeInfo.description : 
                                <span>
                                Excepteur aute Lorem tempor incididunt aliqua deserunt sunt consectetur aute non officia laborum sunt. Cillum commodo tempor consequat officia nostrud culpa laboris nostrud eu adipisicing culpa laborum sunt. Tempor esse minim labore ad exercitation laboris officia in ex minim adipisicing do. Veniam non ea ea non laborum adipisicing ad ipsum commodo dolore magna.
                                
                                Excepteur aute Lorem tempor incididunt aliqua deserunt sunt consectetur aute non officia laborum sunt. Cillum commodo tempor consequat officia nostrud culpa laboris nostrud eu adipisicing culpa laborum sunt. Tempor esse minim labore ad exercitation laboris officia in ex minim adipisicing do. Veniam non ea ea non laborum adipisicing ad ipsum commodo dolore magna.
                                </span>}
                        </span>

                        <div className="bookActions">
                            <ImportContactsOutlinedIcon className="bookActionsIcons" /> Read &nbsp; |
                            <HeadsetOutlinedIcon className="bookActionsIcons" /> Listen &nbsp; |
                            <ShareIcon className="bookActionsIcons" /> Share

                        </div>
                    </div>
                    : <span>Carregando</span>}
            </div>
        )
    }
}

export default withRouter(BookDetails)
