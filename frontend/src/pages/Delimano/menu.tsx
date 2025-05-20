import * as React from "react";
import Nav from "../../restaurant/components/nav";
import HeroSection from "../../restaurant/components/heroSection";
import Newsletter from "../../restaurant/components/newsletter";
import Footer from "../../restaurant/components/footer";
// @ts-ignore
import HeaderFoto from "../../img/hp-foto.webp";
import PublicMenu from "../../restaurant/components/publicMenu";


function Menu() {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <HeroSection
                title="Menu"
                backgroundImage={HeaderFoto}
            />
            <PublicMenu restaurantId="ac561b99-2e6a-435c-b3db-208af04803e9"/>

            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default Menu;