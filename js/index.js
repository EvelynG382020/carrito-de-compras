//acceder al html
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let productosSeleccionadoEnCarrito = {}


//esperar cuando todo el html haya sido cargado para cargar el event listener y pasarle el fetch
document.addEventListener('DOMContentLoaded', ()=>{
  fetchData()
  if(localStorage.getItem('carrito')){
    productosSeleccionadoEnCarrito = JSON.parse(localStorage.getItem('carrito'))
    pintarCarrito()
  }
})

cards.addEventListener('click', e => { addCarrito(e)})

items.addEventListener('click', e => {btnAccion(e)})

const tableCarrito = document.getElementById('table-carrito')
tableCarrito.onmouseover = () => {
  tableCarrito.style.background = "yellow"
}

const fetchData = async ()=> {
  try{
    const res = await fetch('api.json')//petición de la respuesta de api.json y con fetch leemos el archivo json
    const data = await res.json()//esta constante data es la que tiene la info de la respuesta leída arriba y con el await hacemos esperar que la respuesta viene en json
    printCards(data)
  }
  catch(error){

    console.log(error)
  }
}

const printCards = data => {
  data.forEach(producto => {
    const { modelo, precio, img, descripcion, id } = producto

    templateCard.querySelector('h5').textContent = modelo
    templateCard.querySelector('span').textContent = precio
    templateCard.querySelector('img').setAttribute('src', img)
    templateCard.querySelector('h6').textContent = descripcion
    templateCard.querySelector('.btn-dark').dataset.id = id

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
    // console.log(producto)
  })
  cards.appendChild(fragment)
}

//detectar el boton de las card del html y capturar el evento este add carrito es la función del evento, es lo q se ejecuta al presionar el boton y se ejecuta arriba en cards.addEventListener
const addCarrito = e => {
 
  if(e.target.classList.contains('btn-dark')){
    e.target.onmouseover = () =>{
      e.target.style.backgroundColor = 'green'
    }
    
    Swal.fire({
      title: 'Genial!',
      text: 'Haz escogido un buen producto !',
      icon: 'success',
      confirmButtonText: 'Gracias'
    })
    
    setCarrito(e.target.parentElement)
  }
  //detener cualquier otro evento q se pueda estar generando en este caso en el div padre cards
  e.stopPropagation()
}

//otra función que manipula el carrito, va a recibir un objeto, este objeto en esta función contiene todo lo que se selecciona con el boton comprar, todos sus propiedades, por eso será el setCarrito y así generar el objeto con todos los elementos del producto seleccionado
const setCarrito = objeto => {
  const producto = {
    id: objeto.querySelector('.btn-dark').dataset.id,
    modelo: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('span').textContent,
    descripcion: objeto.querySelector('h6').textContent,
    cantidad: 1
  }
  if(productosSeleccionadoEnCarrito.hasOwnProperty(producto.id)){
    producto.cantidad = productosSeleccionadoEnCarrito[producto.id].cantidad + 1
  }

  //empujar ahora todo al carrito
  productosSeleccionadoEnCarrito[producto.id] = {...producto}
  pintarCarrito()
} 

const pintarCarrito = ()=>{
  items.innerHTML = ''
  Object.values(productosSeleccionadoEnCarrito).forEach(prod => {
    templateCarrito.querySelector('th').textContent = prod.id
    templateCarrito.querySelectorAll('td')[0].textContent = prod.modelo
    templateCarrito.querySelectorAll('td')[1].textContent = prod.cantidad
    templateCarrito.querySelector('.btn-success').dataset.id = prod.id
    templateCarrito.querySelector('.btn-danger').dataset.id = prod.id
    templateCarrito.querySelector('span').textContent = prod.cantidad * prod.precio
    templateCarrito.querySelector('.impto').textContent = prod.cantidad * prod.precio * 0.19
    templateCarrito.querySelector('.total-impto').textContent = prod.cantidad * prod.precio * 1.19
    
    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
  pintarFooter()

  localStorage.setItem('carrito', JSON.stringify(productosSeleccionadoEnCarrito))
}

const pintarFooter = () => {
  footer.innerHTML = ''
  if (Object.keys(productosSeleccionadoEnCarrito).length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `
  }

  const nCantidad = Object.values(productosSeleccionadoEnCarrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
  const nPrecio = Object.values(productosSeleccionadoEnCarrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio * 1.19 ,0)
    // console.log(nPrecio)

  templateFooter.querySelectorAll('td')[0].textContent = nCantidad
  templateFooter.querySelector('span').textContent = nPrecio

  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)

  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click', ()=> {
    productosSeleccionadoEnCarrito = {}
    pintarCarrito()

    Swal.fire({
      title: 'Ooh!! Vuelve a comprar',
      text: 'Haz vaciado tu carrito!',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
  })

  const btnfinalizar = document.getElementById('finalizar-compra')
  btnfinalizar.addEventListener('click', ()=> {
    if (Object.keys(productosSeleccionadoEnCarrito).length !== 0){
      Swal.fire({
        title: "Pedido confirmado",
        text: "Será preparado tu pedido",
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 170,
        imageHeight: 159,
        imageAlt: "Ok image",
      })
    }else{
      Swal.fire({
        title: 'Ooh!! No puedes finalizar ',
        text: 'Debes llenar tu carrito!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    }
    productosSeleccionadoEnCarrito = {}
    pintarCarrito()
  })
}

const btnAccion = e => {
  // console.log(e.target)
  if(e.target.classList.contains('btn-success')){
    
    const producto = productosSeleccionadoEnCarrito[e.target.dataset.id]
    producto.cantidad++
    productosSeleccionadoEnCarrito[e.target.dataset.id] = {...producto}
    pintarCarrito()
  }
  if(e.target.classList.contains('btn-danger')){
    
    const producto = productosSeleccionadoEnCarrito[e.target.dataset.id]
    producto.cantidad--
    if(producto.cantidad === 0) {
    delete productosSeleccionadoEnCarrito[e.target.dataset.id]
    }  
    pintarCarrito()
  }
  e.stopPropagation()
}

