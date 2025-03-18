import { Link } from "react-router-dom";
import cartEmptyImg from "../assets/img/cart-empty.png";

const CartEmpty = () => {
  return (
   
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😒</span>
        </h2>
        <p>
          Вероятнее всего, вы не еще заказывали пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartEmptyImg} alt="" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
  
  );
};

export default CartEmpty;
