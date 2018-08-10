import React, { Component } from 'react';
//className="textstyle-header-navmenu-active"

class Header extends Component{

    componentDidMount(){
        var width = window.innerWidth - 2*160;
        this.props.changeWidth(width);
    }

    headerWidth = () => {
        return window.innerWidth - 2*160;
    }

    render(){

        return(
            <div className="header" ref="head">
                <div className="header-left-text textstyle-header-left">
                    <span className="header-left-text-upper">oeil de faucon 22k gold</span><br/>
                    <span>sparkling wines are a combination of only the best!</span>
                </div>

                <div className="header-navmenu textstyle-header-navmenu">
                    <ul>
                        <li onClick={() => {this.props.changeCurrentPage("1")}}>Home</li>
                        <li>About Us</li>
                        <li>Product</li>
                        <li>Gallery</li>
                        <li>News</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;