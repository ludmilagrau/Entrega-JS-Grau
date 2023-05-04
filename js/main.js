// Función que calcula los intereses de las cuotas.
const calculoIntereses = (prestamo, cuotas) => {
	
  if(cuotas <= 6) { // Interés 5%
  	prestamoConInteres = prestamo + prestamo * 5 / 100;
  } else if(cuotas <= 12) { // Interés 10%
    	prestamoConInteres = prestamo + prestamo * 10 / 100;
    } else { // Interés 20%
      prestamoConInteres = prestamo + prestamo * 20 / 100;
    }

		valorCuota = Math.round(prestamoConInteres/cuotas);

    return valorCuota;
}

// Inicializamos el array que contendrá el historial de préstamos del usuario.
let prestamos = [];

// Obtenemos elementos del DOM.
let formContainer = document.querySelector('.form__container')
let resultsContainer = document.querySelector('.results__container')
let rangoImporte = document.querySelector('#range');
let importe = document.querySelector('#importe');
let cuotas = document.querySelectorAll('.radio__input');
let resetButton = document.querySelector('.reset__button');
let historialButton = document.querySelector('.historial__button');
let historialPrestamos = document.querySelector('.historial')
let alerta = document.querySelector('.alert')
let solicitarButton = document.querySelector(".solicitar__button")

// Obtenemos el valor del rango del préstamo.
rangoImporte.addEventListener('mousemove', () => {
	importe.innerText = rangoImporte.value;
})

// Manejamos el submit.
formContainer.addEventListener ('submit', (e) => {
	// Suprimimos el comportamiento por defecto y mostramos la card con los resultados
	e.preventDefault();
	formContainer.style.display = 'none';
	resultsContainer.style.display = 'flex';

	// Obtenemos elementos del formulario del DOM.
	let email = document.querySelector('.input__form').value;
	let resultEmail = document.querySelector('.results__span__email')
	let resultPrestamo = document.querySelector('#prestamo');
	let resultCuotas = document.querySelector('#cuotas__results');
	let importeCuota = document.querySelector('#importe-cuota');
	let fechaVencimiento = document.querySelector('.results__span__fecha')
	let historialVacio = document.querySelector('.historial__vacio')

	// Mostramos el mail en la card de resultados.
	resultEmail.innerText = email;

	// Agarramos la fecha del día de hoy, la formateamos y le agregamos un mes más para que la primer cuota se pague dentro de un mes.
	let diaDeHoy = new Date();

	let fechaFormateada = diaDeHoy.getDate() + "-" + (diaDeHoy.getMonth() + 2) + "-" + diaDeHoy.getFullYear()

	fechaVencimiento.innerText = fechaFormateada;

	// Mostramos el valor del préstamo simulado.
	resultPrestamo.innerText = '$' + rangoImporte.value;

	// Una vez que tenemos préstamos en el historial, se borra el mensaje de que no se simularon préstamos.
	historialVacio.style.display = 'none'

	// Tomamos el valor seleccionado de las cuotas y lo imprimimos.
	cuotas.forEach(cuota => {
		if(cuota.checked) {
			let valorCuota = calculoIntereses(parseFloat(rangoImporte.value), parseFloat(cuota.value))
			resultCuotas.innerText = 'a ' + cuota.value + ' meses.'
			importeCuota.innerText = '$' + valorCuota;

			// Por cada préstamo simulado se crea un objeto
			class Prestamo {
				constructor(prestamo, cuotas, valorCuota) {
					this.prestamo = rangoImporte.value;
					this.cuotas = cuota.value;
					this.valorCuota = valorCuota;
				}
			}

			// Insertamos el objeto en el array de prestamos.
			prestamos.push(new Prestamo(prestamo, cuotas, valorCuota));

			// Mapeamos los préstamos y le agregamos un ID.
			let prestamosConId = prestamos.map((prestamo, index) => {

				return {
						...prestamo,
						id: index + 1
				}
			})

			// Guardamos los préstamos simulados en el localStorage.
			localStorage.setItem('prestamos', JSON.stringify(prestamosConId))

			// Tomamos los préstamos guardados en el localStorage y los mostramos.
			let prestamosHistorial = JSON.parse(localStorage.getItem('prestamos'));

			
			let historialInfo = document.createElement('div');

			historialInfo.classList.add('text__historial')
			for(let i = 0 ; i <= prestamosHistorial.length; i++) {
				historialInfo.innerHTML = '<h6>Prestamo ' + prestamosHistorial[i].id + '</h6>'
				historialInfo.innerHTML += '<p>Importe: ' + prestamosHistorial[i].prestamo + '</p>'
				historialInfo.innerHTML += '<p>Cantidad de cuotas: ' + prestamosHistorial[i].cuotas + '</p>'
				historialInfo.innerHTML += '<p>Valor de cuotas: ' + prestamosHistorial[i].valorCuota + '</p>'
				historialPrestamos.append(historialInfo)
		}
		}
	})
	
});

// Si se solicita el préstamo aparece una alerta.
solicitarButton.addEventListener('click', () => {
	alerta.classList.add('slideInDown')
	alerta.style.display = 'flex'
	alerta.innerHTML = '<img src="./assets/asset-project-coder-check.svg" alt="check">';
	alerta.innerHTML += '<p>Adquiriste tu préstamo satisfactoriamente!</p>';
})

// Si se quiere volver a simular aparece la card anterior.
resetButton.addEventListener('click', () => {
	formContainer.style.display = 'flex';
	resultsContainer.style.display = 'none';
	alerta.style.display = 'none';
})

// Se muestra y se oculta la sección de historial cuando se hace click en el botón.
historialButton.addEventListener('click', () => {
	historialPrestamos.classList.toggle('show')
})