import React from "react";
import { ClientContext } from "../contexts/ClientProvider";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

function Basket() {
  const { getCarsFromBasket, basketCars } = React.useContext(ClientContext);

  React.useEffect(() => {
    getCarsFromBasket();
  }, []);

  if (!basketCars) {
    return (
      <div className="basket-page">
        <Container>
          <h2>Basket is empty for now</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="basket-page">
      <Container>
        <h2>Basket</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Model:</TableCell>
              <TableCell>Photo:</TableCell>
              <TableCell>Price:</TableCell>
              <TableCell>Count:</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketCars.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img width={80} src={item.photo} alt="" />
                </TableCell>
                <TableCell>{item.price} $</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.subPrice} $</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Price:</TableCell>
              <TableCell colSpan={1}>{basketCars.totalPrice} $</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default Basket;
