import {useState} from 'react'
import {useEffect} from 'react'
import { bdd } from './firebase';

function App() {
  const [libros, setlibros] = useState([])

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
  }, [])

  return (
    <div >
      <h1>Hola mundo</h1>
      <ul>
          {
            libros.map(item=>(
              <li className="list-group-item" key={item.id}>
                <span>{item.AutorBDD}</span>
                <span>{item.EditorialBDD}</span>
                <span>{item.FechaPBDD}</span>
                <span>{item.TituloBDD}</span>
              </li>



            ))


          }
      </ul>
    </div>
  );
}

export default App;
