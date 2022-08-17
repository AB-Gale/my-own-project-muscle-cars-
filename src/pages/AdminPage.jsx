import React from "react";

import { AdminContext } from "../contexts/AdminProvider";
import { DeleteSweep, DriveFileRenameOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function AdminPage() {
  const { cars, getCars, deleteCars } = React.useContext(AdminContext);

  React.useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="admin-pages">
      <Container>
        <h2>Admin panel</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Picture</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((item, index) => (
              <TableRow key={item.id + "phones"}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>
                  <img width={100} src={item.photo} alt="" />
                </TableCell>
                <TableCell>
                  <DeleteSweep onClick={() => deleteCars(item.id)} />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <DriveFileRenameOutline />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPage;
