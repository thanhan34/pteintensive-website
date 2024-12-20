declare module 'react-slick' {
  import { ComponentType } from 'react';

  interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    responsive?: Array<{
      breakpoint: number;
      settings: Settings;
    }>;
    [key: string]: any;
  }

  interface SliderProps extends Settings {
    className?: string;
    children?: React.ReactNode;
  }

  const Slider: ComponentType<SliderProps>;
  export default Slider;
}
