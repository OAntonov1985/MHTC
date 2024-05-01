import BreadCrumps from '@/components/Breadcrumps/Breadcrumps';
import GoodsList from '@/components/GoodsList/GoodsList';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Head from 'next/head';
import React from 'react';
import { URLADRESS } from '@/components/Constants';
import EmptyCategorie from '@/components/EmptyCategotie/EmptyCategorie';


function SubCategoryPage({ goods, id, total }) {

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
                    <BreadCrumps subID={id} />
                    {goods.items.length === 0 ? <EmptyCategorie /> : (
                        <GoodsList props={goods} total={total} id={id} />
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
};

export async function getServerSideProps(context) {

    let id;
    if (context.query.subcategory === "Ноутбуки") id = 100;
    else if (context.query.subcategory === "Настільні комп’ютери") id = 160;
    else if (context.query.subcategory === "Планшети") id = 220;

    else if (context.query.subcategory === "Розумні годинники") id = 400;
    else if (context.query.subcategory === "Смартфони") id = 340;
    else if (context.query.subcategory === "Аксесуари") id = 460;

    else if (context.query.subcategory === "Дрібна побутова техніка") id = 520;
    else if (context.query.subcategory === "Велика побутова техніка") id = 580;
    else if (context.query.subcategory === "Кліматична побутова техніка") id = 640;

    else if (context.query.subcategory === "Приставки") id = 410;
    else if (context.query.subcategory === "Аксесуари") id = 420;
    else if (context.query.subcategory === "Аксесуари") id = 430;

    else if (context.query.subcategory === "Наушники") id = 880;
    else if (context.query.subcategory === "Акустичні системи") id = 940;
    else if (context.query.subcategory === "Медіаплеєри") id = 1000;

    const resGoods = await fetch(URLADRESS + `/goods/sub-categories/${id}`);
    const goods = await resGoods.json();

    return {
        props: {
            goods: goods,
            id: id,
            total: goods.total
        }
    };
};

export default React.memo(SubCategoryPage);