import BreadCrumps from '@/components/Breadcrumps/Breadcrumps';
import GoodsList from '@/components/GoodsList/GoodsList';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Head from 'next/head';
import React from 'react';


function SubCategoryPage({ goods }) {

    return (
        <>
            <Head>
                <title>MarketHub - знайденться все!</title>
                <link rel="icon" href="/frame380.png" sizes="any" />
                <meta name='MarketHub' content='MarketHub - тут може бути Ваша реклама' />
            </Head>
            <div className='subcategory-page'>
                <Header />
                <div className="subcategory-main-content">
                    <BreadCrumps />
                    <GoodsList props={goods} />
                </div>
                <Footer />
            </div>
        </>
    )
};

export async function getServerSideProps(context) {

    let id;
    if (context.query.subcategory === "Настільні комп’ютери") id = 110;
    else if (context.query.subcategory === "Планшети") id = 120;
    else if (context.query.subcategory === "Ноутбуки") id = 130;
    console.log(id)

    const resGoods = await fetch(`https://market-hub-backend-dat4.vercel.app/goods/subcategories/${id}`);
    const goods = await resGoods.json();

    return {
        props: {
            goods
        }
    };
};

export default React.memo(SubCategoryPage);