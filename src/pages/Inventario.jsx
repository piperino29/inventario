import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Button, Input } from "reactstrap";
import { useUbicacion } from "../hooks/useFetch";
import Tabla from "../components/Tabla";
import { Container } from "@mui/system";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const { data, loading, error, fetchUbicacion } = useUbicacion();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '2323') {
      setIsAuthenticated(true);
    } else {
      alert('Clave incorrecta');
    }
  };

  const handleUbicacionSubmit = async (e) => {
    e.preventDefault();
    fetchUbicacion(ubicacion);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{"Ingrese Clave de Acceso"} </Typography><br/>
        <form onSubmit={handlePasswordSubmit}>
          <Input 
            type="password" 
            placeholder="Ingrese Clave" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          /><br/>
          <Button type="submit" color="primary" outline> Ingresar </Button>
        </form>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
    <Container maxWidth="xl">
    <Typography variant="h4" sx={{ fontWeight: 'bold' }}> {"Inventario"}
    </Typography>
      <Grid container spacing={1} sx={{ py: 1 }}>
        <Grid item xs={12} sm={12} md={12}>
            <Tabla></Tabla>
        </Grid>
      </Grid>
    </Container>
  </Box>

  );
};

export default Home;
