import { URLADRESS } from '@/components/Constants';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SubcategoriesInCatPage from '@/components/SubCategoriesInCategoryPage/SubCategoriesInCategoryPage';
import BreadCrumps from '@/components/Breadcrumps/Breadcrumps';
import GoodsList from '@/components/GoodsList/GoodsList';
import Head from 'next/head';
import React from 'react';
import EmptyCategorie from '@/components/EmptyCategotie/EmptyCategorie';



function CategoryPage({ subCategories, goods, id, total }) {
    console.log(goods.items.length)
    return (
        <>
            <Head>
                <title>MarketHub - знайденться все!</title>
                <link rel="icon" href="/frame380.png" sizes="any" />
                <meta name='MarketHub' content='MarketHub - тут може бути Ваша реклама' />
            </Head>
            <div className='category-page'>
                <Header />
                <div className="category-main-content">
                    <BreadCrumps id={id} />
                    {goods.items.length === 0 ? <EmptyCategorie /> : (
                        <>
                            <div className="subcategories-row">
                                <SubcategoriesInCatPage subCategories={subCategories} />
                            </div>
                            <GoodsList props={goods} id={id} total={total} />
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
export async function getServerSideProps(context) {

    let id;
    if (context.query.category === "Комп’ютерна техніка") id = 100;
    else if (context.query.category === "Мобільні телефони") id = 175;
    else if (context.query.category === "Побутова техніка") id = 250;
    else if (context.query.category === "Ігрові приставки") id = 325;
    else if (context.query.category === "Аудіотехніка") id = 400;


    const res = await fetch(URLADRESS + `/categories/${id}/sub-categories`);
    const subCategories = await res.json();

    const resGoods = await fetch(URLADRESS + `/goods/categories/${id}?size=12`);
    const goods = await resGoods.json();

    // console.log(goods)
    return {
        props: {
            subCategories,
            goods: goods,
            id: id,
            total: goods.total
        }
    };
};
export default React.memo(CategoryPage);