import './App.css'
import React,{useState,useEffect} from 'react'

const ajustaDecimales = (numero,ajustaCentena=true,ajustaCentenaImpuestos=false)=>{
  let inicioDecimal = numero.indexOf('.')
  let parteEntera = numero.substring(0,inicioDecimal)
  let decimales = ''
  let resultado = ''
  if(inicioDecimal !== -1){
    decimales = numero.substring(inicioDecimal+1,numero.length)
  }
  if (decimales.length > 1 ){
    let centena = parseInt(decimales.charAt(1))
    let decena = parseInt(decimales.charAt(0))
    resultado = parteEntera+'.'+decimales.charAt(0)+decimales.charAt(1);
    let suma = 0
    let ajustarACinco = false
    for(let indice = decimales.length-1;indice > 1; indice--){
      let cifra = parseInt(decimales.charAt(indice))
      cifra+=suma
      suma = 0
      if(cifra >= 5){
        suma = 1
      }
      if(indice > 1 && cifra > 0){
        ajustarACinco = true
      }
    }
    if (suma === 1){
      centena += suma
      if (centena === 10){
        centena = 0
        decena += 1
        if (decena === 10){
          parteEntera = parseInt(parteEntera)+1
          decena = 0
        }
      }
    }
    else{
      if (ajustaCentena && centena > 0 && centena < 5){
        centena = 5
      }
      else if(ajustaCentena && centena === 0 && ajustarACinco){
        centena = 5
      }
      if(ajustaCentenaImpuestos && centena > 5){
        centena = 0
        decena+=1
        if(decena === 10){
          parteEntera = parseInt(parteEntera)+1
          decena = 0
        }
      }
    }
    decimales = decena.toString()+centena.toString()
    resultado = parteEntera+'.'+decimales
  }
  else{
    resultado = numero;
  }
  return resultado
}

// Components
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

  useEffect(()=>{
    document.getElementById('area').value = ''
  },[elementos])
  useEffect(()=>{
    document.getElementById('seleccion').value='1'
  },[ticket])
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
        let precio = itemText.substring(inicioPrecio,finPrecio)
        precio = precio.replace(',','.')
        precio = parseFloat(precio)

        importeImpuesto = precio*valorImpuestos[tipoI]

        if(tipoI === 3){
          importeImpuesto = precio*0.05 + precio*0.1
        }
        else if (tipoI === 4){
          importeImpuesto = precio*0.05
        }
        importeImpuesto = parseFloat(ajustaDecimales(importeImpuesto.toString()))
        precio += importeImpuesto
        precio = parseFloat(ajustaDecimales(precio.toString())) * parseFloat(numeroProducto)
        totalImpuestos += importeImpuesto
        total += precio
        let nuevoTexto = itemText.substring(0,itemText.lastIndexOf('a')-1)+': '+precio+' €';
        lineas.push(<Elemento key={item.key} texto={nuevoTexto} />)
      }
    })
    if (lineas !== []){
      totalImpuestos = parseFloat(ajustaDecimales(totalImpuestos.toString(),true,true))
      total = parseFloat(ajustaDecimales(total.toString(),false))
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
    setTipo(1)
  }
  return (
    <div className="App">
      <section className='intro'>
        <textarea id='area' placeholder="Introduce el texto" onKeyUp={event => setText(event.target.value)}></textarea>
        <div>
          <label>Tipo Producto: </label>
          <select onChange={(e)=>setTipo(parseInt(e.target.value))} id='seleccion'>
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

export default App
