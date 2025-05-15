import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiShop } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { MdDashboard, MdFastfood, MdPeople, MdTableBar, MdMessage, MdSettings, MdPerson, MdCalendarMonth , MdFoodBank } from "react-icons/md";


export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Hlavní odkazy
    const links = [
        { to: "/admin", label: "Dashboard", icon: <MdDashboard /> },
        { to: "/admin/calendar", label: "Kalendář", icon: <MdCalendarMonth /> },
        { to: "/admin/notification", label: "Upozornění", icon: <MdMessage /> },
        { to: "/admin/reservations", label: "Rezervace", icon: <MdPeople /> },
        { to: "/admin/tablemanagment", label: "Správa stolů", icon: <MdTableBar /> },
        { to: "/admin/menumanagment", label: "Správa menu", icon: <MdFoodBank /> },
    ];

    // Spodní odkazy
    const bottomLinks = [
        { to: "/admin/settings", label: "Settings", icon: <MdSettings /> },
        { to: "/admin/user", label: "User Page", icon: <MdPerson /> },
    ];

    return (
        <>
            <div className={`bg-neutral-900 w-60 p-3 flex flex-col fixed h-screen md:static transform transition-transform duration-200 ease-in-out z-50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                {/* Logo a název */}
                <div className="flex items-center gap-2 px-1 py-3">
                    <GiShop className="text-green-500" fontSize={24} />
                    <span className="text-neutral-200 text-lg">StyleSphere</span>
                </div>

                {/* Hlavní odkazy */}
                <div className="py-8 flex flex-1 flex-col gap-0.5">
                    {links.map(link => (
                        <SidebarLink key={link.to} link={link} pathname={pathname} />
                    ))}
                </div>

                {/* Spodní odkazy a tlačítko odhlášení */}
                <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                    {bottomLinks.map(link => (
                        <SidebarLink key={link.to} link={link} pathname={pathname} />
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer text-red-500"
                    >
            <span className="text-xl">
              <HiOutlineLogout />
            </span>
                        Odhlásit se
                    </button>
                </div>
            </div>

            {/* Tlačítko pro otevření/skrytí sidebaru na mobilních zařízeních */}
            <button
                className="md:hidden fixed bottom-4 right-4 p-3 bg-neutral-800 rounded-full shadow-lg text-neutral-200 hover:bg-neutral-700 z-50"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Překryv pro mobilní zobrazení */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
}

function SidebarLink({ link, pathname }) {
    return (
        <Link
            to={link.to}
            className={`flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base
        ${pathname === link.to ? 'bg-neutral-700 text-white' : 'text-neutral-400'}`}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    );
}
