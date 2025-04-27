import React from 'react';
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={"bg-black px-4 md:px-16 lg:px-28 py-8 "}>
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"}>
                <div>
                    <h2 className={"text-lg font-bold mb-4 text-white"}>StyleSphere</h2>
                    <p className={"text-gray-300 max-w-[300px]"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam </p>
                </div>

                <div>
                    <h2 className={"text-lg font-bold mb-4 text-white"}>Links</h2>
                    <ul>
                        <li><a href={""} className={"hover:no-underline text-gray-300"}>Home</a></li>
                        <li><a href={""} className={"hover:no-underline text-gray-300"}>About</a></li>
                        <li><a href={""} className={"hover:no-underline text-gray-300"}>Services</a></li>
                        <li><a href={""} className={"hover:no-underline text-gray-300"}>Contanct</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className={"text-lg font-bold mb-4 text-white"}>Follow us</h2>
                    <ul className={"flex space-x-4"}>
                        <li> <FaFacebook className={"text-blue-500"}/>
                            <a href={""} className={"hover:no-underline text-gray-300"}>Facebook</a>
                        </li>
                        <li><FaTwitter className={"text-sky-500"}/>
                            <a href={""} className={"hover:no-underline text-gray-300"}>Twitter</a>
                        </li>
                        <li><FaInstagram className={"text-orange-500"}/>
                            <a href={""} className={"hover:no-underline text-gray-300"}>Instagram</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={"border-gray-600 border-t pt-6 text-gray-300 text-center mt-6"}>
                <p>@ 2025 Code with yourself. All Right Reservd</p>
            </div>
        </footer>
    );
};

export default Footer;