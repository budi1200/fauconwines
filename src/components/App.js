import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import '../animations.css';
import Header from './Header';
import Content from './Content';
import { pages } from '../pages';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 1,
      height: 1,
      pagesList: pages,
      currentPage: pages.page1,
      pageNumber: 1
    }
  }

  
  // Change background image width to header width, accepts number
  changeWidth = (newValue) => {
    this.setState({
      width: newValue,
    });
  }
  
  changeHeight = (newValue) => {
    this.setState({
      height: newValue
    });
    //console.log(this.state.height);
  }
  
  // Returns state width number
  getWidth = () => {
    return this.state.width;
  }

  getHeight = () => {
    return window.innerHeight;
  }
  
  // Change To specific page, accepts page number
  changeCurrentPage = (newPage) => {
    var asd = pages['page' + newPage]
    this.setState({
      currentPage: asd,
      pageNumber: newPage
    });
    this.refs.contentChild.setFilter(true, newPage);
  }

  // Go 1 page forward, if at last page to go first page
  nextPage = () => {
    var nextPgNum = parseInt(this.state.pageNumber, 10) + 1
    
    if(nextPgNum > 7){
      nextPgNum = 1;
    }
    
    var page = pages['page' + nextPgNum]
    setTimeout(() => {
    this.setState({
      currentPage: page,
      pageNumber: nextPgNum
    });
    this.refs.contentChild.setFilter(true, ""+nextPgNum);
  }, 0);
  }
  

  // Go 1 page back, if at first page go to last page
  prevPage = () => {
    var prevPgNum = parseInt(this.state.pageNumber, 10) - 1
    
    if(prevPgNum < 1){
      prevPgNum = 7;
    }
    
    var page = pages['page' + prevPgNum]
    this.setState({
      currentPage: page,
      pageNumber: prevPgNum
    });
    this.refs.contentChild.setFilter(true, ""+prevPgNum);
  }


  // Mouse Scroll Handler
  handleScroll = (e) => {
    //console.log('Scroll event is being called', e.deltaY);
    if(e.deltaY > 0){
      this.nextPage();
    }else if(e.deltaY < 0){
      this.prevPage();
    }
  }

  resize = () => {
    this.changeWidth(this.refs.headerChild.headerWidth());
    this.changeHeight(this.getHeight());
  }

  componentDidMount() {
    this.changeHeight(this.getHeight());
    const holder = ReactDOM.findDOMNode(this.refs.holder)
    holder.addEventListener('mousewheel', this.handleScroll);
    // Resize event test
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
      const holder = ReactDOM.findDOMNode(this.refs.holder)
      holder.removeEventListener('mousewheel', this.handleScroll);
      // Resize event test
      window.removeEventListener("resize", this.resize);
  }

  render() {

    return (
      <div className="App" ref="holder">
        <Header ref="headerChild" width={this.state.width} changeWidth={this.changeWidth} getWidth={this.getWidth} changeCurrentPage={this.changeCurrentPage}/>
        <Content ref="contentChild" height={this.state.height} width={this.state.width} getWidth={this.getWidth} content={this.state.currentPage} changeCurrentPage={this.changeCurrentPage} nextPage={this.nextPage} prevPage={this.prevPage} pageNumber={this.pageNumber} />
      </div>
    );
  }
}

export default App;
