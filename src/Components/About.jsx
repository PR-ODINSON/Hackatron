import { faUserMd, faHospital, faLock, faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
import FeatureCard from './FeatureCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true
    });
  }, []);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const loginOpen = () => setIsLoginOpen(true);
  const loginClose = () => setIsLoginOpen(false);

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const registrationOpen = () => setIsRegistrationOpen(true);
  const registrationClose = () => setIsRegistrationOpen(false);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    loginClose();
    registrationOpen();
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    registrationClose();
    loginOpen();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log(response)

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
      navigate('/dashboard');
    } else {
      const error = await response.json();
      console.error("Login failed", error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
      navigate('/dashboard');
    } else {
      const error = await response.json();
      console.error("Registration failed", error.message);
    }
  };

  return (
    <div className="bg-customGradient1 min-h-screen pt-24 pb-12 px-12 w-full montserrat">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-16" data-aos="fade-up" data-aos-duration="1000">About MindScan</h1>
      <div className="flex w-full gap-10 justify-center items-start text-lg mb-2">
        <p className="text-gray-700 mb-6 w-1/3 text-justify" data-aos="fade-up" data-aos-duration="1000">
          Welcome to MindScan, a revolutionary platform designed to support doctors in diagnosing mental health conditions. MindScan analyzes EEG and ECG data aiding doctors in diagnosing mental health disorders. Our goal is to empower healthcare professionals with accurate insights, enhancing patient care and improving mental health outcomes through advanced technology.
        </p>
        <div className='w-2/3 text-sm'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-duration="1000">
            <FeatureCard
              icon={faUserMd}
              title="Easy Registration"
              description="Simple and quick registration process for doctors."

            />
            <FeatureCard
              icon={faHospital}
              title="Institution Connections"
              description="Connect with hospitals and clinics seamlessly."
            />
            <FeatureCard
              icon={faLock}
              title="Secure Credentials"
              description="Your medical license and personal information are always protected."
            />
            <FeatureCard
              icon={faHandHoldingMedical}
              title="Streamlined Verification"
              description="Efficient verification process for medical institutions."
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-green-800 mb-4" data-aos="fade-up" data-aos-duration="1000">Join MindScan Today</h2>
        <p className="text-lg text-gray-700 mb-6" data-aos="fade-up" data-aos-duration="1000">
          Be part of a growing community of medical professionals and institutions.
          Together, were building a more connected and efficient healthcare system.
        </p>
        <button onClick={registrationOpen} className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300" data-aos="fade-up" data-aos-duration="1000">Register</button>
      </div>

      {isLoginOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 montserrat z-30'>
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4 relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 pl-10 border rounded-md outline-none"
                />
              </div>
              <div className="mb-6 relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 pl-10 border rounded-md outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md transition duration-300 font-semibold tracking-wide">Login
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="/" className="text-green-600 hover:outline-none" onClick={handleRegisterClick}>
                Register
              </a>
            </p>
            <button
              onClick={loginClose}
              className="mt-6 text-gray-600 hover:text-gray-800 font-semibold">Close
            </button>
          </div>
        </div>
      )
      }

      {isRegistrationOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 montserrat z-30'>
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Doctor Registration</h1>
            <form onSubmit={handleRegisterSubmit}>
              <div className="relative mb-4">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  required
                  name='name'
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="relative mb-4">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  required
                  name='email'
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="relative mb-4">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  name='password'
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <div className="relative mb-4">
                <FontAwesomeIcon icon={faHospitalUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="licenseNumber"
                  placeholder="Medical License Number"
                  required
                  name='license'
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-gradient text-white py-2 px-4 rounded-md outline-none transition duration-300 font-semibold tracking-wide bg-green-600 hover:bg-green-700"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <a href="/" className="text-green-600 hover:no-underline" onClick={handleLoginClick}>
                Login here
              </a>
            </p>
            <button
              onClick={registrationClose}
              className="mt-6 text-gray-600 hover:text-gray-800 font-semibold">Close
            </button>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default About;