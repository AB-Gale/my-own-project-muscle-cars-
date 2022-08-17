import React from "react";
import { carsApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_CARS") {
    return {
      ...state,
      cars: action.payload,
    };
  } else if (action.type === "GET_CARS_EDIT") {
    return {
      ...state,
      carsToEdit: action.payload,
    };
  }
  return {
    ...state,
  };
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    cars: [],
    carsToEdit: null,
  });

  const addNewCar = (newCar) => {
    console.log(newCar);
    fetch(carsApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    });
  };

  // ! UPDATE

  const getCars = () => {
    fetch(carsApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_CARS",
          payload: data,
        };
        dispatch(action);
      });
  };

  const deleteCars = (id) => {
    fetch(`${carsApi}/${id}`, {
      method: "DELETE",
    }).then(() => getCars());
  };

  const getCarsEdit = (id) => {
    fetch(`${carsApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_CARS_EDIT",
          paylaod: data,
        };
        dispatch(action);
      });
  };

  const saveEditCars = (editedCars) => {
    fetch(`${carsApi}/${editedCars.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCars),
    });
  };

  const data = {
    cars: state.cars,
    carsToEdit: state.carsToEdit,
    addNewCar,
    getCars,
    deleteCars,
    getCarsEdit,
    saveEditCars,
  };

  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
