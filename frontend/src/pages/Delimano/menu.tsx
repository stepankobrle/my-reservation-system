import * as React from "react";
import Nav from "../../restaurant/components/nav";
import HeroSection from "../../restaurant/components/heroSection";
import Newsletter from "../../restaurant/components/newsletter";
import Footer from "../../restaurant/components/footer";
// @ts-ignore
import HeaderFoto from "../../img/hp-foto.webp";


function Menu() {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <HeroSection
                title="Menu"
                backgroundImage={HeaderFoto}
            />


            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default Menu;