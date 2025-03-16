import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://67b9793c51192bd378dd8544.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container full-pizza">
      <img width={300} height={300} src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
