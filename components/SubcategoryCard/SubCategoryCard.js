import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


function SubCategotyCard({ subCategories }) {
    const category = subCategories.parent;
    const subcategory = subCategories.name;
    return (
        <Link key={subCategories.id} className="main-categories-row-two" href="/[category]/[subcategory]" as={`/${category}/${subcategory}`}>
            <div className="image-container">
                <Image
                    alt="image of computer"
                    src={subCategories.photo_preview}
                    sizes="(max-width: 100%)"
                    quality={100}
                    fill
                    style={{
                        objectFit: 'contain',
                        width: '100%'

                    }}
                />
            </div>
            <p className='main-item-title'>{subCategories.name}</p>
        </Link>
    )
};

export default React.memo(SubCategotyCard);

