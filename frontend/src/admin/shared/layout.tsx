import * as React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar s pevnou šířkou */}
            <aside className="sticky top-0 h-screen overflow-y-auto  bg-white z-20 border-r">
                <Sidebar />
            </aside>

            {/* Obsah */}
            <div className="flex flex-col flex-1">
                <aside className="sticky top-0 w-full bg-white z-10 shadow">
                    <Header />
                </aside>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
