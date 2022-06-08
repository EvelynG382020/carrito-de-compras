//PROBANDO JQUERY
$(document).ready(function () {

  var ocultar = $("#ocultar");
  var mostrar = $("#mostrar");
  var elemento = $("#elemento");
 
  ocultar.click(function () {
    elemento.hide(1000);
  });

  mostrar.click(function () {
    elemento.show(1000);
  });
});

//PARA VALIDAR MAIL
const form = document.getElementById('form')
form.addEventListener('submit', function (event) {
  // si el campo de correo electrónico es válido, dejamos que el formulario se envíe

  if(!email.validity.valid) {
    // Si no es así, mostramos un mensaje de error apropiado
    showError();
    // Luego evitamos que se envíe el formulario cancelando el evento
    event.preventDefault();
  }
});

function showError() {
  if(email.validity.valueMissing) {
    // Si el campo está vacío
    // muestra el mensaje de error siguiente.
    emailError.textContent = 'Debe introducir una dirección de correo electrónico.';
  } else if(email.validity.typeMismatch) {
    // Si el campo no contiene una dirección de correo electrónico
    // muestra el mensaje de error siguiente.
    emailError.textContent = 'El valor introducido debe ser una dirección de correo electrónico.';
  } else if(email.validity.tooShort) {
    // Si los datos son demasiado cortos
    // muestra el mensaje de error siguiente.
    emailError.textContent = `El correo electrónico debe tener al menos ${ email.minLength } caracteres; ha introducido ${ email.value.length }.`;
  }

  // Establece el estilo apropiado
  emailError.className = 'error activo';
}
//PARA VALIDAR CAMPOS DE NOMBRE Y TELÉFONO
const campoNombre = document.getElementById('campoNombre')
const campoNumber = document.getElementById('number')

campoNombre.oninput = ()=>{
  if(!isNaN(campoNombre.value)){
    campoNombre.style.color = 'red'
    Swal.fire({
      title: 'ERROR',
      text: 'Debes ingresar un nombre válido!',
      icon: 'error',
      confirmButtonText: 'Gracias'
    })
  }else{
    campoNombre.style.color = 'black'
    Swal.fire({
      title: 'Correcto',
      text: 'Nombre válido!',
      icon: 'success',
      confirmButtonText: 'Gracias'
    })
  }
}
//VALIDAR EN ENVÍO SOLO SI CUMPLE CON LOS CAMPOS CORRECTOS
const formulario = document.getElementById("form")
formulario.addEventListener("submit", validarFormulario)

function validarFormulario(ev){
  if((isNaN(campoNumber.value)) || (campoNombre.value == "")){
    ev.preventDefault()
    Swal.fire(
      'Debe ingresar datos válidos'
    )
  }
}






