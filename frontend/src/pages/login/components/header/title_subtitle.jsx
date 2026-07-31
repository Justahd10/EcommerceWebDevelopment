import {Component} from 'react'
import PropTypes from 'prop-types'

import './title_subtitle.css'


class TitleSubtitle extends Component {
    render() {
        const box_align = this.props.centered ? "box-centered" : "box-start"

        return (
            <div className = {["title-subtitle-box", box_align].join(' ')}>
                <h2 className = "header-title">
                    Online Shop
                </h2>
                <p className = "header-subtitle">
                    A melhor para o consumidor online
                </p>
            </div>
        )
    }
}


TitleSubtitle.PropTypes = {
    centered: PropTypes.bool
}


export default TitleSubtitle
