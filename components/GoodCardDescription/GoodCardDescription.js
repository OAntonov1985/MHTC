import Image from 'next/image';
import formattedPrice from '../HelperFunctions/FormattedPrice';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFavorite, setUserBasket } from '@/slices/userSlice';




function GoodCardDescription({ props, breadCrumpData }) {

    const { title, description, price, thumbnail, available } = props;
    const { id } = breadCrumpData;
    const dispatch = useDispatch();
    const { userFavorite } = useSelector((state) => state.user);
    const arrayIndex = userFavorite.findIndex(item => {
        return item.id === id
    });



    // const formattedDescription = description.map(sentence => `<p class="description_par">${sentence}</p>`).join('\n');

    const addGoodToBasket = () => {
        if (available) {
            dispatch(setUserBasket(
                {
                    id: id,
                    title: title,
                    price: price,
                    thumbnail: thumbnail,
                    number: 1,
                    totalPrice: price
                }
            ));
        }
    };

    function addGoodToFavorite() {
        dispatch(setUserFavorite(
            {
                id: id,
                title: title,
                price: price,
                thumbnail: thumbnail,
                number: 1,
                available: available
            }
        ))
    }

    return (
        <div className="good-card-right-column">
            <h4 className='good-card-title'>{title}</h4>
            <div className='good-card-tech-info'>
                <p className="good-card-number">Код товару: {id}</p>
                <p className={`top-sellers-availability ${available ? "" : "sail-prise"}`}>{available ? "Є в  наявності" : "Немає в наявності"}</p>
            </div>
            <div className="good-card-description">
                <p className='description-title'>Опис товару</p>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <p className='good-card-price'>{formattedPrice(price)} грн</p>
            <div className='godd-card-added'>
                <button className='good-card-buy-good'
                    onClick={addGoodToBasket}>Додати до кошика
                    <div className='good-card-logo-container'>
                        <Image
                            alt="image of basket logo"
                            src="/basket.svg"
                            quality={100}
                            fill
                            sizes="(max-width: 100%)"
                            style={{
                                objectFit: 'contain',
                                width: '100%'
                            }}
                        />
                    </div>
                </button>
                <button className='good-card-add-to-favorite' onClick={addGoodToFavorite}>{arrayIndex === -1 ? "Додати до улюбленого" : "Видалити з улюбленого"}
                    <div className='good-card-logo-container'>
                        <Image
                            alt="image of basket heart"
                            src="/heardlogo.svg"
                            quality={100}
                            fill
                            sizes="(max-width: 100%)"
                            style={{
                                objectFit: 'contain',
                                width: '100%'
                            }}
                        />
                    </div>
                </button>
            </div>
        </div>
    )
};

export default React.memo(GoodCardDescription);