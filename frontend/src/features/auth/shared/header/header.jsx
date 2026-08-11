import PropTypes from "prop-types"
import "./header.css"
import { useContext } from "react"



/*
        Atoms components
*/
export const Logo = ({image_url}) => {
    return (
        <img src = {
            image_url || ""
        } alt = "Logo Online Shop"/>
    )
}

/*
        Molecules components
*/
export const Title = ({name, slogan}) => {
    return (
        <div className = "">
            <h1 className = "">{name || ""}</h1>
            <p className = "">{slogan || ""}</p>
        </div>
    )
}

export const SubTitle = ({content}) => {
    const { text1 } = content
    const { text2 } = content

    return (
        <div>
            <h2 className = "">{text1 || ""}</h2>
            <p className = "">{text2 || ""}</p>
        </div>
    )
}

/*
        Organism component
*/
const Header = ({text1, text2}) => {
    return (
        <header>
            <div>
                <Logo />
                <Title />
            </div>
            <SubTitle content = {{text1, text2}}/>
        </header>
    )
}

export default Header

/*
        StoryBook documentation
*/
