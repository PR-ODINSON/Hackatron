import "../assets/stylesheets/home.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link as ScrollLink } from 'react-scroll';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true
    });
  }, []);

  return (
    <>
      <div className="mainBg w-[100vw] h-[100vh] text-green-700 montserrat">
        <div className="w-full h-full relative">
          <div className="box p-10 text-center rounded-xl w-[55vw]">
            <h1 className="text-5xl mb-5 tracking-normal font-medium" data-aos="fade-left" data-aos-duration="500">Welcome to MindScan</h1>
            <p className="text-lg mb-8" data-aos="fade-left" data-aos-duration="2000">Utilizing Machine Learning to Detect Mental Health Conditions from EEG Signals</p>
            <ScrollLink to="about" smooth={true}><button data-aos="fade-up" data-aos-duration="3000" className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">Discover More</button></ScrollLink>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home