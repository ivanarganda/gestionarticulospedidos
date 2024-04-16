import React, { useReducer , useEffect } from 'react'
import { reducer , initialState } from '../customHooks/useReducer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function VerArticulo() {
  const { referencia } = useParams();
  const API_ARTICLE = `http://localhost:3000/articulos?referencia=${referencia}`;
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
      axios.get(API_ARTICLE).then((response) => {
          dispatch({ type: 'FETCH_ARTICLE', payload: response.data });
      });
  }, []);

  console.log( state.articles );

  return (
    <section className="p-4">
      <div className="max-w-4xl mx-auto">
        
        {
          state.article.map((articulo) => {
            return (
              <ul className="bg-gray-200 p-4 rounded-md">
                <li className="border-b border-gray-400 py-2">
                  <span className="font-bold">ID: </span>
                  {articulo.referencia}{"\n                  "}
                </li>
                <li className="border-b border-gray-400 py-2">
                  <span className="font-bold">Producto: </span>
                  {articulo.nombre}{"\n                  "}
                </li>
                <li className="py-2">
                <span className="font-bold">Descripcion: </span>
                  {articulo.descripcion}{"\n                  "}
                </li>
                <li className="py-2">
                <span className="font-bold">Precio sin impuesto: </span>
                  {articulo.precioSinImpuestos} € {"\n                  "}
                </li>
                <li className="py-2">
                <span className="font-bold">Impuesto aplicable: </span>
                  {articulo.impuestoAplicable * 100}%{"\n                  "}
                </li>    
              </ul>
            )
          })
        }
      </div>
    </section>
  )
}
