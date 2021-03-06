import {useState} from 'react'
import {useEffect,preventDefault} from 'react'
import { bdd } from './firebase';
import './diseño.css';

function App() {
  const [libros, setlibros] = useState([])
  const [autorAux,setautorAux]=useState([])
  const [editorialAux,seteditorialAux]=useState([])
  const [clasificacionAux,setclasificacionAux]=useState([])
  const [idAux,setidAux]=useState([])
  const [tituloAux,settituloAux]=useState([])
  const [modoEditar,setmodoEditar]=useState(false)
  const [id,setid]=useState('')

  const getLibros=async()=>{
    const data=await bdd.collection('Libros').get()
    const librosArray=data.docs.map(doc=>({id:doc.id, ...doc.data()}))
    setlibros(librosArray)
    
  }
  
  useEffect(() => {
    //return () => {  <input type="text" className="form-control" value={libAux} onChange={e=>setLibAux(e.target.value)} placeholder="Ej. Hacer tarea" />
      getLibros()
    //}
  }, [])// eslint-disable-line react-hooks/exhaustive-deps 

  const activarEdicion=(item)=>{
    setmodoEditar(true)
    setautorAux(item.AutorBDD)
    setclasificacionAux(item.ClasificacionBDD)
    seteditorialAux(item.EditorialBDD)
    setidAux(item.IdBDD)
    settituloAux(item.TituloBDD)
    setid(item.id)
  }
  const editarLibro=async(e)=>{
    e.preventDefault()
    const firebaseLibros=await bdd.collection('Libros').doc(id).update({
      AutorBDD:autorAux,
      ClasificacionBDD:clasificacionAux,
      EditorialBDD:editorialAux,
      IdBDD:idAux,
      TituloBDD:tituloAux
      
    })
    getLibros()
    setautorAux("")
    setclasificacionAux("")
    seteditorialAux("")
    setidAux("")
    settituloAux("")
    alert("Libro editado!");
    
  }

  const eliminarLibro = async (id)=>{
    await bdd.collection('Libros').doc(id).delete() 
    alert("Libro eliminado!");
    getLibros()

  }


  const addLibros=async(e)=>{
    e.preventDefault()

    const firebaseLibros=await bdd.collection('Libros').add({
      AutorBDD:autorAux,
      ClasificacionBDD:clasificacionAux,
      EditorialBDD:editorialAux,
      IdBDD:idAux,
      TituloBDD:tituloAux,

    })
    
    const nuevoLibro={
      AutorBDD:autorAux,
      ClasificacionBDD:clasificacionAux,
      EditorialBDD:editorialAux,
      IdBDD:idAux,
      TituloBDD:tituloAux,
    }

    setlibros([...libros,{id: firebaseLibros.id, ...nuevoLibro}])
    setautorAux("")
    setclasificacionAux("")
    seteditorialAux("")
    setidAux("")
    settituloAux("")
    alert("Libro agregado!");
  }

  



  return (
    <div className="container">
      <h1>Hola, Bienvenido a la biblioteca </h1>
      <h2>Estas en modo: {modoEditar?'Editar': 'Agregar'}</h2>
      <h3>El libro que estas ingresando es:  </h3>
      {tituloAux} {autorAux} {clasificacionAux} {editorialAux} {idAux} 
      <form onSubmit={modoEditar ? editarLibro : addLibros }>
          <div className="form-group">
        <label></label> 
        <br></br>
            <p>Titulo del libro: {tituloAux} </p>
            <input type="text" className="form-control" value={tituloAux} onChange={e=>settituloAux(e.target.value)} placeholder="Ej. El libro vaquero" required/> 
            <br></br>
            <p>Autor: {autorAux}</p>
            <input type="text" className="form-control" value={autorAux} onChange={e=>setautorAux(e.target.value)} placeholder="Ej. Oscar Wilde" required/>
            <br></br>
            <p>Clasificacion: {clasificacionAux}</p>
            <input type="text" className="form-control" value={clasificacionAux} onChange={e=>setclasificacionAux(e.target.value)} placeholder="Ej. B" required />
            <br></br>
            <p>Editorial: {editorialAux}</p>
            <input type="text" className="form-control" value={editorialAux} onChange={e=>seteditorialAux(e.target.value)} placeholder="Ej. Editorial Alianza" required/>
            <br></br>
            <p>ID del libro: {idAux}</p>
            <input type="text" className="form-control" value={idAux} onChange={e=>setidAux(e.target.value)} placeholder="Ej. 32424" required/>

          </div>
          { <button type="submit" className="btn btn-success">Agregar Libro</button> }
      </form>  



      <ul>
        Libros:
          {
            libros.map(item=>(
              <li className="list-group-item" key={item.id}>
                <span>{item.AutorBDD+" "}</span>
                <span>{item.EditorialBDD+" "}</span>
                <span>{item.IdBDD+" " }</span>
                <span>{item.TituloBDD+" " }</span>
                <span>{item.ClasificacionBDD+" "}</span>
                <button className="btn btn-danger btn-small float-right"
                onClick={()=>eliminarLibro(item.id)}
                > Eliminar libro </button>
                <button className="btn btn-warning btn-small float-right mr-2" 
                onClick={()=>activarEdicion(item)}> Editar libro 
                </button>
              </li>



            ))


          }
      </ul>
    </div>
  );
}

export default App;
