import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section - Brand Info */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-green-400">Cubicles</h2>
            <p className="text-sm">© 2024 Cubicles. All rights reserved.</p>
          </div>

          {/* Right Section - Social Links */}
          <div className="flex gap-4">
            <a href="https://github.com/Cubicles2024/Cubicals-main" className="text-gray-400 hover:text-green-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;