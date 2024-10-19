import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-green-950 text-green-500 w-full px-12 montserrat text-sm pt-16 pb-8">
      <div className="flex justify-between items-start gap-10">
        {/* Company Info */}
        <div className='flex flex-col w-1/4'>
          <h3 className="text-lg font-semibold mb-4">MindScan</h3>
          <p className="text-gray-400">
            MindScan is a platform designed to assist doctors in diagnosing mental health disorders effectively.
          </p>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col w-1/4 justify-center items-center'>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><ScrollLink to="home" smooth={true} className="text-gray-400 hover:text-white transition duration-300">Home</ScrollLink></li>
            <li><ScrollLink to="about" smooth={true} className="text-gray-400 hover:text-white transition duration-300">About Us</ScrollLink></li>
            <li><ScrollLink to="services" smooth={true} className="text-gray-400 hover:text-white transition duration-300">Services</ScrollLink></li>
            <li><ScrollLink to="contact" smooth={true} className="text-gray-400 hover:text-white transition duration-300">Contact</ScrollLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='flex flex-col w-1/4'>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">Ahmedabad, Gujarat, India</p>
          <p className="text-gray-400">Phone: (123) 456-7890</p>
          <p className="text-gray-400">Email: info@mindscan.com</p>
        </div>

        {/* Newsletter Signup */}
        <div className='flex flex-col w-1/4'>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-green-100 opacity-70 outline-none text-gray-500 px-4 py-2 rounded-l"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 sm:mb-0">
          © 2024 MindScan. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
