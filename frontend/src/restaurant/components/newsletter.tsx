import * as React from "react";

export default function Newsletter() {
    return (
        <section className="w-full py-20">
            <div className="max-w-xl mx-auto flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-medium text-[#1b5e4b]  mb-6 text-center">
                    Přihlašte se k odběru novinek a speciálních nabídek
                </h2>
                <form className="w-full flex flex-col sm:flex-row items-center  ">
                    <input
                        type="email"
                        placeholder="Zadejte váš e-mail"
                        className="flex-1 px-4 py-2 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2  bg-[#1b5e4b] text-white  hover:bg-[#125743] transition font-bold"
                    >
                        Odeslat
                    </button>
                </form>
            </div>
        </section>
    );
}
