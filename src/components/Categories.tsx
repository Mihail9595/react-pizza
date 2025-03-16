
import { memo } from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = memo( ({ value, onChangeCategory }) => {
  

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? "active" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
