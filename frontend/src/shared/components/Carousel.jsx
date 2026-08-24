import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel  from "embla-carousel-react"

/* Children components */
import ProductsCards from "./ProductCard"

import "./Carousel.css"



/* Molecules components */
export const CarouselButton = ({ 
    class_name, action_func, icon_conf
 }) => {
    return (
        <button className={class_name} 
        onClick={action_func}>
            <svg xmlns={icon_conf.xmlns} 
            className={icon_conf.class_name}
            viewBox={icon_conf.viewBox}>
                <path d={icon_conf.path}/>
            </svg>
        </button>
    )
}

/* Organism component */
// Carousel global configurations
useEmblaCarousel.globalOptions = { 
    loop: true, active: true, align: "center"
}

const Carousel = ({ configs }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {}, [
            // Extensions configuration
            Autoplay({"delay": 3000, "stopOnInteraction": false})
        ]
    )

    const goToPrev = () => emblaApi?.scrollPrev()
    const goToNext = () => emblaApi?.scrollNext()

    return (
        <section className="products-carousel-section" 
        ref={emblaRef}>
            <div className="products-container">
                <ProductsCards items_conf={configs.items}/>
            </div>

            <div className="">
                <CarouselButton action_func={goToPrev}
                class_name={configs.action_btns.class_name}
                icon_conf={
                    configs.action_btns.
                    icon_conf.previus_btn
                }/>
                <CarouselButton action_func={goToNext}
                class_name={configs.action_btns.class_name}
                icon_conf={
                    configs.action_btns.
                    icon_conf.next_btn
                }/>
            </div>
        </section>
    )
}


export default Carousel