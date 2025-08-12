import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" text-gray-600 px-6 py-10 gap-5 mt-[100px] border-t-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h1 className='text-2xl font-bold'>Hire<span className='text-[blue]'>Me</span></h1>
          <p className="text-sm">
            Empowering learners through internships, real-world projects, and cutting-edge tech training.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-800 text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-800">Home</a></li>
            <li><a href="#" className="hover:text-gray-800">Internships</a></li>
            <li><a href="#" className="hover:text-gray-800">Training</a></li>
            <li><a href="#" className="hover:text-gray-800">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gray-800 text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@hireme.com</p>
          <p className="text-sm">Phone: +91 9876543210</p>
          <p className="text-sm">Address: New Delhi, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-gray-800 text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-gray-800"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-800"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gray-800"><Twitter size={20} /></a>
            <a href="#" className="hover:text-gray-800"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-800">
        © {new Date().getFullYear()} HireMe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
