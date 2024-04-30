import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

function GoodCardSlider({ props }) {
    const { photo_preview, photo } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [biggerPfoto, setBiggerPfoto] = useState(false);

    const nextSlide = (event) => {
        event.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photo.length);
    };

    const prevSlide = (event) => {
        event.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photo.length) % photo.length);
    };

    const prevIndex = (currentIndex - 1 + photo.length) % photo.length;
    const nextIndex = (currentIndex + 1) % photo.length;



    const enlargeThePhoto = (event) => {
        event.stopPropagation();
        setBiggerPfoto(!biggerPfoto)
    }


    return (
        <div className="good-card-left-column">
            <div className='good-card-medium-pfoto-column'>
                {[prevIndex, currentIndex, nextIndex].map((index) => {
                    return (
                        <div key={index}
                            className="good-card-medium-pfoto-item">
                            <div className="medium-pfoto-container">
                                <Image
                                    alt="image of good"
                                    src={"https://" + photo[index].photoUrl}
                                    quality={100}
                                    fill
                                    sizes="(max-width: 100%)"
                                    style={{
                                        objectFit: 'contain',
                                        width: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={`good-card-big-pfoto-column ${!biggerPfoto ? ' ' : "bigger-ptoto"}  `}


                onClick={enlargeThePhoto}>
                <div className="good-card-prev-button" onClick={nextSlide}>
                    <div className="image-container-arrow">
                        <Image
                            alt="image of good"
                            // src={images[0]}
                            src="/arrow1.svg"
                            quality={100}
                            fill
                            sizes="(max-width: 100%)"
                            style={{
                                objectFit: 'contain',
                                width: '100%'
                            }}
                        />
                    </div>
                </div>
                <div className="good-card-next-button" onClick={prevSlide}>
                    <div className="image-container-arrow">
                        <Image
                            alt="image of good"
                            // src={images[0]}
                            src="/arrow2.svg"
                            quality={100}
                            fill
                            sizes="(max-width: 100%)"
                            style={{
                                objectFit: 'contain',
                                width: '100%'
                            }}
                        />
                    </div>
                </div>
                <div className='good-card-big-pfoto-container'>
                    <Image
                        alt="image of good"
                        src={"https://" + photo[currentIndex].photoUrl}
                        quality={100}
                        fill
                        sizes="(max-width: 80%)"
                        style={{
                            objectFit: 'contain',
                            width: '100%',
                            maxWidth: "80%",
                            margin: "auto"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(GoodCardSlider);