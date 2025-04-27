import React from "react";

export default function newsletter() {
    return (
        <section className="w-full py-12">
            <div className="max-w-xl mx-auto flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-light mb-6 text-center">
                    Chcete posílat novinky
                </h2>
                <form className="w-full flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="email"
                        placeholder="Zadejte váš e-mail"
                        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Odeslat
                    </button>
                </form>
            </div>
        </section>
    );
}
