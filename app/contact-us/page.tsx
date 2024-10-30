
import { MapPin, Phone, Mail, Facebook, Twitter } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Contact Us</h1>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Contact Form */}
            <div className="md:w-1/2 p-8 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send us a message</h2>
              <form>
                <div className="mb-4 md:mb-8">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="mb-4 md:mb-8">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="mb-4 md:mb-8">
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="mb-4 md:mb-4 md:mt-24">
                  <textarea 
                    placeholder="Your Message" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-40 resize-none" 
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Company Information and Map */}
            <div className="md:w-1/2 bg-gray-50 p-8">
              <h2 className="text-2xl font-semibold mb-6">Our Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                  <p>Sir Syed Rd, 2-P Block P Gulberg 2, Lahore, Punjab 54660</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-500 mr-3" />
                  <p>+92 35755771</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-500 mr-3" />
                  <p>info@princeelectric.com</p>
                </div>
              </div>
              
              {/* Map placeholder */}
              <div className="map-container rounded-lg mt-10" style={{ height: '400px', width: '100%' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.0975059610137!2d74.34436588382789!3d31.52148180772489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f8501a0a45%3A0xc78f46f1d4f851fe!2sPrince%20Electric!5e0!3m2!1sen!2s!4v1730200266877!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Footer with Social Links */}
          <div className="bg-gray-800 text-white p-6">
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-blue-400">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}