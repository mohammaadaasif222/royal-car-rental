import HeroSlider, { Overlay, Slide, MenuNav } from "hero-slider";
import Wrapper from "./Wrapper/Wrapper";
import Title from "./Title/Title";
import Subtitle from "./Subtitle/Subtitle";

const bogliasco = "https://res.cloudinary.com/mae-com-in/image/upload/v1696409648/cars_ktdznp.jpg";
const countyClare = "https://res.cloudinary.com/mae-com-in/image/upload/v1696411026/audi_e_tron_8-wide_akud7e.jpg"
const craterRock = "https://res.cloudinary.com/mae-com-in/image/upload/v1696409648/wp7634879_hvfbec.jpg";
const giauPass = "https://res.cloudinary.com/mae-com-in/image/upload/v1696411027/hk_qcihaz.jpg"
export default function Slider() {
  return (
    <HeroSlider

      height={"100vh"}
      autoplay
      controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide)
      }}
    >
      <Overlay>
        <Wrapper>
          <Title>For Rent $70 Per day</Title>
          <Subtitle>
            Reserve Now and Get 50% off
          </Subtitle>
        </Wrapper>
      </Overlay>

      <Slide
        shouldRenderMask
        label="Giau Pass - Italy"
        background={{
          backgroundImageSrc: giauPass
        }}
      />

      <Slide
        shouldRenderMask
        label="Bogliasco - Italy"
        background={{
          backgroundImageSrc: bogliasco
        }}
      />

      <Slide
        shouldRenderMask
        label="County Clare - Ireland"
        background={{
          backgroundImageSrc: countyClare
        }}
      />

      <Slide
        shouldRenderMask
        label="Crater Rock, OR - United States"
        background={{
          backgroundImageSrc: craterRock
        }}
      />

      <MenuNav />
    </HeroSlider>
  );
}
