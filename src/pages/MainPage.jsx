import React from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";

function MainPage() {
  const {
    getCars,
    cars,
    minMax,
    setFilterByPrice,
    filterByPrice,
    setCurrentPage,
    currentPage,
    pagesCount,
    addCarsToBasket,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getCars();
  }, [filterByPrice, currentPage]);

  return (
    <div className="main-page">
      <Container>
        <h2>Catalogue</h2>
        <div className="filter-block">
          <h4>Filtration by price</h4>
          <Slider
            sx={{
              width: 300  ,
              color: "black",
            }}
            max={minMax[1]}
            min={minMax[0]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(e, newValue) => setFilterByPrice(newValue)}
          />
        </div>
        <div className="products">
          {cars.map((item) => (
            <Card key={item.id} className="product-card">
              <CardMedia component="img" height={160} image={item.photo} />
              <CardContent>
                <Typography
                  className="product-card-title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.name}
                </Typography>
                <ul className="products-card-ul">
                  <li>
                    <span>Model:</span>
                    <span>{item.brand}</span>
                  </li>
                  <li>
                    <span>Price: </span>
                    <span>{item.price} $</span>
                  </li>
                  <li>
                    <span>Release date:</span>
                    <span>{item.year}</span>
                  </li>
                </ul>
                <Button
                  onClick={() => addCarsToBasket(item)}
                  variant="outlined"
                >
                  Add this baby
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            count={pagesCount}
            variant="outlined"
            shape="rounded"
            onChange={(_, newValue) => setCurrentPage(newValue)}
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
