import { useState, useCallback, useEffect } from "react";

export const useUbicacion = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUbicacion = useCallback(async (codigo) => {
    setLoading(true);
    setError(null);

    const myheader = new Headers();
    myheader.append("Content-type", "application/json");

    const raw = JSON.stringify({ DESCRIP: codigo });
    const urlApi = "{direccion de servicio}";
    const requestOptions = {
      method: "POST",
      headers: myheader,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(urlApi, requestOptions);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchUbicacion };
};

export const useGetProduct = () => {
  const [productData, setProductData] = useState(null);
  const [loadingProducto, setLoadingProducto] = useState(false);
  const [errorProducto, setErrorProducto] = useState(null);

  const fetchProducto = useCallback(async (idUbicacion, codigo) => {
    setLoadingProducto(true);
    setErrorProducto(null);

    const headers = new Headers();
    headers.append("Content-type", "application/json");

    const raw = JSON.stringify({
      id: idUbicacion,
      codigo,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
      redirect: "follow",
    };

    const url = "{direccion de servicio}";

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      setProductData(result);
    } catch (error) {
      setErrorProducto(error.toString());
    } finally {
      setLoadingProducto(false);
    }
  }, []);

  return { productData, loadingProducto, errorProducto, fetchProducto };
};

export const useInsertInv = async (idubi, idProduct, fecha, cantidad) => {
  const headers = new Headers();
  headers.append("Content-type", "application/json");

  const raw = JSON.stringify({
    idUbicacion: idubi,
    idProducto: idProduct,
    fecha,
    cantidad,
  });
  console.log("el raw es lo siguiente", raw);

  const requestOptions = {
    method: "POST",
    headers,
    body: raw,
    redirect: "follow",
  };

  console.log(requestOptions);

  const url = "{direccion de servicio}";
  try {
    const response = await fetch(url, requestOptions);
    console.log(response);
    if (response.status === 200) {
      return "ok";
    } else {
      return "nop uwu";
    }
  } catch (error) {
    console.log(error.toString());
  }
};

export const useInventario = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlApi = "{direccion de servicio}";
  const user = "user";
  const pass = "@user";
  const base64Credentials = btoa(`${user}:${pass}`);

  const headers = new Headers();
  headers.append("Authorization", `Basic ${base64Credentials}`);
  headers.append("Content-Type", "application/json"); // Asegúrate de enviar los headers correctos

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(urlApi, {
        headers,
        method: "POST", // Cambia a POST
      });

      const json = await res.json();
      setData(json); // Almacena los datos obtenidos en el estado
    } catch (error) {
      setError(error.message);
      setData([]); // Puedes establecer un valor predeterminado en caso de error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000); // Intervalo de 10 minutos para refrescar los datos
    return () => clearInterval(fetchDataInterval);
  }, [fetchData]);

  return { data, loading, error };
};
