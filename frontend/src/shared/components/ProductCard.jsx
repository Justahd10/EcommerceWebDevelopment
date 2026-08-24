import "./ProductCard.css"



/*
        Molecules components
*/
export const CardTags = ({ tags_conf }) => {
    const tags = tags_conf.configs.map(
        conf => (
            <span className={conf.class_name}>
                {conf.label}
            </span>
        )
    )

    return (
        <div className={tags_conf.class_name}>
            {tags}
        </div>
    )
}

export const ActButton = ({ 
    btn_class, icon_class, xmlns, 
    viewBox, path
 }) => {
    return (
        <button type="button" className={btn_class}>
            <svg xmlns={xmlns} viewBox={viewBox} 
            className={icon_class}>
                <path d={path}/>
            </svg >
        </button>
    )
}

export const ProductMedia = ({ tags, img_path, img_alt }) => {
    // Resolver for image path from JSON
    const src = new URL(img_path, import.meta.url).href

    return (
        <div className="">
            <CardTags tags_conf={tags}/>
            <img className=""
            src={src} alt={img_alt}/>
        </div>
    )
}

export const ProductInfo = ({ name, desc }) => {
    return (
        <div className="">
            <h3 className="">{name}</h3>
            <span className="">{desc}</span>
        </div>
    )
}

export const ProductPrice = ({ current, previus }) => {
    return (
        <div className="">
            <span className="">R$</span>
            <span className="">{current}</span>
            <span className="">{previus ?? ""}</span>
        </div>
    )
}

export const CardActions = ({ actions_conf }) => {
    const act_btns = actions_conf.map(
        conf => <ActButton key={conf.key}
        xmlns={conf.xmlns} path={conf.path} 
        viewBox={conf.viewBox}
        btn_class={conf.btn_class}
        icon_class={conf.icon_class}/>
    )

    return (
        <div className="">
            {act_btns}
        </div>
    )
}

export const ProductCard = (
    {
        src, alt, tags, name, desc, 
        current_price, previus_price,
        actions_conf, card_class
    }
) => {
    return (
        <article className={card_class}>
            <ProductMedia tags={tags} 
            img_path={src} img_alt={alt}/>

            <ProductInfo name={name} desc={desc}/>

            <ProductPrice 
            current={current_price} 
            previus={previus_price}/>

            <CardActions actions_conf={actions_conf}/>
        </article>
    )
}

const ProductsCards = ({ items_conf })=>{
    const products_cards = items_conf.map(
        conf => <ProductCard 
        key={conf.name} alt={conf.alt}
        name={conf.name} src={conf.img}
        tags={conf.tags} desc={conf.desc}
        current_price={conf.current_price}
        previus_price={conf.previus_price}
        actions_conf={conf.actions}
        card_class={conf.card_class}/>
    )

    return products_cards
}


export default ProductsCards