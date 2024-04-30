import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Link from 'next/link';
import Image from 'next/image';
import GoodCardSlider from '../GoodCardSlider/GoodCardSlider';
import React from 'react';
import GoodCardDescription from '../GoodCardDescription/GoodCardDescription';

function GoodCard({ props, breadCrumpData }) {
    const { category, subcategory, title } = breadCrumpData || {};

    return (
        <div className="good-card">
            <Header />
            <div className="good-card-main-content">
                <div className='theWay'>
                    <Link href={"/"} className="logo-bread-crum">
                        <Image
                            alt="logo home"
                            src='/breadcrum/home-outline.svg'
                            quality={100}
                            width={16}
                            height={16} />
                    </Link>
                    <Link href={"#"} className='bread-crum-text-way'>/
                        <p href={`/${category}`}>
                            {category}
                        </p>
                        {subcategory === undefined ? "" : `/${subcategory}`}{title ? `/${title}` : ""}
                    </Link>
                </div>
                <div className="good-card-container">
                    <GoodCardSlider props={props} />
                    <GoodCardDescription props={props} breadCrumpData={breadCrumpData} />
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default React.memo(GoodCard);