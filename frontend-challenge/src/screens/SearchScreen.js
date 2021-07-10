import React, { Component } from 'react'
import './SearchScreen.css'
import BottomNavigation from "@material-ui/core/BottomNavigation";
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchBar from "material-ui-search-bar";
import { Container, Row, Col } from 'react-grid-system';
import { withRouter } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
const replaceImageNotFound = "https://books.google.com.br/googlebooks/images/no_cover_thumb.gif";

export class SearchScreen extends Component {
    state = {
        value: 0,
        search: '',
        books: [],
        loadedBooks: [],
        currentBooksArrayPosition: 8,
        loaded: false
    }

    handleSearch = e => {
        this.props.history.push({
            pathname: '/search',
            search: this.state.search
        });
    };

    handleClick = e => {
        this.props.history.push({
            pathname: '/bookdetails',
            search: '?id=dsz5AwAAQBAJ'
        });
    };

    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    loadMore() {
        let newLodadedBooks = this.state.loadedBooks;
        for (let index = 1; index <= 3; index++) {
            if (this.state.books[this.state.currentBooksArrayPosition + index]) {
                newLodadedBooks.push(this.state.books[this.state.currentBooksArrayPosition + index])
                this.setState({ currentBooksArrayPosition: this.state.currentBooksArrayPosition + 1 })
            }

        }
        this.setState({ loadedBooks: newLodadedBooks })
    }

    componentDidMount() {
        var searchProp = this.props.location.search.substring(1, this.props.location.search.length);
        searchProp = searchProp.replaceAll('%20', ' ')
        this.setState({ search: searchProp })
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + searchProp)
            .then(response => response.json())
            .then(data => this.setState({ books: data.items, loaded: true, loadedBooks: data.items.slice(0, 9) }));
    }

    render() {
        //var resultSize = this.state.books.length;
        //var qtRows = Math.ceil(resultSize / 3);
        //var currentRow = 0;
        console.log(this.state.books)
        console.log(this.state.books.length)
        console.log(this.state.currentBooksArrayPosition)
        return (
            <div className="main">
                <div className="goBackButton" onClick={this.goBack}>
                    <ArrowBackIcon className="goBackButtonIcon" />
                </div>
                <SearchBar
                    disabled={true}
                    value={this.state.search}
                    className="searchBar"
                    placeholder="Search book"
                    onChange={(searchString) => this.setState({ search: searchString })}
                    onRequestSearch={this.handleSearch}
                />

                {this.state.loaded === true ?
                    <div>


                        <Container className="results">
                            <Row>
                                {this.state.loadedBooks.map((book, index) => (
                                    <Col key={book.id} onClick={() => {
                                        this.props.history.push({
                                            pathname: '/bookdetails',
                                            search: `?id=${book.id}`
                                        });
                                    }} className="bookResult">
                                        <img className="bookResultImage" src={`${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : replaceImageNotFound}`} alt={book.volumeInfo.title} />
                                        <span className="bookResultTitle">{book.volumeInfo.title?.length < 25 ? book.volumeInfo.title : `${book.volumeInfo.title.substring(0, 24)}...`}</span>
                                        <span className="bookResultAuthor">by: {book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'NO AUTHOR'}</span>
                                    </Col>
                                ))}
                            </Row>
                        </Container>

                        {this.state.currentBooksArrayPosition < this.state.books.length-1 ?
                            <Button onClick={this.loadMore.bind(this)} className="loadMoreButton" variant="outlined" color="primary">
                                Load More
                            </Button>
                            : null}
                    </div>
                    : <span>Carregando</span>}


                <BottomNavigation
                    className="navigator"
                    showLabels
                    value={this.state.value}
                    onChange={(e, newValue) => {
                        this.setState({ value: newValue })
                    }}
                >
                    <BottomNavigationAction style={{ color: 'black' }} label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction style={{ color: 'gray' }} label="Libraries" icon={<LibraryBooksIcon />} />
                    <BottomNavigationAction style={{ color: 'gray' }} label="Profile" icon={<PersonOutlineOutlinedIcon />} />
                </BottomNavigation>
            </div>
        )
    }
}

export default withRouter(SearchScreen)
