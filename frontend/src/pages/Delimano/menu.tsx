import React from "react";
import Nav from "../../restaurant/components/nav.tsx";
import HeroSection from "../../restaurant/components/heroSection.tsx";
import Newsletter from "../../restaurant/components/newsletter.tsx";
import Footer from "../../restaurant/components/footer.tsx";

function Menu() {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <HeroSection className="flex-1"
                title="Menu"
                backgroundImage="https://pplx-res.cloudinary.com/image/private/user_uploads/HcvSooFslLxaxcq/image.jpg"
            />


            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default Menu;