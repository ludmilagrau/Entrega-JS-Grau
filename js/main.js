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

 // Función que valida que el valor ingresado sea un número.
const validacionNumber = (valorIngresado, mensaje) => {
	while(isNaN(valorIngresado) || valorIngresado <= 0) {
		valorIngresado = parseFloat(prompt(mensaje));
	}
	return valorIngresado
}

// Función que valida que la respuesta sea sí o no.
const validacionRespuesta = (respuesta, mensaje) => {
	while(respuesta != "si" && respuesta != "no") {
		respuesta = prompt(mensaje);
	}
	return respuesta;
}

// Inicializamos el array que contendrá el historial de préstamos del usuario.
let prestamos = [];

// Mensaje de bienvenida.
alert("¡Bienvenido! :) ¿Desea sacar un préstamo? Lo invitamos a simular una financiación.");

// Declaración de la variable respuesta.
let respuesta = "";

// Bucle que se repite si la respuesta del último prompt es 'si'.
do {
	// Declaración de variables.
  let prestamo = 0;
  let cuotas = 0;
  let valorCuota = 0;
  
	// Solicitud al usuario de importe de préstamo.
  prestamo = parseFloat(prompt("Ingrese el importe del préstamo que desea simular."));

	//Llamada de función de validación.
	prestamo = validacionNumber(prestamo, "El valor ingresado no es válido. Por favor ingrese el importe del préstamo en valor numérico mayor a 0.");

	// Solicitud al usuario de cantidad de cuotas.
  cuotas = parseFloat(prompt("Ingrese la cantidad de cuotas."));

	// Llamada de función de validación.
	cuotas = validacionNumber(cuotas, "El valor ingresado no es válido. Por favor ingrese la cantidad de cuotas en valor numérico mayor a 0.");

	// Llamada de función de cálculo.
  valorCuota = calculoIntereses(prestamo, cuotas);

  // Por cada préstamo simulado se crea un objeto
  class Prestamo {
	constructor(prestamo, cuotas, valorCuota) {
		this.prestamo = prestamo;
		this.cuotas = cuotas;
		this.valorCuota = valorCuota;
	}
  }

  // Insertamos el objeto en el array de prestamos
  prestamos.push(new Prestamo(prestamo, cuotas, valorCuota))

	// Se muestra el resultado final del préstamo.
	if(cuotas == 1) {
		alert(`El préstamo de $${prestamo} se cotizará en 1 cuota de $${valorCuota}`);
	} else {
		alert(`El préstamo de $${prestamo} se cotizará en ${cuotas} cuotas de $${valorCuota}`);
	}

	// Solicitud al usuario de continuación.
  respuesta = prompt("Quiere simular otro préstamo?").toLowerCase();

	// Llamada de función de validación.
	respuesta = validacionRespuesta(respuesta, "El valor ingresado no es válido. Por favor, si desea continuar ingrese 'si', de lo contrario ingrese 'no'");

} while (respuesta == "si");

// Mostramos al usuario por consola el historial de los préstamos que simuló.
alert("En la consola podrá ver el historial de los préstamos que ha simulado. Nos vemos la próxima!")

console.table(prestamos)