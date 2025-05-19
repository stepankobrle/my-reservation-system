import * as React from "react";
// @ts-ignore
import menuImg from "../../img/delicious-goulash.jpg";
// @ts-ignore
import asadoImg from "../../img/fried-chicken.avif";

const HomeGrid = () => (
    <div>
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 min-h-[600px] ">

        {/* Levý horní blok s obrázkem */}
        <div
            className="relative flex items-center justify-center bg-cover bg-center min-h-[400px] "
            style={{ backgroundImage: `url(${menuImg})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

            <span className="text-white font-bold text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">MENU</span>
        </div>


        {/* Pravý horní blok s textem */}
        <div className="bg-[#d9ece3] flex flex-col justify-center items-start p-6 md:p-12 py-20">
            <p className="mb-6 text-[#1b5e4b]">
                Vychutnejte si naši současnou nabídku lahodných pokrmů vyrobených z místních surovin.
            </p>
            <button className="bg-[#1b5e4b] text-white font-bold py-2 px-6 rounded shadow hover:bg-[#174d3d] transition">
                ZOBRAZIT MENU
            </button>
        </div>
    </div>


    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 min-h-[600px]">
            {/* Levý dolní blok s textem */}
                <div className="order-2 lg:order-1 bg-[#f8e0b0] flex flex-col justify-center items-start p-6 md:p-12">
                    <p className="mb-6 text-[#1b5e4b]">
                        Naše Sunday Asado Series zve šéfkuchaře a grilovací mistry z celého světa, aby převzali náš dvorek a bavili se s přáteli a sousedy.
                    </p>
                    <button className="bg-[#1b5e4b] text-white font-bold py-2 px-6 rounded shadow hover:bg-[#174d3d] transition">
                        NAUČTE SE VÍCE O SUNDAY ASADO
                    </button>
                </div>

                {/* Pravý dolní blok s obrázkem */}
                <div
                    className="order-1 lg:order-2 relative flex items-center justify-center bg-cover bg-center min-h-[400px]"
                    style={{ backgroundImage: `url(${asadoImg})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
              <span className="text-white font-bold text-3xl md:text-4xl lg:text-5xl drop-shadow-lg text-center">
                SUNDAY<br />ASADO
              </span>
                </div>

    </div>
</div>
);

export default HomeGrid;
