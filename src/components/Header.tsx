import React from 'react';
import logo from '../assets/fusion-logo.svg';
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-[#252f38f1] w-full lg:flex-row md:flex-row flex-col py-4 px-6 flex items-center justify-around shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo da FrontEnd Fusion" className="w-[50px] h-[50px] mr-4" />
        <h1 className="text-white text-xl font-bold">FrontEnd Fusion</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-white text-sm hover:underline hover:text-blue-300 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="text-white text-sm hover:underline hover:text-blue-300 transition duration-200"
            >
              Cadastros
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
