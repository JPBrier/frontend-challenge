import React, { Component } from 'react'
import './Home.css'
import BottomNavigation from "@material-ui/core/BottomNavigation";
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchBar from "material-ui-search-bar";
import BookBanner from '../components/BookBanner';
import BookBanner2 from '../components/BookBanner2';
import CurrentlyBookBanner from '../components/CurrentlyBookBanner';
import { withRouter } from 'react-router-dom';

export class Home extends Component {
    state = {
        value: 0,
        search: ''
    }

    handleSearch = e => {
        this.props.history.push({
            pathname: '/search',
            search: this.state.search
        });
    };

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        return (
            <div className="main">

                <SearchBar
                    className="searchBar"
                    placeholder="Search book"
                    onChange={(searchString) => this.setState({search : searchString})}
                    onRequestSearch={this.handleSearch}
                />

                <div className="profileName">
                    <span>Hi,</span>
                    <span className="name">Mehmed Al Fatih</span>
                    <span className="hand-icon">👋</span>
                </div>

                <div className="categoryName">
                    <span>Discover new book</span>

                    <div style={{ flex: 1 }}>

                    </div>

                    <span className="categoryDetails">More</span>
                </div>

                <div className="discover">

                    <BookBanner>

                    </BookBanner>

                    <BookBanner2>

                    </BookBanner2>
                </div>

                <div className="categoryName">
                    <span>Currently Reading</span>

                    <div style={{ flex: 1 }}>

                    </div>

                    <span className="categoryDetails">All</span>
                </div>

                <CurrentlyBookBanner></CurrentlyBookBanner>

                <div className="categoryName">
                    <span>Review of The Day</span>

                    <div style={{ flex: 1 }}>

                    </div>

                    <span className="categoryDetails">All Video</span>
                </div>

                <img alt="reviewBanner" className="reviewBanner" src="https://i.ytimg.com/vi/vBzBgewl4ac/maxresdefault.jpg"></img>


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

export default withRouter(Home)
