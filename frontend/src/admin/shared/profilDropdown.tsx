import React, {Fragment} from 'react';
import {Popover, Transition} from "@headlessui/react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import LogoutButton from "../auth/LogoutButton";

export default function ProfileDropdown(props) {
    const navigate = useNavigate();

    return (
        <Popover className="relative">
            <Popover.Button
                className="hidden lg:flex ml-2 bg-gray-800  text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                <span className="sr-only">Open user menu</span>
                <div
                    className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                    style={{backgroundImage: 'url("https://source.unsplash.com/80x80?face")'}}
                >
                    <span className="sr-only">Marc Backes</span>
                </div>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Popover.Panel
                    className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                        onClick={() => navigate('/account')}
                        className="rounded-sm px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200">
                        Account
                    </div>
                    <div
                        onClick={() => navigate('/settings')}
                        className="rounded-sm px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200">
                        Settings
                    </div>
                    <div
                        className="rounded-sm px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-200">

                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

