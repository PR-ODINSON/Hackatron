import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useEffect, useState } from 'react'
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Services from './Services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const navigate = useNavigate();

  const loginOpen = () => setIsLoginOpen(true);
  const loginClose = () => setIsLoginOpen(false);

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
    console.log(response)

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
    <>
      <div className="flex flex-col montserrat" >
        <header className="fixed w-full z-10 transition duration-500" data-aos="fade-down" data-aos-duration="1000">
          <nav className="container mx-auto px-10 py-[14px] flex justify-between items-center">
            <ScrollLink to="home"><p className="text-2xl font-bold text-green-700 hover:text-green-800 transition duration-300" data-aos="fade-down" data-aos-duration="2000">MindScan</p></ScrollLink>
            <ul className="flex space-x-6 items-center">
              <li data-aos="fade-down" data-aos-duration="1000">
                <ScrollLink to="home" smooth={true} className="text-gray-700 cursor-pointer hover:text-green-600 hover:font-semibold transition duration-300">Home</ScrollLink>
              </li>
              <li data-aos="fade-down" data-aos-duration="1300">
                <ScrollLink to="about" smooth={true} className="text-gray-700 cursor-pointer hover:text-green-600 hover:font-semibold transition duration-300">About</ScrollLink>
              </li>
              <li data-aos="fade-down" data-aos-duration="1600">
                <ScrollLink to="services" smooth={true} className="text-gray-700 cursor-pointer hover:text-green-600 hover:font-semibold transition duration-300">Services</ScrollLink>
              </li>
              <li data-aos="fade-down" data-aos-duration="1900">
                <ScrollLink to="contact" smooth={true} className="text-gray-700 cursor-pointer hover:text-green-600 hover:font-semibold transition duration-300">Contact</ScrollLink>
              </li>
              <button data-aos="fade-down" data-aos-duration="2500" onClick={loginOpen} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Login</button>
            </ul>
          </nav>
        </header>

        <div id='home'><Home /></div>
        <div id='about'><About /></div>
        <div id='services'><Services /></div>
        <div id='contact'><Contact /></div>
        <Footer />
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
                  placeholder="Email" required
                  className="w-full p-2 pl-10 border rounded-md outline-none"
                />
              </div>
              <div className="mb-6 relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password" required
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
      )}

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
      )}
    </>
  );
}

export default App;