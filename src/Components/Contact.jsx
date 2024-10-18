import { useState } from 'react';
import "../assets/stylesheets/contact.css"

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <div className="bg-customGradient1 min-h-screen pt-12 pb-12 px-12 w-full flex flex-col items-center justify-center montserrat">
        <div className="mainBox mt-16 p-8 rounded-xl w-1/2">
          <h2 className="text-4xl font-semibold text-green-800 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-6">
            Join our community to stay updated on the latest developments in mental health technology.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 py-3 px-5 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Your Name" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 py-3 px-5 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Your Email" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="mt-1 py-3 px-5 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact