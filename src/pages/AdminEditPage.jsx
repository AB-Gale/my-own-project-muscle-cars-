import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";
import { Container, TextField, Button } from "@mui/material";

function AdminEditPage() {
  const { getCarsEdit, carsEdit, saveEditCars } =
    React.useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setModel] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [year, setYear] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  const handleSubmit = () => {
    const editedCars = {
      name,
      brand,
      price,
      year,
      photo,
      id,
    };
    for (let i in editedCars) {
      if (typeof editedCars[i] === "string") {
        if (!editedCars[i].trim()) {
          alert("Fill the blanks!");
          return;
        }
      }
    }
    saveEditCars(editedCars);
    navigate("/admin");
  };

  React.useEffect(() => {
    getCarsEdit(id);
  }, []);

  React.useEffect(() => {
    if (carsEdit) {
      setModel(carsEdit.name);
      setBrand(carsEdit.Brand);
      setPrice(carsEdit.price);
      setYear(carsEdit.year);
      setPhoto(carsEdit.photo);
    }
  }, [carsEdit]);

  return (
    <div className="admin-edit-pages">
      <Container>
        <h2>Edit</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setModel(e.target.value)}
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
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            variant="standard"
            type="number"
          />
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            variant="standard"
            type="date"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Picture"
            variant="standard"
          />
          <Button variant="outlined" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminEditPage;
