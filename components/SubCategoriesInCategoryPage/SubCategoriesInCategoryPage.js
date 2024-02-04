import Image from 'next/image';
import SubCategotyCard from '../SubcategoryCard/SubCategoryCard';
import React from 'react';


function SubcategoriesInCatPage({ subCategories }) {
    // console.log(subCategories)
    return (
        <div className='second-row second-row-modify'>
            {!!subCategories.length && subCategories.map(subCategories => {
                return (
                    <SubCategotyCard key={subCategories.id} subCategories={subCategories} />
                )
            })}
        </div>
    )


};

export default React.memo(SubcategoriesInCatPage);

