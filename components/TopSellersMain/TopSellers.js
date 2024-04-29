import GoodCardSmall from '../GoodCardSmall/GoodCardSmall';
import React from 'react';


function TopSellers({ props }) {
    // console.log(props.items)
    return (
        <>
            <h4 className='top-sellers-title title'>Топ продажів</h4>
            <div className="top-sellers-row">
                {!!props.items.length && props.items.map(props => {
                    return (
                        <GoodCardSmall key={props.id} props={props} />
                    );
                })}
            </div>
        </>
    );
};

export default React.memo(TopSellers);