import { Box, Grid, Typography, Modal, Button as MuiButton } from "@mui/material";
import { useState } from "react";
import { Input, Label, Button as ReactstrapButton } from "reactstrap";
import { useUbicacion, useGetProduct, useInsertInv } from "../hooks/useFetch";

const Home = () => {
  const [ubicacion, setUbicacion] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const { data, loading, error, fetchUbicacion } = useUbicacion();
  const { productData, loadingProducto, errorProducto, fetchProducto } = useGetProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchUbicacion(ubicacion);
    setOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const idUbi = data.id;
    const idProduct = productData.id;
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const day = String(fecha.getDate()).padStart(2, '0');
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}${month}${day} ${hours}:${minutes}`;

    console.log(idUbi, idProduct, formattedDate, cantidad);
    const result = await useInsertInv(idUbi, idProduct, formattedDate, cantidad);
    if (result === "ok") {
      window.alert("Inventario grabado");
      handleClose(); // Cierra el modal si la inserción es exitosa
    } else {
      window.alert("No se guardó, lo siento");
    }
    setLoad(false);
  };

  const handleClose = () => {
    setUbicacion('');
    setProducto('');
    setCantidad('');
    setOpen(false);
  };

  const handleChange = async (e) => {
    setLoad(true);
    const producto = e.target.value;
    const lpn = "LPN";
    if (producto.includes(lpn)) {
      setCantidad(1);
      const idUbi = data.id;
      const idProduct = productData.id;
      const fecha = new Date();
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
      const day = String(fecha.getDate()).padStart(2, '0');
      const hours = String(fecha.getHours()).padStart(2, '0');
      const minutes = String(fecha.getMinutes()).padStart(2, '0');
      const formattedDate = `${year}${month}${day} ${hours}:${minutes}`;

      console.log(idUbi, idProduct, formattedDate, cantidad);
      const result = await useInsertInv(idUbi, idProduct, formattedDate, cantidad);
      if (result === "ok") {
        window.alert("Inventario grabado");
        handleClose(); // Cierra el modal si la inserción es exitosa
      } else {
        window.alert("No se guardó, lo siento");
      }
    } else {
      await fetchProducto(data?.id, producto);
      setLoad(true);
      if (loadingProducto) {
        console.log(productData);
      } else {
        console.log("holi");
      }
    }
  };

  return (
    <Box sx={{ 
      position: 'absolute', 
      top: '15%', 
      left: '1%', 
      width: '98%', 
      p: 2 
    }}>
      <Grid item xs={10} sm={6} md={4}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{"Ubicación"} </Typography><br/>
          <Input 
            type="text" 
            placeholder="Ingrese Ubicación" 
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)} 
          /><br/>
          <ReactstrapButton type="submit" color="primary" outline> Cargar </ReactstrapButton>
        </form>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            maxWidth: '100%', 
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: { xs: 2, sm: 4 }, 
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Ubicación
          </Typography>
          <Typography id="modal-description" >
            <Input value={ubicacion} readOnly/>
          </Typography>
          <Input 
            type="text" 
            placeholder="Ingrese Producto" 
            name="Produc"
            value={producto}
            onChange={(e) => {
              setProducto(e.target.value);
              handleChange(e);
            }}
          />
          {
            load ? (
              <Input value={productData?.descrip} readOnly/>
            ):(
              <></>
            )
          }
          
          <Input 
            type="text" 
            placeholder="Ingrese Cantidad" 
            name="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)} 
          />
          <MuiButton onClick={handleProductSubmit} color="primary" variant="contained" size="small" sx={{ m: 2 }}>
            Cargar
          </MuiButton>
          <MuiButton onClick={handleClose} color="error" variant="contained" size="small" >
            Cerrar
          </MuiButton>
      
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
