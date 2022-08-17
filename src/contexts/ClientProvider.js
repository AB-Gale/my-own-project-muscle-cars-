import React from "react";
import { carsApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_CARS") {
    return {
      ...state,
      cars: action.payload,
    };
  } else if (action.type === "GET_CARS_FROM_BASKET") {
    return {
      ...state,
      basketCars: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    cars: [],
    basketCars: {
      products: [],
      totalPrice: 0,
    },
  });

  const [searcWord, setSearchWord] = React.useState("");
  const [filterByPrice, setFilterByPrice] = React.useState([0, 500000]);
  const [minMax, setMinMax] = React.useState([0, 500000]);
  const limit = 3;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getCars = () => {
    fetch(
      `${carsApi}?q=${searcWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_CARS",
          payload: data,
        };
        dispatch(action);
      });
  };

  const getPrices = () => {
    fetch(carsApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setMinMax([min, max]);
        setFilterByPrice([min, max]);
      });
  };

  // ! Basket

  const addCarsToBasket = (car) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let carToBasket = {
      ...car,
      count: 1,
      subPrice: car.price,
    };

    let check = basket.products.find((item) => {
      return item.id == -carToBasket.id;
    });
    if (check) {
      basket.products = basket.products.map((item) => {
        if (item.id === carToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(carToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
  };

  const getCarsFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_CARS_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  const data = {
    cars: state.cars,
    basketCars: state.basketCars,
    minMax,
    currentPage,
    pagesCount,
    getCars,
    getPrices,
    setFilterByPrice,
    filterByPrice,
    setCurrentPage,
    addCarsToBasket,
    getCarsFromBasket,
    setSearchWord,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
