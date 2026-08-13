import PropTypes from "prop-types"

import "./header.css"


/*
        Atoms components
*/
export const Logo = ({ image_url, logo_alt }) => {
    return (
        <img src = {
            image_url || ""
        } alt = {logo_alt}/>
    )
}

/*
        Molecules components
*/
export const Title = ({ name, slogan }) => {
    return (
        <div className = "">
            <h1 className = "">{name || ""}</h1>
            <p className = "">{slogan || ""}</p>
        </div>
    )
}

export const SubTitle = ({ title, description }) => {
    return (
        <div>
            <h2 className = "">{title || ""}</h2>
            <p className = "">{description || ""}</p>
        </div>
    )
}

/*
        Organism component
*/
const Header = ({ configs }) => {
    return (
        <header>
            <div>
                <Logo image_url = {} logo_alt = {}/>
                <Title name = {} slogan = {}/>
            </div>
            <SubTitle title = {} description = {} />
        </header>
    )
}


export default Header


/*
        StoryBook documentation
*/
