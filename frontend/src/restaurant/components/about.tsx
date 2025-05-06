import * as React from "react";

export default function About({ title, paragraphs, imageSrc, imageAlt }) {
    return (
        <section className="flex flex-col md:flex-row items-start justify-center w-full max-w-5xl mx-auto my-16 gap-x-8 gap-y-8">
            {/* Textová část */}
            <div className="md:w-[55%] w-full">
                <h2 className="text-4xl font-light mb-4 text-gray-900">{title}</h2>
                {paragraphs.map((text, idx) => (
                    <p key={idx} className="text-lg text-gray-700 mb-2">
                        {text}
                    </p>
                ))}
            </div>
            {/* Obrázková část */}
            <div className="md:w-[45%] w-full flex justify-center items-center">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="rounded-lg shadow-lg w-full max-w-xs object-cover"
                />
            </div>
        </section>
    );
}
