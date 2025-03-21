import { useCallback, useEffect, useRef } from "react";

import {Pagination, Categories, Skeleton, Sort, PizzaBlock} from "../components";

import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { selectPizzaData } from "../redux/pizza/selectors";
import { selectFilter } from "../redux/filter/selectors";
import { Status } from "../redux/pizza/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);

  // динамический импорт делим на чанки
  // import("../utils/math").then((math) => {
  //   console.log(math.add(16, 26));
  // });

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  // useCallback помогает избежать перерисовки
  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      //@ts-ignore
      const sort = sortList.find(
        (obj: any) => obj.sortProperty == params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    getPizzas();
    // перекидывает вверх чтобы не скролить
    window.scrollTo(0, 0);

    if (isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === Status.ERROR ? (
        <div className="cart cart--empty">
          <h2>
            Произошла ошибка <span>😒</span>
          </h2>
          <p>
            К сожалению не удалось получить пиццы.
            <br />
            Попробуйте повторить позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === Status.LOADING ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
