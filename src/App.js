import {useState} from 'react'
import {useEffect,preventDefault} from 'react'
import { bdd } from './firebase';

function App() {
  const [libros, setlibros] = useState([])
  const [libAux,setLibAux]=useState([])

  const getLibros=async()=>{
    const data=await bdd.collection('Libros').get()
    const librosArray=data.docs.map(doc=>({id:doc.id, ...doc.data()}))
    setlibros(librosArray)
    console.log(librosArray)
  }
  
  useEffect(() => {
    //return () => {
      getLibros()
    //}
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const addLibros=async(e)=>{
    e.preventDefault();

    const firebaseLibros=await bdd.collection('Libros').add({
      :libAux
    })


  }

  return (
    <div className="container">
      <h1>Hola mundo</h1>
      {libAux}
      <form onSubmit={addLibros }>
          <div className="form-group">
        <label></label>
            <input type="text" className="form-control" value={libAux} onChange={e=>setLibAux(e.target.value)} placeholder="Ej. Hacer tarea" />
          </div>
          { <button type="submit" className="btn btn-success">Agregar</button> }
      </form>  



      <ul>
        Libros:
          {
            libros.map(item=>(
              <li className="list-group-item" key={item.id}>
                <span>{item.AutorBDD}</span>
                <span>{item.EditorialBDD}</span>
                <span>{item.IdBDD}</span>
                <span>{item.TituloBDD}</span>
                <span>{item.ClasificacionBDD}</span>
                <button className="btn btn-danger btn-small float-right"> Eliminar libro </button>
                <button className="btn btn-warning btn-small float-right mr-2"> Editar libro </button>
              </li>



            ))


          }
      </ul>
    </div>
  );
}

export default App;
