import React, { Component } from 'react';
import { merge, zoomIn, slideInLeft, slideInRight, fadeIn, fadeInLeft, slideInDown  } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const slideInRightFade = merge(slideInRight, fadeIn);

const styles = {
    zoomIn: {
        animation: 'x 0.7s',
        animationName: Radium.keyframes(zoomIn, 'zoomIn')
    },
    slideInLeft: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(slideInLeft, 'slideInLeft')
    },
    slideInRight: {
        animation: 'x 0.6s',
        animationName: Radium.keyframes(slideInRight, 'slideInRight')
    },
    slideInRightFade: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(slideInRightFade, 'slideInRightFade')
    },    
    fadeInLeft: {
        animation: 'x 0.6s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
    },
    fadeIn: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    fadeInLong: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    slideInDown: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(slideInDown, 'slideInDown')
    },
    zoomInImg: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(zoomIn, 'zoomIn')
    },
}

class Content extends Component{

    state = {
        selected: this.props.content.id,
        isPlaying: false,
        isLightbox: false,
        scale: 1
    }

    setFilter = (isParent, filter) => {
        if(!isParent){
            this.props.changeCurrentPage(filter);
        }else{
            this.setState({selected: filter});
        }
    }

    isActive = (value) => {
        return 'body-rightmenu-child ' + ((value === this.state.selected) ? 'active' : '');
    }

    stopMusic = () => {
        this.refs.song.pause();
        this.setState({
            isPlaying: false,
        })
    }

    playMusic = () => {
        this.refs.song.volume = .8;
        this.refs.song.play();
        this.setState({
            isPlaying: true,
        })
    }

    handleClickImage = (src, scale) => {
        this.setState({
            isLightbox: true
        }, () => {this.refs.lightbox_img.src = src});

        if(scale){
            this.setState({
                //scale: '1.5'
                scale: '1'
            })
        }else{
            this.setState({
                scale: '1'
            })
        }
    }

    closeLightbox = () => {
        this.setState({
            isLightbox: false
        })
    }

    render(){

        var width = this.props.width;
        // Full width - 2*160 margin
        if(this.props.width < 1430){
            var width2 = width - 476 + 160;
            var width3 = width - 350 + 160;
        }else{
            width2 = width - 570 + 160;
            width3 = width - 500 + 160;
        }

        if(this.props.height < 710){
            width2 = width - 408 + 160;
        }else if(this.props.height < 920){
            width2 = width - 425 + 160;
            //width3 = width - 450 + 160;
        }

        var height = this.props.height - 157;
        var bg = "url('" + this.props.content.bg + "')";
        var scaleVal = 'scale(' + this.state.scale + ')';

        const bgImg = {
            position: 'absolute',
            left: '160px',
            height: height,
            width: width
        }

        const lightbox_img = {
            transform: scaleVal
        }

        const img = {
            width: width,
            height: height,
            //backgroundImage: bg
        }

        // Big image with right side
        const logo = {
            backgroundImage: "url('./img/logo_v2.svg')"
        }

        // Upper and Lower imags with right side
        const img_u_l = {
            marginLeft: width2,
        }

        // Align Center image with right side
        const img_c = {
            marginLeft: width3,
        }
        return(
            <StyleRoot>
                { !this.state.isLightbox ? null : <div onClick={() => {this.closeLightbox()}} className="lightbox">
                                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 21.9" enableBackground="new 0 0 21.9 21.9"><path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"/></svg>
                                                    <img style={lightbox_img} ref="lightbox_img" className="lightbox_img" alt="lightbox_img" src=""/>
                                                    
                                                    </div>}

                {/* Music */}
                <audio ref="song" src="./song.mp3" loop></audio>

                {/*  Main Content Wrapper */}
                <div className="content-wrapper">

                    {/* Background image */}
                    <div style={img} className="content"></div>
                    { this.props.content.bg != "" ? <img key={this.props.content.bg} style={bgImg} src={this.props.content.bg}/> : null }

                    {/* Right Side Menu */}
                    <div className="body-rightmenu textstyle-body-rightmenu">
                        <div>
                            <div className={this.isActive('1')} onClick={this.setFilter.bind(this, false, '1')}>01</div>
                            <div className={this.isActive('2')} onClick={this.setFilter.bind(this, false, '2')}>02</div>
                            <div className={this.isActive('3')} onClick={this.setFilter.bind(this, false, '3')}>03</div>
                            <div className={this.isActive('4')} onClick={this.setFilter.bind(this, false, '4')}>04</div>
                            <div className={this.isActive('5')} onClick={this.setFilter.bind(this, false, '5')}>05</div>
                            <div className={this.isActive('6')} onClick={this.setFilter.bind(this, false, '6')}>06</div>
                            <div className={this.isActive('7')} onClick={this.setFilter.bind(this, false, '7')}>07</div>
                        </div>
                            { !this.state.isPlaying ? <svg className="svg" onClick={() => this.playMusic()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.28 109.27"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M54.53,0a54.64,54.64,0,1,0,54.75,54.6A54.67,54.67,0,0,0,54.53,0Zm.15,104.33A49.69,49.69,0,1,1,104.34,54.6,49.79,49.79,0,0,1,54.68,104.33Z"/><path d="M54.55,9.94A44.7,44.7,0,1,0,99.34,54.61,44.73,44.73,0,0,0,54.55,9.94ZM73.77,56.12,43.84,73.4a2.19,2.19,0,0,1-1.08.31h0a1.71,1.71,0,0,1-1.3-.64A2,2,0,0,1,41,71.76V37.2a2.11,2.11,0,0,1,.42-1.31,1.76,1.76,0,0,1,1.34-.64,2.13,2.13,0,0,1,1.08.31L73.76,52.84h0a1.81,1.81,0,0,1,0,3.28Z"/></g></g></svg> : <svg onClick={() => this.stopMusic()} xmlns="http://www.w3.org/2000/svg" className="svg" viewBox="0 0 109.28 109.27"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M54.55,9.94A44.7,44.7,0,1,0,99.34,54.61,44.73,44.73,0,0,0,54.55,9.94ZM71.66,73.55h-34V35.72h34V73.55ZM54.53,0a54.64,54.64,0,1,0,54.75,54.6A54.67,54.67,0,0,0,54.53,0Zm.15,104.33A49.69,49.69,0,1,1,104.34,54.6,49.79,49.79,0,0,1,54.68,104.33Z"/></g></g></svg> }
                    </div>

                </div>

                {/* Left Side Wrapper */}
                <div className="left-wrapper" key={this.props.content.title}>
                    <div style={logo} className="body-logo" onClick={() => {this.props.changeCurrentPage("1")}}></div>

                    <div className="body-percent textstyle-body-leftmenu">
                        <span style={styles.fadeInLeft}>100%</span> 
                        <div className="leftmenu-line" style={styles.slideInRightFade}></div> 
                        <span style={styles.slideInRightFade}> {this.props.content.contains} <br/> Méthode Classique </span>
                    </div>

                    <span key={this.props.content.title} style={styles.zoomIn} className="img-title textstyle-body-img-title">{this.props.content.title}</span>

                    <div className="scroll-nav">
                        <div className="scroll-nav-arrows">
                            <img className="scroll-nav-arrows-left" src="./img/arrow.svg" alt="Left" onClick={this.props.prevPage}/>
                            <img src="./img/arrow.svg" alt="Right" onClick={this.props.nextPage}/>
                        </div>
                        <div key={this.props.content.id} style={{...styles.fadeInLeft}} className="scroll-nav-line"></div>
                    </div>

                    <span className="body-slogan textstyle-body-slogan">apparently, "too much oeil de faucon is just right."</span>

                </div>

                
                { this.props.content.img_center.length > 0 ? <img onClick={() => {this.handleClickImage(this.props.content.img_center, false)}} style={{...img_c, ...styles.zoomInImg}} className="img_center" alt="" src={this.props.content.img_center}/> : "" }
                
                <span key={this.props.content.desc} className="img-desc textstyle-body-img-desc" style={styles.zoomIn} dangerouslySetInnerHTML={{__html: this.props.content.desc}}>{/*desc.split('\n').map((item, i) => { return <p key={i}>{item}</p> })*/}</span>
                
                { this.props.content.img_upper.length > 0 ? <img onClick={() => {this.handleClickImage(this.props.content.img_upper, true)}} style={{...img_u_l, ...styles.zoomInImg}} alt="" className="img_upper" src={this.props.content.img_upper}/> : "" }
                { this.props.content.img_lower.length > 0 ? <img onClick={() => {this.handleClickImage(this.props.content.img_lower, true)}} style={{...img_u_l, ...styles.zoomInImg}} alt="" className="img_lower" src={this.props.content.img_lower}/> : "" }
            
            </StyleRoot>
        );
    }
}

export default Content;