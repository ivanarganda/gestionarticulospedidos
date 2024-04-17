import React, { useState, useReducer, useEffect , useContext } from 'react';
import { reducer, initialState } from '../customHooks/useReducer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MsgContext } from '../context/messageContext';

export default function CrearArticulo() {
  const { referencia } = useParams();
  const { useMessage } = useContext(MsgContext);
  const API_ARTICLE = `http://localhost:3000/articulos?id=${referencia}`;
  const API_CREATE_ARTICLE = `http://localhost:3000/articulos`;
  const API_LAST_ID_ARTICLE = `http://localhost:3000/articulos?_sort=id&_order=desc&_limit=1`;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fieldsArticles, setFieldsArticles] = useState({
    id:0,
    referencia: 0,
    nombre: '',
    descripcion: '',
    precioSinImpuestos: 0,
    impuestoAplicable: 0
  });

  const writeMessage = ( message , type ) =>{
    useMessage(message,type,2000,'top','center');
  }

  useEffect(() => {
    axios.get(API_LAST_ID_ARTICLE).then((response) => {
      let zeroSpaces = '0';
      let repeat = 0;
      let id = response.data.length === 0 ? 1 : response.data[0].id + 1;
      console.log( id );
      if ( response.data.length == 0 || id < 10 ){
        repeat = 2;
      } else {
        repeat = 1;
      }
      setFieldsArticles({
        ...fieldsArticles,
        id: id,
        referencia: `${zeroSpaces.repeat(repeat) + parseInt(id)}`
      });
    });
  }, []);

  const onSubmitEditArticle = (event) => {
    event.preventDefault();
    console.log( event.target);

    axios.post(API_CREATE_ARTICLE, fieldsArticles)
      .then(response => {
        console.log('Article created successfully:', response.data);
        writeMessage('Articulo creado correctamente', 'success');
      })
      .catch(error => {
        console.error('Error creating article:', error);
        writeMessage('Error al crear el articulo', 'error');
      });
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === 'precioSinImpuestos' || name === 'impuestoAplicable') {
      setFieldsArticles({ ...fieldsArticles, [name]: parseFloat(value) });
    } else {
      setFieldsArticles({ ...fieldsArticles, [name]: value });
    }

    console.log( fieldsArticles );

  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <legend className="bg-gray-600 p-3 text-white font-bold-400">Articulo {referencia}</legend>
      <br />
      <form key={referencia} className="grid gap-6" onSubmit={onSubmitEditArticle}>
        <div key={referencia} className="space-y-2">
          <label htmlFor="reference">Reference</label>  
          <input disabled id="reference" onChange={handleOnChange} className="bg-gray-200 w-full rounded-md px-4 p-2 outline-none" value={fieldsArticles.referencia} placeholder="Enter the reference" />
        </div>
        <div className="space-y-2">
          <label htmlFor="nombre">Producto</label>
          <input id="nombre" name="nombre" onChange={handleOnChange} className="bg-gray-200 w-full rounded-md px-4 p-2 outline-none" value={fieldsArticles.nombre} placeholder="Example" />
        </div>
        <div className="space-y-2">
          <label htmlFor="descripcion">Descripcion</label>
          <input id="descripcion" name="descripcion" onChange={handleOnChange} className="bg-gray-200 w-full rounded-md px-4 p-2 outline-none" value={fieldsArticles.descripcion} placeholder="Example" />
        </div>
        <div className="space-y-2 space-x-2">
          <label htmlFor="precioSinImpuestos">Price (Excluding Taxes)</label>
          <input id="precioSinImpuestos" name="precioSinImpuestos" onChange={handleOnChange} className="bg-gray-200 w-1/2 rounded-md px-4 p-2 outline-none" value={fieldsArticles.precioSinImpuestos} placeholder="Enter the price" type="number" />
        </div>
        <div className="space-y-2 space-x-2">
          <label htmlFor="impuestoAplicable">IVA</label>
          <input id="impuestoAplicable" name="impuestoAplicable" onChange={handleOnChange} className="bg-gray-200 w-1/2 rounded-md px-4 p-2 outline-none" value={fieldsArticles.impuestoAplicable} placeholder="Enter the percentage" type="number" />%
        </div>
        <button className="w-full bg-black text-white p-2" type="submit">
          Crear
        </button>
      </form>
    </div>
  );
}
