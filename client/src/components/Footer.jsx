import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-green-500 mb-4">
              Abyalew Estate
            </h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner in finding your dream home. Discover a wide
              range of homes, apartments, and properties across the city.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://t.me/Abyalew07"
                className="text-gray-400 hover:text-white"
              >
                Telegram
              </a>
              <a
                href="https://twitter.com/Abyalew1019718
"
                className="text-gray-400 hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://github.com/AbyalewLobe"
                className="text-gray-400 hover:text-white"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/abyalew-lobe-01187933b"
                className="text-gray-400 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-4">
              Abyalew Estate, Addis Ababa, Ethiopia
            </p>
            <p className="text-gray-400 mb-4">
              Email:{" "}
              <a href="mailto:labyalew@gmail.com" className="hover:text-white">
                labaylew@gmail.com
              </a>
            </p>
            <p className="text-gray-400 mb-4">Phone: +251 974671434</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Abyalew Estate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
