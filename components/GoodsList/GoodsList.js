import HeaderSelectorToFilter from '../SelectorInHeadInGoodPage/SelectorInHeadInGoodPage';
import GoodCardSmall from '../GoodCardSmall/GoodCardSmall';
import AsideFilter from '../AsideFilter/AsideFilter';
import React from 'react';
import PageIndexer from '../PageIndexer/PageIndexer';
import { useState, useEffect } from 'react';
import GetFilteredData from '@/pages/api/GetFilteredData';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import GetSearchResultInPage from '@/pages/api/GetSearchResultInPage';
import { setSearchTotalResult } from '@/slices/userSlice';


function GoodsList({ props, id, total }) {
    const [listGoods, setListGoods] = useState(props.items);  /// Отримує список товарів з бекенду ///
    const [selectedFilterOption, setSelectedFilterOption] = useState("Новинки"); /// Встановлює опцію сортування (Новинки Від Від) ///
    const [activePage, setActivePage] = useState(1); /// Встановлює активну сторінку перегляду знизу ///
    const [totalItems, setTotalItems] = useState(); /// Отримує загальну кількість одиниць товарів ///

    const [prciseStart, setPriceStart] = useState(''); /// Встановлює значення в полі ВІД e aside фільтрі ///
    const [prciseEnd, setPriceEnd] = useState('');  /// Встановлює значення в полі ДО e aside фільтрі ///
    const [brandsToFilter, setBrandsTofilter] = useState([]); /// Отримує список брендів з бекенду ///
    const [isAvailabale, setIsAvailabale] = useState(false); /// Встановлює опцію фільтрування "Є в наявності"///
    const [sortIndex, setSortIndex] = useState(0); /// Встановлює сортування (-1, 1, 0)///
    const [pageLoaded, setPageLoaded] = useState(false); /// Запобігає зайвому запуску функції ///


    const objToAsideFilter = { setIsAvailabale, setPriceStart, setPriceEnd, setBrandsTofilter, brandsToFilter, applyChangesAsideFilter, prciseEnd, prciseStart, isAvailabale, };

    const router = useRouter();
    const dispatch = useDispatch();
    const subCategoryName = router.query.subcategory;
    const { searchPhrase } = useSelector((state) => state.user);
    const { searchActive } = useSelector((state) => state.user);



    async function getFilteredDataMinMax() {
        const { result } = await GetFilteredData(id, sortIndex, activePage === 1 ? 0 : activePage - 1,
            prciseStart, prciseEnd, brandsToFilter, isAvailabale, subCategoryName);
        setTotalItems(result.total)
        setListGoods(result.data);
    };



    async function getFilteredDataInSearchPage() {
        const { result } = await GetSearchResultInPage(searchPhrase, activePage === 1 ? 0 : activePage - 1,
            sortIndex, prciseStart.length !== 0 ? prciseStart : null,
            prciseEnd.length !== 0 ? prciseEnd : null, brandsToFilter, isAvailabale);
        dispatch(setSearchTotalResult(result.total));
        setTotalItems(result.total);
        setListGoods(result.data);
    }

    function selectPageAndGetData() {
        if (router.pathname !== "/searchresultpage") {
            getFilteredDataMinMax();
        }
        else getFilteredDataInSearchPage();
    }

    useEffect(() => {

        if (router.pathname === "/searchresultpage" && pageLoaded) {

            setPriceStart("");
            setPriceEnd("");
            setBrandsTofilter([]);
            setIsAvailabale(false);
            setSortIndex(0);
            setActivePage(1);
            setSelectedFilterOption("Новинки");

            async function getFilteredDataInSearchPage() {
                const { result } = await GetSearchResultInPage(searchPhrase, 0, 0,
                    null, null, []);
                setTotalItems(result.total)
                setListGoods(result.data);
            };
            getFilteredDataInSearchPage();
        }
    }, [searchActive])


    useEffect(() => {
        if (pageLoaded) {
            if (router.pathname !== "/searchresultpage") {
                getFilteredDataMinMax();
            } else getFilteredDataInSearchPage();

        } else {
            setPageLoaded(true);
        }
    }, [selectedFilterOption, activePage]);


    function applyChangesAsideFilter() {
        if (activePage === 1) {
            if (router.pathname !== "/searchresultpage") {
                getFilteredDataMinMax();
            } else getFilteredDataInSearchPage();
        } else setActivePage(1);
    }


    return (
        <div className='goods-list'>
            {listGoods && listGoods.length ?
                <>
                    <HeaderSelectorToFilter setSelectedFilterOption={setSelectedFilterOption} selectedFilterOption={selectedFilterOption} setActivePage={setActivePage} setSortIndex={setSortIndex} total={total} />
                    <div className="goods-list-render">
                        <AsideFilter id={id} objToAsideFilter={objToAsideFilter} />
                        <div className="goods-list-goods-items">
                            {listGoods.map(props => {
                                return (
                                    <GoodCardSmall key={props.id} props={props} listGoods={listGoods} />
                                );
                            })}
                        </div>
                    </div>
                    <PageIndexer total={total} setActivePage={setActivePage} activePage={activePage} totalItems={totalItems} sortIndex={sortIndex} selectPageAndGetData={selectPageAndGetData} />
                </> : null}
        </div>
    )
};

export default React.memo(GoodsList);


