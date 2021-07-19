import './App.css'
import React,{useState} from 'react'


const Elemento = (props)=>{
  const {texto,tipo} = props
  return(
    <>
      <p>{texto}</p>
    </>
  )
}
const Ticket = (props)=>{
  const {lineas} = props
  return(
    <div className='ticket'>
      Ticket:
      {lineas}
    </div>
  )
}

function App() {
  const [elementos,setElementos] = useState([])
  const [te,setText] = useState(null)
  const [ticket,setTicket] = useState(null)
  const [tipoImpuesto,setTipo] = useState(1)

  const valorImpuestos = {1:0.1,2:0,3:0.05}

  const calcularFactura = ()=>{
    let lineas = []
    let totalImpuestos = 0.0
    let total = 0.0
    elementos.forEach((item, i) => {

      let itemText = item.props.texto
      let numeroProducto = parseInt(itemText.charAt(0))
      if ( !isNaN(numeroProducto) ){
        let tipoI = item.props.tipo
        let importeImpuesto = 0.0
        let inicioPrecio = itemText.lastIndexOf('a')+1
        let finPrecio = itemText.indexOf('€')
        if (finPrecio === -1){
          finPrecio = itemText.length;
        }
        let precio = itemText.substring(inicioPrecio, finPrecio)
        precio = precio.replace(',','.')
        precio = parseFloat(precio)

        importeImpuesto = precio*valorImpuestos[tipoI]
        if(tipoI == 3){
          importeImpuesto = precio*0.05 + precio*0.1
        }
        else if (tipoI == 4){
          importeImpuesto = precio*0.05
        }

        importeImpuesto = Math.round((importeImpuesto+Number.EPSILON)*100)/100

        precio += importeImpuesto
        precio = Math.round((precio+Number.EPSILON)*100)/100
        totalImpuestos += importeImpuesto
        total += precio
        let nuevoTexto = itemText.substring(0,itemText.lastIndexOf('a')-1)+': '+precio+' €';
        lineas.push(<Elemento key={item.key} texto={nuevoTexto} />)
      }
    })
    if (lineas !== []){
      let textoImpuestos = 'Impuestos sobre las ventas: '+totalImpuestos+' €'
      let textoTotal = 'Total: '+total+' €'
      lineas.push(<Elemento key={lineas.length} texto={textoImpuestos} />)
      lineas.push(<Elemento key={lineas.length} texto={textoTotal} />)
      setTicket(<Ticket lineas={lineas}/>)
    }
  }
  const limpiar = ()=>{
    setElementos([])
    setTicket(null)
    setText(null)
  }
  return (
    <div className="App">
      <section className='intro'>
        <textarea placeholder="Introduce el texto" onKeyUp={event => setText(event.target.value)}></textarea>
        <div>
          <label>Tipo Producto: </label>
          <select onChange={(e)=>setTipo(parseInt(e.target.value))}>
            <option value={1}>Básico</option>
            <option value={2}>Exentos</option>
            <option value={3}>Importados Básicos</option>
            <option value={4}>Importados Exentos</option>
          </select>
        </div>
        <button onClick={ () => setElementos(elementos === [] ? <Elemento texto={te} key={elementos.length} tipo={tipoImpuesto}/> : [...elementos,<Elemento texto={te} key={elementos.length} tipo={tipoImpuesto}/>]) }>
          Añadir Producto
        </button>
        <button onClick={()=>calcularFactura()}>Calcular Ticket</button>
        <button onClick={()=>limpiar()}>Reset</button>
        Los libros, alimentos y productos médicos<br/>
        SON DE TIPO EXENTOS
      </section>

      <section className='lineas'>
        Carrito:<br/>
        {elementos}
      </section>

      {ticket}
    </div>
  );
}

export default App;