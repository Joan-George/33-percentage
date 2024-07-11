"use client";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

const EmblaCarousel = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
	return (
		<div className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{slides.map((item, index) => (
						<div className="embla__slide embla__class-names" key={index}>
							<Image
								width={500}
								height={500}
								className="embla__slide__img object-fill"
								src={item?.src ? item.src : `https://picsum.photos/600/350?v=1`}
								// src={"/assets/shop-images/full_view.jpg"}
								alt={item?.name ? item.name : "name"}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="embla__controls">
				<div className="embla__buttons">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>

				<div className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
