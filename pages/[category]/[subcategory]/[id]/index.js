// import Link from "next/link";
import Head from "next/head";
import GoodCard from '@/components/GoodCard/GoodCard';
import React from 'react';
// import BreadCrumps from '@/components/Breadcrumps/Breadcrumps';
import { URLADRESS } from "../../../../components/Constants"


function ProductPage({ good, breadCrumpData }) {
    return (
        <>
            <Head>
                <title>MarketHub - знайденться все!</title>
                <link rel="icon" href="/frame380.png" sizes="any" />
                <meta name='MarketHub' content='MarketHub - тут може бути Ваша реклама' />
            </Head>
            <div className='wrapper'>
                <div>
                    <GoodCard props={good} breadCrumpData={breadCrumpData} />
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    let id = context.query.id

    const resGoods = await fetch(URLADRESS + `/goods/${id}`);
    const good = await resGoods.json();
    // console.log(good)

    const breadCrumpData = {
        category: good.category_details.name,
        subcategory: good.sub_category_details.name,
        title: good.name,
        id: good.id,
        available: good.available
    };

    return {
        props: {
            good,
            breadCrumpData
        }
    };
};

export default React.memo(ProductPage);
