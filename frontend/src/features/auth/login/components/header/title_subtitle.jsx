import PropTypes from 'prop-types'

import './title_subtitle.css'


function TitleSubtitle({ centered }) {
    const box_align = centered ? 'box-centered' : 'box-start'

    return (
        <div className={['title-subtitle-box', box_align].join(' ')}>
                <h2 className="header-title">
                    Online Shop
                </h2>
                <p className="header-subtitle">
                    A melhor para o consumidor online
                </p>
            </div>
        )
}

TitleSubtitle.propTypes = {
    centered: PropTypes.bool
}


export default TitleSubtitle
