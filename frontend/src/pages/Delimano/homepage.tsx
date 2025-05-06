import * as React from "react";
import Nav from "../../restaurant/components/nav";
import Header from "../../restaurant/components/header";
import About from "../../restaurant/components/about";
import Contact from "../../restaurant/components/contact";
import Newsletter from "../../restaurant/components/newsletter";
import Footer from "../../restaurant/components/footer";
import { contactLines } from "../../restaurant/data/contactLines";
import HomeGrid from "../../restaurant/components/homeGrid";
import InfoSection from "../../restaurant/components/infoSection";


function homepage() {
    return (
        <>
            <Nav />
            <Header/>
            <InfoSection/>
            <HomeGrid/>

            {/* sekce s informacemi o restauraci
            <Contact
                title="Kontakt"
                contactLines={contactLines}
                imageSrc="cesta_k_obrazku" // např. importovaná mapa nebo foto
                imageAlt="Mapa nebo foto"
            />
            */}

            <Newsletter/>
            <Footer/>
            {/* další obsah stránky */}
        </>
    );
}

export default homepage;