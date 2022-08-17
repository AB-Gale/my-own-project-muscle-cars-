import React from "react";
import { Container, TextField, Button } from "@mui/material";
import { AdminContext } from "../contexts/AdminProvider";

function AdminAddPage() {
  const { addNewCar } = React.useContext(AdminContext);

  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [year, setYear] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  const handleSubmit = () => {
    const newCar = {
      name: name.trim(),
      brand: brand.trim(),
      price,
      year: year.trim(),
      photo: photo.trim(),
    };
    for (let i in newCar) {
      if (!newCar[i]) {
        alert("Fill the blanks");
        return;
      }
    }
    addNewCar(newCar);
    setName("");
    setBrand("");
    setPrice("");
    setYear("");
    setPhoto("");
  };

  return (
    <div className="admin-add-pages">
      <Container>
        <h2>Add your car</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Model"
            variant="standard"
          />
          <TextField
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            label="Brand"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Price"
            variant="standard"
            type="number"
          />
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Year"
            variant="standard"
            type="date"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Put your picture"
            variant="standard"
          />
          <Button variant="outlined" type="submit">
            Add
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminAddPage;
