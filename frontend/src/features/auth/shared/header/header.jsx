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

export const SubTitle = ({ 
    container_style, title, desc
 }) => {
    return (
        <div className={container_style}>
            <h2 className="">{title}</h2>
            {desc && <p className="">{desc}</p>}
        </div>
    )
}


/*
        Organism component
*/
const Header = ({ configs }) => {
    return (
        <header className="">
            <div className = "">
                {
                    configs.logo_img &&
                    <img src={configs.logo_img.src}
                    alt={configs.logo_img.alt}/>
                }

                {
                    configs.title &&
                    <Title name={configs.title.name} 
                    slogan={configs.title.slogan}/>
                }
            </div>

                {
                    configs.subtitle &&
                    <SubTitle container_style={
                        configs.subtitle.container_style
                    }
                    title={configs.subtitle.title} 
                    desc={configs.subtitle.desc} />
                }
        </header>
    )
}


export default Header
