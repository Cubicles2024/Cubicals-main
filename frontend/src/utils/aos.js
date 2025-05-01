import AOS from 'aos';
import 'aos/dist/aos.css';

const initAOS = () => {
  AOS.init({
    duration: 750,
    easing: 'ease-in-out',
    once: false,
  });
};

export default initAOS; 