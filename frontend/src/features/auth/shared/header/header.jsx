import PropTypes from "prop-types"

import "./header.css"



/*
        Molecules components
*/
export const Title = ({ name, slogan }) => {
    return (
        <div className="">
            <h1 className="">{name}</h1>
            <p className="">{slogan}</p>
        </div>
    )
}

export const SubTitle = ({ title, description }) => {
    return (
        <div>
            <h2 className="">{title}</h2>
            <p className="">{description}</p>
        </div>
    )
}


/*
        Organism component
*/
const Header = ({ configs }) => {
    return (
        <header>
            <div className = "">
                <img src={configs.logo_img.src}
                alt={configs.logo_img.alt}/>
                
                <Title name={configs.title.name} 
                slogan={configs.title.slogan}/>
            </div>

            <SubTitle title={configs.subtitle.title} 
            description={configs.subtitle.desc} />
        </header>
    )
}


export default Header


/*
        StoryBook documentation
*/
Header.propTypes = {
    configs: PropTypes.object.isRequired
}