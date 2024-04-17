import TableArticles from "./components/TableArticles"
import { BrowserRouter as Router, Routes, Route , Navigate, Link } from 'react-router-dom';
import VerArticulo from "./components/VerArticulo";
import EditarArticulo from "./components/EditarArticulo";
import TableBudgets from "./components/TableBudgets";
import Header from "./components/Header";
import CrearPedido from "./components/CrearPedido";
import Snackbar_ from "./components/Snackbar"; 
import EditarPedido from "./components/EditarPedido";
import CrearArticulo from "./components/CrearArticulo";
function App() {

  return (
    <>
      <Router basename="/">
          <Header /> 
          <Routes>  
            <Route exact path="/" element={<TableArticles />} />
            <Route exact path="/crear-pedido" element={<CrearPedido />} />
            <Route exact path="/crear-articulo" element={<CrearArticulo />} />
            <Route exact path='/editar-pedido/:id' element={<EditarPedido />} />
            <Route exact path='/listar-pedidos' element={<TableBudgets />} />
            <Route exact path='/listar-articulos' element={<TableArticles />} />
            <Route exact path='/ver-articulo/:referencia' element={<VerArticulo />} />
            <Route exact path='/editar-articulo/:referencia' element={<EditarArticulo />} />   
          </Routes>
      </Router>
      <Snackbar_ />  
    </>
  )
}

export default App
