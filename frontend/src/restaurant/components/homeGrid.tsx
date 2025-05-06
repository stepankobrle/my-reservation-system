import * as React from "react";
// @ts-ignore
import menuImg from "../../img/hp-foto.webp";
// @ts-ignore
import asadoImg from "../../img/hp-foto.webp";

const HomeGrid = () => (
    <div>
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 min-h-[600px]">

        {/* Levý horní blok s obrázkem */}
        <div
            className="relative flex items-center justify-center bg-cover bg-center min-h-[400px]"
            style={{ backgroundImage: `url(${menuImg})` }}
        >
            <span className="text-white font-bold text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">MENUS</span>
        </div>
        {/* Pravý horní blok s textem */}
        <div className="bg-[#d9ece3] flex flex-col justify-center items-start p-6 md:p-12 py-20">
            <p className="mb-6 text-[#1b5e4b]">
                Enjoy our current offering of delicious dishes, made with local ingredients sourced from our friends and neighbors.
            </p>
            <button className="bg-[#1b5e4b] text-white font-bold py-2 px-6 rounded shadow hover:bg-[#174d3d] transition">
                VIEW OUR MENU
            </button>
        </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-1 min-h-[600px]">
            {/* Levý dolní blok s textem */}
                <div className="order-2 lg:order-1 bg-[#f8e0b0] flex flex-col justify-center items-start p-6 md:p-12">
                    <p className="mb-6 text-[#1b5e4b]">
                        Our Sunday Asado Series invites chefs and grill masters from all over the world to take over our backyard for a no fuss, no frills bbq-ing afternoon amongst friends and neighbors.
                    </p>
                    <button className="bg-[#1b5e4b] text-white font-bold py-2 px-6 rounded shadow hover:bg-[#174d3d] transition">
                        LEARN MORE ABOUT SUNDAY ASADO
                    </button>
                </div>
                {/* Pravý dolní blok s obrázkem */}
                <div
                    className="order-1 lg:order-2 relative flex items-center justify-center bg-cover bg-center min-h-[400px]"
                    style={{ backgroundImage: `url(${asadoImg})` }}
                >
              <span className="text-white font-bold text-3xl md:text-4xl lg:text-5xl drop-shadow-lg text-center">
                SUNDAY<br />ASADO
              </span>
                </div>

    </div>
</div>
);

export default HomeGrid;
