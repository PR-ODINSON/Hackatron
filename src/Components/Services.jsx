import { faBrain } from '@fortawesome/free-solid-svg-icons';
import ServiceCard from './ServiceCard';
import { Link as ScrollLink } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Services = () => {
    useEffect(() => {
        AOS.init({
          duration: 2000,
          once: true
        });
      }, []);
    return (
        <>
            <div className="bg-customGradient1 min-h-screen pt-24 pb-12 px-12 w-full montserrat">
                <h1 className="text-4xl font-bold text-center text-green-800 mb-16" data-aos="fade-up" data-aos-duration="1000">MindScan Services</h1>
                <div className="flex justify-center gap-10 text-left" data-aos="fade-up" data-aos-duration="1000">
                    <ServiceCard
                        title="Anxiety Disorder Diagnosis"
                        description="Accurate identification and analysis of anxiety disorders to guide treatment."
                        icon={faBrain}
                    />
                    <ServiceCard
                        title="Bipolar Disorder Management"
                        description="Comprehensive monitoring and management of bipolar disorder symptoms."
                        icon={faBrain}
                    />
                    <ServiceCard
                        title="Depression Screening"
                        description="Early detection and assessment of depression symptoms for timely intervention."
                        icon={faBrain}
                    />
                    <ServiceCard
                        title="Schizophrenia Diagnosis"
                        description="Advanced analysis for the diagnosis and treatment of schizophrenia."
                        icon={faBrain}
                    />
                </div>
                <div className="text-center mt-16">
                    <h2 className="text-2xl font-semibold text-green-800 mb-4" data-aos="fade-up" data-aos-duration="1000">Empowering Your Mental Health Journey</h2>
                    <p className="text-lg text-gray-700 mb-6" data-aos="fade-up" data-aos-duration="1000">
                        MindScan is committed to providing you with the tools and resources needed to navigate mental health challenges.
                    </p>
                    <ScrollLink to="about" smooth={true}><button className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300" data-aos="fade-up" data-aos-duration="1000">Discover More</button></ScrollLink>
                </div>
            </div>
        </>
    )
}

export default Services