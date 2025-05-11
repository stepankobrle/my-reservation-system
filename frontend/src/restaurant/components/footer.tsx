import * as React from 'react';
import {FaClock, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={"bg-black px-4 md:px-16 lg:px-28 py-8 "}>
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"}>
                <div>
                    <div className="flex items-center gap-3">
                        <FaClock className="text-xl text-[#1b5e4b]" />
                        <div>
                            <div className="font-semibold text-2xl text-white ">Otevírací doba</div>
                            <div className="text-white ">po - ne</div>
                            <div className="text-white pb-4">12:00 - 22:00</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-white pb-4">
                        <FaMapMarkerAlt className="text-xl text-[#1b5e4b]" />
                        <div>
                            Pardubice, Hradecká 123
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                        <FaEnvelope className="text-xl text-[#1b5e4b]" />
                        <div>
                            restaurant@gmail.com
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className={"text-2xl font-bold mb-4 text-white"}>Links</h2>
                    <ul>
                        <li><a href={""} className={"hover:no-underline text-gray-300"}>Domů</a></li>
                        <li><a href={""} className={"hover:no-underline text-gray-300"}>O nás</a></li>
                        <li><a href={""} className={"hover:no-underline text-gray-300"}>Menu</a></li>
                        <li><a href={""} className={"hover:no-underline text-gray-300"}>Konta</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className={"text-2xl font-bold mb-4 text-white"}>Follow us</h2>
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