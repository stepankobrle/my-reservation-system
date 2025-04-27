import React from "react";
import Nav from "../../restaurant/components/nav.tsx";
import Header from "../../restaurant/components/header.tsx";
import About from "../../restaurant/components/about.tsx";
import Contact from "../../restaurant/components/contact.tsx";
import Newsletter from "../../restaurant/components/newsletter.tsx";
import Footer from "../../restaurant/components/footer.tsx";
import { contactLines } from "../../restaurant/data/contactLines.tsx";

function homepage() {
    return (
        <>
            <Nav />
            <Header/>

            <About
                title="O restauraci"
                paragraphs={[
                    "Naše restaurace nabízí moderní prostředí, špičkovou kuchyni a příjemnou atmosféru pro každou příležitost.",
                    "Těšíme se na vaši návštěvu každý den od 11:00 do 23:00. Rezervace přijímáme online i telefonicky."
                ]}
                //imageSrc={}
                imageAlt="Interiér restaurace"
            />

            <Contact
                title="Kontakt"
                contactLines={contactLines}
                imageSrc="cesta_k_obrazku" // např. importovaná mapa nebo foto
                imageAlt="Mapa nebo foto"
            />

            <Newsletter/>
            <Footer/>
            {/* další obsah stránky */}
        </>
    );
}

export default homepage;