
import React, { Fragment } from 'react'
import {  Popover, Transition } from '@headlessui/react'
import { HiOutlineBell, HiOutlineSearch, HiOutlineChatAlt } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
//import LogoutButton from "../../auth/LogoutButton";

export default function Header() {
    const navigate = useNavigate()

    return (
        <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
            {/* Vyhledávač */}
            <div className="relative ">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[13rem] md:w-[24rem] h-10 pl-11 pr-4 rounded-sm"
                />
            </div>


            {/* Ikony */}

            



        </div>
    )
}