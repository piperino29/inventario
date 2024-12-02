import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material';
import { useInventario } from '../hooks/useFetch';

const InventarioTable = () => {
  const { data, loading, error } = useInventario();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 12,
      fontWeight: "bolder",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      fontWeight: "bolder",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Ubicación</StyledTableCell>
              <StyledTableCell align="center">Descripción</StyledTableCell>
              <StyledTableCell align="center">SKU</StyledTableCell>
              <StyledTableCell align="center">LPN</StyledTableCell>
              <StyledTableCell align="center">Fecha Inventario</StyledTableCell>
              <StyledTableCell align="center">Cantidad</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <StyledTableCell align="center">{item.Ubicacion}</StyledTableCell>
                <StyledTableCell align="center">{item.descrip}</StyledTableCell>
                <StyledTableCell align="center">{item.sku}</StyledTableCell>
                <StyledTableCell align="center">{item.Lpn}</StyledTableCell>
                <StyledTableCell align="center">{new Date(item["Fecha Inventario"]).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="center">{item.inv_cantidad}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Box>
  );
};

export default InventarioTable;
