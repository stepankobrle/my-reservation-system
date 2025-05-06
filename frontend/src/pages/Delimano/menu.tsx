import * as React from "react";
import Nav from "../../restaurant/components/nav";
import HeroSection from "../../restaurant/components/heroSection";
import Newsletter from "../../restaurant/components/newsletter";
import Footer from "../../restaurant/components/footer";

function Menu() {
    return (
        <div className="flex flex-col min-h-screen">
            <Nav />
            <HeroSection
                title="Menu"
                backgroundImage="https://pplx-res.cloudinary.com/image/private/user_uploads/HcvSooFslLxaxcq/image.jpg"
            />


            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default Menu;