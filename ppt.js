$(function () {
	//*si quieres que se no se muestren los id usar array asociativo,ej. {1:"string", 2:"string2", 3:"string3"};
	var baraja = ["2-c", "2-p", "2-d", "2-t", "3-c", "3-p", "3-d", "3-t", "4-c", "4-p", "4-d", "4-t", "5-c", "5-p", "5-d", "5-t", "6-c", "6-p",
		"6-d", "6-t", "7-c", "7-p", "7-d", "7-t", "8-c", "8-p", "8-d", "8-t", "9-c", "9-p", "9-d", "9-t", "10-c", "10-p", "10-d", "10-t", "14-c", "14-p",
		"14-d", "14-t", "11-c", "11-p", "11-d", "11-t", "13-c", "13-p", "13-d", "13-t", "12-c", "12-p", "12-d", "12-t"];
	var c6, actual, sustituir;
	var manoJugador = [[], [], [], [], [], [], []];
	var neutral = [];
	var izqNeutral = 22, izqJugador = 5;
	var contador = 0, contador2 = 0, tardanza = 0, fueraPartida = 0, pujaMaxima = 0, boteTotal = 0; aumentoMinimo = 10;
	var resultado = "Nada";
	var ganadorVar = false;
	var arrayNumerico = [], arrayPalo = [], anterioresJugadas = [], numerosArray = [], palosArray = [], dineroJugadoTotal = [];
	var high = ["14,14", "13,13", "12,12", "14,13"];//asignar dinero a aumentar segun la carta jugada 
	var valor = [];
	valor["14,14"] = 100; valor["13,13"] = 90; valor["12,12"] = 85; valor["14,13"] = 75;
	var mid = ["11,11", "10,10", "9,9"];//asignar menos dinero a asignar, menos que la anterior
	valor["11,11"] = 70; valor["10,10"] = 65; valor["9,9"] = 60;
	var small = ["8,8", "7,7", "6,6", "5,5", "4,4", "3,3", "2,2"];
	valor["8,8"] = 50; valor["7,7"] = 50; valor["6,6"] = 50; valor["5,5"] = 50; valor["4,4"] = 50; valor["4,4"] = 50; valor["3,3"] = 50; valor["2,2"] = 50;
	var midAce = ["14,12", "14,11", "14,10"];
	valor["14,12"] = 45; valor["14,11"] = 45; valor["14,10"] = 45;
	var suitedAce = ["14,9", "14,8", "14,7", "14,6", "14,5", "14,4", "14,3", "14,2"];//mismo palo check
	valor["14,9"] = 40; valor["14,8"] = 39; valor["14,7"] = 38; valor["14,6"] = 37; valor["14,5"] = 36; valor["14,4"] = 35; valor["14,3"] = 35;
	valor["14,2"] = 40;
	var facecards = ["13,12", "13,11", "13,10", "12,11", "12,10"];
	valor["13,12"] = 35; valor["13,11"] = 34; valor["13,10"] = 33; valor["12,11"] = 32; valor["12,10"] = 31;
	var suitedConnec = ["12,9", "11,10", "11,9", "11,8", "10,9", "10,8", "9,8", "8,7", "7,6", "6,5", "5,4"];//mismo palo check
	valor["12,9"] = 30; valor["11,10"] = 29; valor["11,9"] = 28; valor["11,8"] = 27; valor["10,9"] = 26;
	valor["10,8"] = 25; valor["9,8"] = 24; valor["8,7"] = 23; valor["7,6"] = 22; valor["6,5"] = 21; valor["5,4"] = 20;
	var pequena = Math.floor(Math.random() * 7);
	var turno2preFlop = false;
	var myVar = 0;
	var turno2 = false;
	var jugadoresActivos = 0;
	var jugadores = [{
		nombre: "Jugador0", fichas: 1000, accion: "", turno: 0, enJuego: 0, suMano: "",
		repartirFuncion: function (i) {
			manoJugador[0].push(baraja.pop());//saco carta de la baraja y la anado a mi mano
			$("#" + manoJugador[0][i]).removeClass("add_keyframe")
			$("#" + manoJugador[0][i]).css("left", "47%");
			$("#" + manoJugador[0][i]).delay(tardanza).animate({
				left: izqJugador + 35 + '%',
				top: '83%',
				borderSpacing: 360
			}, {
					step: function (now, fx) {
						$(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
						$(this).css('-moz-transform', 'rotate(' + now + 'deg)');
						$(this).css('transform', 'rotate(' + now + 'deg)');
					}, duration: 1000, complete: function (now, fx) {
						$("#" + manoJugador[0][contador2]).attr("src", "img/" + manoJugador[0][contador2] + ".png");//puedes ver tu mano
						contador2++;
					}
				}, 1000);
			tardanza += 250;
		}
	},
	{
		nombre: "Jugador1", fichas: 1000, accion: "", turno: 0, enJuego: 0, suMano: "", repartirFuncion: function (i) {
			realizarAnimacionCartas(1, i, 0, '58%');
		}
	},
	{
		nombre: "Jugador2", fichas: 1000, accion: "", turno: 0, enJuego: 0, suMano: "", repartirFuncion: function (i) {
			realizarAnimacionCartas(2, i, 0, '33%');
		}
	},
	{
		nombre: "Jugador3", fichas: 1000, accion: "", turno: 0, enJuego: 0, suMano: "", repartirFuncion: function (i) {
			realizarAnimacionCartas(3, i, 25, '8%');
		}
	},
	{
		nombre: "Jugador4", fichas: 1000, accion: "", turno: 0, enJuego: 0, suMano: "", repartirFuncion: function (i) {
			realizarAnimacionCartas(4, i, 50, '8%');
		}
	},
	{
		nombre: "Jugador5", fichas: 1000, accion: "", turno: 0, enJuego: 0, suMano: "", repartirFuncion: function (i) {
			realizarAnimacionCartas(5, i, 75, '33%');
		}
	},
	{
		nombre: "Jugador6", fichas: 1000, accion: "", turno: 0, enJuego: 0, suMano: "", repartirFuncion: function (i) {
			realizarAnimacionCartas(6, i, 75, '58%');
		}
	}];

	function realizarAnimacionCartas(numJugador, cartaPosicion, extraIzw, topPersona) {
		manoJugador[numJugador].push(baraja.pop());
		$("#" + manoJugador[numJugador][cartaPosicion]).removeClass("add_keyframe");
		$("#" + manoJugador[numJugador][cartaPosicion]).css("left", "47%");
		$("#" + manoJugador[numJugador][cartaPosicion]).delay(tardanza).animate({
			left: izqJugador + extraIzw + '%',
			top: topPersona,
			borderSpacing: 360
		}, {
				step: function (now, fx) {
					$(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
					$(this).css('-moz-transform', 'rotate(' + now + 'deg)');
					$(this).css('transform', 'rotate(' + now + 'deg)');
				}, duration: 1000
			}, 1000);
		tardanza += 250;
	}

	//asignar turnos dado un numero al azar para empezar la partida
	for (i = 0; i < 7; i++) {
		jugadores[pequena].turno = i;
		if (i > 4) {
			pujaMaxima += 5;
			jugadores[pequena].fichas = jugadores[pequena].fichas - pujaMaxima;
			jugadores[pequena].enJuego = pujaMaxima;
			boteTotal += jugadores[pequena].enJuego;
			$("#" + jugadores[pequena].nombre).children(".apuesta").html(" Puja(" + jugadores[pequena].enJuego + ")");
		}
		pequena++;
		if (pequena == 7) {
			pequena = 0;
		}
	}
	//nombres, fichas actuales.

	function actualizarInfo() {
		for (i = 0; i < 7; i++) {
			$("#" + jugadores[i].nombre).children(".nombre").html(jugadores[i].nombre);
			$("#" + jugadores[i].nombre).children(".fichas").html(" Fichas(" + jugadores[i].fichas + ")");
			$("#" + jugadores[i].nombre).children(".apuesta").html(" Puja(" + jugadores[i].enJuego + ")");
			//	$('.apuesta').css("font-size", $(this).val() + "px");
		}
	}

	$(document).ready(function () {
		//////////////////////////////////////////////////////////////////////////
		//////////////////////////COMPROBAR JUGADAS///////////////////////
		//////////////////////////////////////////////////////////////////////
		function comprobarJugada(i) {
			if (fueraPartida == 6) {
				setTimeout(ganador, 500, jugadores, i);
			}
			else {
				$("#" + jugadores[i].nombre).css({ 'background-color': '#e5d63a' });
				//console.log(i + " " + jugadores[i].nombre);
				//console.log(i + " " + jugadores[i].suMano);
				if (!comprobarRoyalF(jugadores[i].suMano, i)) {
					if (!straightFlush(jugadores[i].suMano, i)) {
						if (!fourOfAKind(jugadores[i].suMano, i)) {
							if (!fullHouse(jugadores[i].suMano, i)) {
								if (!flush(jugadores[i].suMano, i)) {
									if (!Straight(jugadores[i].suMano, i)) {
										if (!trio(jugadores[i].suMano, i)) {
											if (!doblePareja(jugadores[i].suMano, i)) {
												if (!pareja(jugadores[i].suMano, i)) {
													if (azarProb(5) == 0) {
														if (azarProb(5) == 0) {
															jugadores[i].accion = "raise";
															ejecutarAccion(i);
														}
														else {
															jugadores[i].accion = "call";
															ejecutarAccion(i);
														}
													}
													else {
														jugadores[i].accion = "fold";
														ejecutarAccion(i);
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			//	console.log(resultado);
			$("#mejorJugada").html(resultado);

		}

		function comprobarRoyalF(array, n) {
			array = (array.filter(diezOMayor));
			var fDiamante = [], fPica = [], fCorazon = [], fTrebol = [];
			for (var i = 0; i < array.length; i++) {
				paloCarta = array[i].substr(array[i].search("-") + 1, array[i].length);
				switch (paloCarta) {
					case "p":
						fPica.push(array[i]);
						break;
					case "d":
						fDiamante.push(array[i]);
						break;
					case "t":
						fTrebol.push(array[i]);
						break;
					case "c":
						fCorazon.push(array[i]);
				}
			}
			if ("14-p,13-p,12-p,11-p,10-p" == fPica.toString() || "14-d,13-d,12-d,11-d,10-d" == fDiamante.toString() ||
				"14-c,13-c,12-c,11-c,10-c" == fCorazon.toString() || "14-t,13-t,12-t,11-t,10-t" == fTrebol.toString()) {
				if (jugadores[n].nombre == "Jugador0") {
					jugadores[n].accion = "raise";
					resultado = "No te lo crees ni tu";
					ejecutarAccion(n);
				}
				else {
					jugadores[n].accion = "raise";
					ejecutarAccion(n);
				}
				return true;
			}
			return false;
		}
		//5 cartas seguidas del mimo palo
		function straightFlush(array, n) {
			var fDiamante = [], fPica = [], fCorazon = [], fTrebol = [];
			for (var i = 0; i < array.length; i++) {
				paloCarta = array[i].substr(array[i].search("-") + 1, array[i].length);
				switch (paloCarta) {
					case "p":
						fPica.push(array[i]);
						if (straightFlushNumeros(fPica, n)) {
							return true;
						}
						break;
					case "d":
						fDiamante.push(array[i]);
						if (straightFlushNumeros(fDiamante, n)) {
							return true;
						}
						break;
					case "t":
						fTrebol.push(array[i]);
						if (straightFlushNumeros(fTrebol, n)) {
							return true;
						}
						break;
					case "c":
						fCorazon.push(array[i]);
						if (straightFlushNumeros(fCorazon, n)) {
							return true;
						}
				}
			}
			return false;
		}
		function straightFlushNumeros(array, n) {
			var arrayNumerico = arraySoloNumeros(array);
			var arrayConsecutivas = [];
			if (array.length >= 5) {
				if (arrayNumerico[0] == 14) {
					arrayNumerico.push(1);
				}
				for (var i = 4; i < arrayNumerico.length; i++) {
					if (arrayNumerico[i - 4] - 1 == arrayNumerico[i - 3] && arrayNumerico[i - 3] - 1 == arrayNumerico[i - 2]
						&& arrayNumerico[i - 2] - 1 == arrayNumerico[i - 1] && arrayNumerico[i - 1] - 1 == arrayNumerico[i]) {
						arrayConsecutivas.push(array[i - 4]);
						arrayConsecutivas.push(array[i - 3]);
						arrayConsecutivas.push(array[i - 2]);
						arrayConsecutivas.push(array[i - 1]);
						if (arrayNumerico[i] == 1) {
							arrayConsecutivas.push(array[0]);
						}
						else {
							arrayConsecutivas.push(array[i]);
						}
						if (jugadores[n].nombre == "Jugador0") {
							jugadores[n].accion = "raise";
							resultado = "Tienes un straightFlush";
							ejecutarAccion(n);
							pintarCarta(arrayConsecutivas, arrayConsecutivas.length);
						}
						else {
							jugadores[n].accion = "raise";
							ejecutarAccion(n);
						}
						return true;
					}
				}
			}
			return false;
		}

		//4 valores iguales
		function fourOfAKind(array, n) {
			var arrayNumerico = arraySoloNumeros(array);
			var arrayConsecutivas = [];
			for (var i = 3; i < arrayNumerico.length; i++) {
				if (arrayNumerico[i - 3] == arrayNumerico[i - 2] && arrayNumerico[i - 2] == arrayNumerico[i - 1]
					&& arrayNumerico[i - 1] == arrayNumerico[i]) {
					arrayConsecutivas.push(array[i]);
					arrayConsecutivas.push(array[i - 1]);
					arrayConsecutivas.push(array[i - 2]);
					arrayConsecutivas.push(array[i - 3]);
					if (jugadores[n].nombre == "Jugador0") {
						jugadores[n].accion = "raise";
						resultado = "Tienes un Four of a kind";
						pintarCarta(arrayConsecutivas, arrayConsecutivas.length);
						ejecutarAccion(n);
					}
					else {
						jugadores[n].accion = "raise";
						ejecutarAccion(n);
					}
					return true;
				}
			}
			return false;
		}
		//un trio y un par
		function fullHouse(array, n) {
			var trio = false;
			var pareja = false;
			var arrayNumerico = arraySoloNumeros(array);
			var arrayConsecutivas = [];
			for (var i = 2; i < arrayNumerico.length; i++) {
				if (arrayNumerico[i - 2] == arrayNumerico[i - 1]) {
					if (pareja && trio) {
						if (jugadores[n].nombre == "Jugador0") {
							jugadores[n].accion = "raise";
							resultado = "Tienes un full House";
							pintarCarta(arrayConsecutivas, 5);
							ejecutarAccion(n);
						}
						else {
							jugadores[n].accion = "raise";
							ejecutarAccion(n);
						}
						return true;
					}
					if (arrayNumerico[i - 1] == arrayNumerico[i] && !trio) {
						trio = true;
						arrayConsecutivas.push(array[i - 2]);
						arrayConsecutivas.push(array[i - 1]);
						arrayConsecutivas.push(array[i]);
						i++;
					}
					else if (!pareja) {
						pareja = true;
						arrayConsecutivas.push(array[i - 2]);
						arrayConsecutivas.push(array[i - 1]);
					}
				}
			}
			return false;
		}

		//comprobar 5 cartas con el mismo palo, flush
		function flush(array, n) {
			var fDiamante = [], fPica = [], fCorazon = [], fTrebol = [];
			for (var i = 0; i < array.length; i++) {
				paloCarta = array[i].substr(array[i].search("-") + 1, array[i].length);
				switch (paloCarta) {
					case "p":
						fPica.push(array[i]);
						if (mayorQue5(fPica, n)) {
							return true;
						}
						break;
					case "d":
						fDiamante.push(array[i]);
						if (mayorQue5(fDiamante, n)) {
							return true;
						}
						break;
					case "t":
						fTrebol.push(array[i]);
						if (mayorQue5(fTrebol, n)) {
							return true;
						}
						break;
					case "c":
						fCorazon.push(array[i]);
						if (mayorQue5(fCorazon, n)) {
							return true;
						}
				}
			}
			return false;
		}

		//comprobar 5 numeros  consecutivos sin imporar color, Straight
		function Straight(array, n) {
			var arrayNumerico = arraySoloNumeros(array);
			var arrayConsecutivas = [];
			if (arrayNumerico[0] == 14) {
				arrayNumerico.push(1);
			}
			for (var i = 4; i < arrayNumerico.length; i++) {
				if (arrayNumerico[i - 4] - 1 == arrayNumerico[i - 3] && arrayNumerico[i - 3] - 1 == arrayNumerico[i - 2]
					&& arrayNumerico[i - 2] - 1 == arrayNumerico[i - 1] && arrayNumerico[i - 1] - 1 == arrayNumerico[i]) {
					arrayConsecutivas.push(array[i - 4]);
					arrayConsecutivas.push(array[i - 3]);
					arrayConsecutivas.push(array[i - 2]);
					arrayConsecutivas.push(array[i - 1]);
					if (arrayNumerico[i] == 1) {
						arrayConsecutivas.push(array[0]);
					}
					else {
						arrayConsecutivas.push(array[i]);
					}

					if (jugadores[n].nombre == "Jugador0") {
						jugadores[n].accion = "raise";
						resultado = "Tienes un Straight " + arrayConsecutivas;
						pintarCarta(arrayConsecutivas, arrayConsecutivas.length);
						ejecutarAccion(n);
					}
					else {
						jugadores[n].accion = "raise";
						ejecutarAccion(n);
					}

					return true;
				}
			}
			return false;
		}

		function trio(array, n) {
			var arrayNumerico = arraySoloNumeros(array);
			var arrayConsecutivas = [];
			for (var i = 2; i < array.length; i++) {
				if (arrayNumerico[i] == arrayNumerico[i - 1] && arrayNumerico[i] == arrayNumerico[i - 2]) {
					arrayConsecutivas.push(array[i - 2]);
					arrayConsecutivas.push(array[i - 1]);
					arrayConsecutivas.push(array[i]);
					if (jugadores[n].nombre == "Jugador0") {
						jugadores[n].accion = "call";
						pintarCarta(arrayConsecutivas, arrayConsecutivas.length);
						resultado = "Tienes un trio";
						ejecutarAccion(n);
					}
					else {
						jugadores[n].accion = "call";
						ejecutarAccion(n);
					}
					return true;
				}
			}
			return false;
		}

		function doblePareja(array, n) {
			var arrayNumerico = arraySoloNumeros(array);
			var arrayConsecutivas = [];
			var contador = 0;
			for (var i = 1; i < arrayNumerico.length; i++) {
				if (arrayNumerico[i] == arrayNumerico[i - 1]) {
					arrayConsecutivas.push(array[i]);
					arrayConsecutivas.push(array[i - 1]);
					i++;
					contador++;
					if (contador == 2) {
						if (jugadores[n].nombre == "Jugador0") {
							jugadores[n].accion = "call";
							pintarCarta(arrayConsecutivas, arrayConsecutivas.length);
							resultado = "Tienes una doble pareja";
							ejecutarAccion(n);
						}
						else {
							jugadores[n].accion = "call";
							ejecutarAccion(n);
						}
						return true;
					}
				}
			}
			return false;
		}

		function pareja(array, n) {
			var arrayNumerico = arraySoloNumeros(array);
			var arrayConsecutivas = [];
			for (var i = 1; i < arrayNumerico.length; i++) {
				if (arrayNumerico[i] == arrayNumerico[i - 1]) {
					arrayConsecutivas.push(array[i]);
					arrayConsecutivas.push(array[i - 1]);
					if (jugadores[n].nombre == "Jugador0") {
						jugadores[n].accion = "call";
						pintarCarta(arrayConsecutivas, arrayConsecutivas.length);
						resultado = "Tienes una pareja";
						ejecutarAccion(n);
					}
					else {
						jugadores[n].accion = "call";
						ejecutarAccion(n);
					}
					return true;
				}
			}
			return false;
		}

		////////////////////////////////////////////////////////////////////////////
		/////////////////////FUNCIONES DE ARRAYS///////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////
		function arraySoloNumeros(array) {
			numerosArray = [];
			for (var i = 0; i < array.length; i++) {
				numerosArray.push(parseInt(array[i].substr(0, array[i].search("-"))));
			}
			return numerosArray;
		}
		function arraySoloPalo(array) {
			palosArray = [];
			for (var i = 0; i < array.length; i++) {
				palosArray.push(array[i].substr(array[i].search("-") + 1, array[i].length));
			}
			return palosArray;
		}

		function diezOMayor(valorCarta) {
			return valorCarta.substr(0, valorCarta.search("-")) >= 10;
		}

		function pintarCarta(array, longitud) {
			for (i = 0; i < longitud; i++) {
				$("#" + array[i]).css({ 'border': '4px solid yellow' });
			}
		}

		function mayorQue5(array, n) {
			if (array.length >= 5) {
				if (jugadores[n].nombre == "Jugador0") {
					ejecutarAccion(i);
					jugadores[n].accion = "raise";
					resultado = "Tienes un flush";
					pintarCarta(array, 5);
				}
				else {
					jugadores[n].accion = "raise";
					ejecutarAccion(i);
				}
				return true;
			}
		}

		function arraySinDuplicacos(array) {
			var sinDuplicados = array.filter(function (valorActual, index, array) {
				return index == array.indexOf(valorActual);
			});
			return sinDuplicados;
		}

		function ordenarMayorMenor(array) {
			array.sort(function (a, b) {
				a = a.substr(0, a.search("-"));
				b = b.substr(0, b.search("-"));
				return b - a
			});
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////FUNCIONES BOTONES//////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////

		function sacarCartaBaraja() {
			c6 = baraja.pop();
			$("#" + c6).removeClass("add_keyframe")
			$("#" + c6).css("left", "45%");
			neutral.push(c6);
			$("#" + c6).animate({
				left: izqNeutral + 5 + '%',
				top: '45%',
			}, 250, "linear", function () {
				$("#" + c6).attr("src", "img/" + c6 + ".png");
			});
			izqNeutral += 10;
			for (i = 0; i < manoJugador.length; i++) {
				manoJugador[i].push(c6);
				ordenarMayorMenor(manoJugador[i]);
				//comprobarJugada(manoJugador[i]);
			}
			for (i = 0; i < manoJugador[0].length; i++) {
				$("#" + manoJugador[0][i]).css({ 'border-style': 'none' });
				$("#" + manoJugador[0][i]).css({ 'border-color': 'none' });
			}
			//comprobarJugada(manoJugador[0]);
		};

		$("#continuar").click(function () {
			for (var i = 0; i < jugadores.length; i++) {
				for (j = 0; j < 2; j++) {
					$("#" + manoJugador[i][j]).animate({
						left: '45%',
						top: '26%',
					}, 1000);
				}
			}
			setTimeout(continuarContinuar, 1000);
		});

		function autoContinuar() {
			for (var i = 0; i < jugadores.length; i++) {
				for (j = 0; j < 2; j++) {
					$("#" + manoJugador[i][j]).animate({
						left: '47%',
						top: '26%',
					}, 1000);
				}
			}
			setTimeout(continuarContinuar, 1500);
		}

		function continuarContinuar() {
			$("#baraja").children().remove();
			baraja = ["2-c", "2-p", "2-d", "2-t", "3-c", "3-p", "3-d", "3-t", "4-c", "4-p", "4-d", "4-t", "5-c", "5-p",
				"5-d", "5-t", "6-c", "6-p", "6-d", "6-t", "7-c", "7-p", "7-d", "7-t", "8-c", "8-p", "8-d", "8-t", "9-c", "9-p",
				"9-d", "9-t", "10-c", "10-p", "10-d", "10-t", "14-c", "14-p", "14-d", "14-t", "11-c", "11-p", "11-d", "11-t", "13-c",
				"13-p", "13-d", "13-t", "12-c", "12-p", "12-d", "12-t"];
			manoJugador = [[], [], [], [], [], [], []];
			izqNeutral = 22, izqJugador = 5;
			resultado = "Nada";
			turno2preFlop = false;
			contador = 0, contador2 = 0, tardanza = 0, fueraPartida = 0, pujaMaxima = 0, boteTotal = 0, dineroJugadoTotal = [];
			ganadorVar = false;
			turno2 = false;
			clearInterval(myVar);
			myVar = 0;
			arrayNumerico = [], arrayPalo = [], anterioresJugadas = [], numerosArray = [], palosArray = [];
			for (i = 0; i < jugadores.length; i++) {
				//		console.log(jugadores[i].nombre + " " + jugadores[i].turno);
				$("#" + jugadores[i].nombre).children(".apuesta").html(" ");
				if (jugadores[i].turno == 0) {
					jugadores[i].turno = 6;
				}
				else {
					jugadores[i].turno = jugadores[i].turno - 1;
				}
				if (jugadores[i].turno > 4) {
					if (jugadores[i].turno == 5) {
						pujaMaxima = 5;
						jugadores[i].fichas = jugadores[i].fichas - pujaMaxima;
					}
					if (jugadores[i].turno == 6) {
						pujaMaxima = 10;
						jugadores[i].fichas = jugadores[i].fichas - pujaMaxima;
					}
					jugadores[i].enJuego = pujaMaxima;
					boteTotal += jugadores[i].enJuego;
					$("#" + jugadores[i].nombre).children(".apuesta").html(" Puja(" + jugadores[i].enJuego + ")");
				}
				$("#" + jugadores[i].nombre).css({ 'background-color': 'transparent' });
			}
			pujaMaxima = 10;
			otraVez();
		};



		$("#fold").click(function () {
			for (var i = 0; i < jugadores.length; i++) {
				if (jugadores[i].nombre == "Jugador0") {
					fold(i);
				}
			}
		});

		$("#raise").click(function () {
			for (var i = 0; i < jugadores.length; i++) {
				if (jugadores[i].nombre == "Jugador0") {
					raise(i);
				}
			}
		});

		$("#call").click(function () {
			for (var i = 0; i < jugadores.length; i++) {
				if (jugadores[i].nombre == "Jugador0") {
					call(i);
				}
			}
		});

		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////ACCIONES JUGADOR//////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////

		function fold(n) {
			//	console.log(jugadores[n].nombre); 
			$("#" + jugadores[n].nombre).css({ 'background-color': '#324c5f' });
		}

		function raise(n) {
			//tengo que comprobar que la cantidad minima de aumento sea igual o mayor que la diferencia del anterior raise
			//	aumentoMinimo =  10 - pujaMaxima ;

			pujaMaxima = pujaMaxima + valor[arrayNumerico];//cambiar el 10 por lo que quiera el user, si es el ordenador ???
			var diferencia = pujaMaxima - jugadores[n].enJuego;
			//	console.log(diferencia);
			boteTotal += diferencia;
			jugadores[n].enJuego = jugadores[n].enJuego + diferencia;
			jugadores[n].fichas = jugadores[n].fichas - diferencia;

			dineroJugadoTotal.push(jugadores[n].enJuego);
			$("#" + jugadores[n].nombre).css({ 'background-color': '#e53a4a' });
			$("#" + jugadores[n].nombre).children(".apuesta").html(" Puja(" + jugadores[n].enJuego + ")");
			$("#" + jugadores[n].nombre).children(".fichas").html(" Fichas(" + jugadores[n].fichas + ")");
		}
		//tengo 100 fichas, si quiero igualar a 10 tengo que quiarme 10 de mis fichas totales y anadirme +10 a mi total de fichas apostadas
		function call(n) {
			var diferencia = pujaMaxima - jugadores[n].enJuego;
			boteTotal += diferencia;
			jugadores[n].enJuego = jugadores[n].enJuego + diferencia;
			jugadores[n].fichas = jugadores[n].fichas - diferencia;
			dineroJugadoTotal.push(jugadores[n].enJuego);
			$("#" + jugadores[n].nombre).css({ 'background-color': '#e53a4a' });
			$("#" + jugadores[n].nombre).children(".apuesta").html(" Puja(" + jugadores[n].enJuego + ")");
			$("#" + jugadores[n].nombre).children(".fichas").html(" Fichas(" + jugadores[n].fichas + ")");
		}


		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////FIN ACCIONES JUGADOR//////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////

		function ganador(array, posicion) {
			ganadorVar = true;
			jugadores[posicion].fichas += boteTotal;
			for (i = 0; i < jugadores.length; i++) {
				jugadores[i].enJuego = 0;
				$("#" + jugadores[i].nombre).children(".apuesta").html(" Puja(" + jugadores[i].enJuego + ")");
			}
			$("#" + array[posicion].nombre).css({ 'background-color': '#3ae580' });
			$("#" + jugadores[posicion].nombre).children(".fichas").html(" Fichas(" + jugadores[posicion].fichas + ")");
			actualizarInfo();

			setTimeout(autoContinuar, 1000);
		}

		function preFlop() {

			for (i = 0; i < jugadores.length; i++) {
				tardanza += 1000;
				setTimeout(analizarMano, tardanza, i);
			}
			setTimeout(ronda2PreFlop, tardanza + 2000);
			//todas las pujas tienen que ser iguales de los jugadores activos o haya 3 folds
		}

		function checkPujasIguales() {
			var checkearIguales = true;
			for (j = 1; j < dineroJugadoTotal.length; j++) {
				if (dineroJugadoTotal[j] != dineroJugadoTotal[j - 1]) {
					checkearIguales = false;
				}
			}
			return checkearIguales;
		}

		function ronda2PreFlop() {
			turno2 = true;
			if (fueraPartida == 6 && !ganadorVar) {
				for (i = 0; i < jugadores.length; i++) {
					if (jugadores[i].accion != "fold") {
						setTimeout(ganador, 500, jugadores, i);
					}
				}
			}
			else if (!ganadorVar) {
				tardanza = 1000;
				if (checkPujasIguales()) {
					sacar3cartas();
				}
				else {
					repeticionPreflop();
				}
			}
		}

		function sacar3cartas() {
			tardanza = 1000;
			for (j = 0; j < 3; j++) {
				setTimeout(sacarCartaBaraja, tardanza + 500, i);
				tardanza += 500;
			}
			console.log(tardanza);
			setTimeout(flop, tardanza);
		}

		function flop() {
			for (i = 0; i < jugadores.length; i++) {
				if (jugadores[i].accion != "fold") {
					tardanza += 500;
					setTimeout(comprobarJugada, tardanza, i);
					$("#mejorJugada").html(resultado);
				}
			}

			if (checkPujasIguales()) {
				setTimeout(preturn, tardanza);
			}
		}


		function preturn() {
			tardanza = 1000;
			setTimeout(sacarCartaBaraja, tardanza);
			setTimeout(turn, tardanza + 500);
		}

		function turn() {
			for (i = 0; i < jugadores.length; i++) {
				if (jugadores[i].accion != "fold") {
					tardanza += 500;
					setTimeout(comprobarJugada, tardanza, i);
					$("#mejorJugada").html(resultado);
				}
			}

			if (checkPujasIguales()) {
				setTimeout(preRiver, tardanza);
			}
		}

		function preRiver() {
			tardanza = 1000;
			setTimeout(sacarCartaBaraja, tardanza);
			setTimeout(river, tardanza + 500);
		}

		function river() {
			for (i = 0; i < jugadores.length; i++) {
				if (jugadores[i].accion != "fold") {
					tardanza += 500;
					setTimeout(comprobarJugada, tardanza, i);
					$("#mejorJugada").html(resultado);
				}
			}

			if (checkPujasIguales()) {
				setTimeout(comprobarGanador, tardanza+1000);
			}
		}


		function comprobarGanador() {
			for (e = 0; e < jugadores.length; e++) {
				if (jugadores[e].accion != "fold") {
					//mostrar cartas		
					for (var i = 0; i < 7; i++) {
						$("#" + jugadores[e].suMano[i]).attr("src", "img/" + jugadores[e].suMano[i] + ".png");
					}
				}
			}

			/*
			jugadores[posicion].fichas += boteTotal;
			for (i = 0; i < jugadores.length; i++) {
				jugadores[i].enJuego = 0;
				$("#" + jugadores[i].nombre).children(".apuesta").html(" Puja(" + jugadores[i].enJuego + ")");
			}
			$("#" + array[posicion].nombre).css({ 'background-color': '#3ae580' });
			$("#" + jugadores[posicion].nombre).children(".fichas").html(" Fichas(" + jugadores[posicion].fichas + ")");
			actualizarInfo();

			setTimeout(autoContinuar, 1000);

*/


		}


		function repeticionPreflop() {
			for (i = 0; i < jugadores.length; i++) {
				if (jugadores[i].accion != "fold") {
					jugadoresActivos++;
				}
			}
			myVar = setInterval(comprobarJugadoresActivos, 1000 * jugadoresActivos);
		}


		function comprobarJugadoresActivos() {
			limpiarBucle();
			tardanza = 500;
			jugadoresActivos = 0;
			dineroJugadoTotal = [];
			dineroJugadoTotal.length = 0;
			var jugadoresActivos = 0;

			for (i = 0; i < jugadores.length; i++) {
				if (jugadores[i].accion != "fold" && myVar != 0) {
					tardanza += 500;
					jugadoresActivos++;
					setTimeout(analizarMano, tardanza, i);
				}
			}
		}

		function limpiarBucle() {
			if (checkPujasIguales()) {
				clearInterval(myVar);
				myVar = 0;
				sacar3cartas();
			}
		}

		function analizarMano(i) {
			$("#" + jugadores[i].nombre).css({ 'background-color': '#e5d63a' });
			//asignar al jugador un array determinado(el suyo)
			switch (jugadores[i].nombre) {
				case "Jugador0":
					jugadores[i].suMano = manoJugador[0];
					break;
				case "Jugador1":
					jugadores[i].suMano = manoJugador[1];
					break;
				case "Jugador2":
					jugadores[i].suMano = manoJugador[2];
					break;
				case "Jugador3":
					jugadores[i].suMano = manoJugador[3];
					break;
				case "Jugador4":
					jugadores[i].suMano = manoJugador[4];
					break;
				case "Jugador5":
					jugadores[i].suMano = manoJugador[5];
					break;
				case "Jugador6":
					jugadores[i].suMano = manoJugador[6];
			}
			ordenarMayorMenor(jugadores[i].suMano);
			if (fueraPartida == 6) {
				clearInterval(myVar);
				myVar = 0;
				setTimeout(ganador, 500, jugadores, i);
			}
			else {
				arrayNumerico = arraySoloNumeros(jugadores[i].suMano);
				arrayPalo = arraySoloPalo(jugadores[i].suMano);
				anterioresJugadas = comprobarAnterior(i);
				if (high.includes(arrayNumerico.toString())) {

					if (turno2) {
						if (anterioresJugadas.includes("raise") && arrayNumerico.toString() == "12,12") {
							jugadores[i].accion = "call";
						}
						else if (anterioresJugadas.includes("raise") && arrayNumerico.toString() == "14,13") {
							jugadores[i].accion = "fold";
						}
						else {
							jugadores[i].accion = "raise";
						}
					}
					else {
						jugadores[i].accion = "raise";

					}

				}
				else if (mid.includes(arrayNumerico.toString())) {
					//	console.log("mid");
					if (anterioresJugadas.includes("raise")) {
						if (azarProb(2) == 0) {
							jugadores[i].accion = "fold";
						}
						else {
							jugadores[i].accion = "call";
						}
					}
					else if (anterioresJugadas.includes("call")) {
						jugadores[i].accion = "raise";
					}
					else {
						if (jugadores[i].turno <= 1) {
							jugadores[i].accion = "fold";
						}
						else {
							jugadores[i].accion = "raise";
						}
					}
				}
				else if (small.includes(arrayNumerico.toString())) {
					//	console.log("small");
					if (anterioresJugadas.includes("raise")) {
						if (azarProb(1) == 0) {
							jugadores[i].accion = "fold";
						}
						else {
							jugadores[i].accion = "call";
						}
					}
					else if (anterioresJugadas.includes("call")) {
						if (jugadores[i].turno <= 1) {
							jugadores[i].accion = "fold";
						}
						else {
							jugadores[i].accion = "call";
						}
					}
					else {
						if (jugadores[i].turno == 4) {
							jugadores[i].accion = "raise";
						}
						else {
							jugadores[i].accion = "call";
						}
					}
				}
				else if (midAce.includes(arrayNumerico.toString())) {
					//	console.log("midAce");
					if (anterioresJugadas.includes("raise")) {
						if (azarProb(3) == 0) {
							jugadores[i].accion = "call";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
					else if (anterioresJugadas.includes("call")) {
						if (jugadores[i].turno <= 1) {
							jugadores[i].accion = "fold";
						}
						else if (jugadores[i].turno == 4) {
							jugadores[i].accion = "raise";
						}
						else {
							jugadores[i].accion = "call";
						}
					}
					else {
						if (jugadores[i].turno >= 1) {
							jugadores[i].accion = "raise";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
				}
				else if (suitedAce.includes(arrayNumerico.toString()) && arrayPalo[0] == arrayPalo[1]) {
					//	console.log("suitedAce");
					if (anterioresJugadas.includes("raise")) {
						if (azarProb(3) == 0) {
							jugadores[i].accion = "call";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
					else if (anterioresJugadas.includes("call")) {
						if (jugadores[i].turno == 4) {
							jugadores[i].accion = "raise";
						}
						else if (jugadores[i].turno <= 1) {
							jugadores[i].accion = "fold";
						}
						else {
							jugadores[i].accion = "call";
						}
					}
					else {
						if (jugadores[i].turno >= 2) {
							jugadores[i].accion = "raise";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
				}
				else if (facecards.includes(arrayNumerico.toString())) {
					//	console.log("facecards");
					if (anterioresJugadas.includes("raise")) {
						if (azarProb(3) == 0) {
							jugadores[i].accion = "call";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
					else if (anterioresJugadas.includes("call")) {
						if (jugadores[i].turno >= 4) {
							jugadores[i].accion = "call";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
					else {
						if (jugadores[i].turno >= 1) {
							jugadores[i].accion = "raise";
						}
						else {
							if (jugadores[i].turno >= 4) {
								jugadores[i].accion = "raise";
							}
							else {
								jugadores[i].accion = "fold";
							}
						}
					}
				}
				else if (suitedConnec.includes(arrayNumerico.toString()) && arrayPalo[0] == arrayPalo[1]) {
					//	console.log("suitedConnec");
					if (anterioresJugadas.includes("raise")) {
						if (azarProb(5) == 0) {
							jugadores[i].accion = "call";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
					else if (anterioresJugadas.includes("call")) {
						if (jugadores[i].turno >= 4) {
							jugadores[i].accion = "call";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
					else {
						if (jugadores[i].turno == 4) {
							jugadores[i].accion = "raise";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
				}
				else {
					//	console.log("descartar");
					if (anterioresJugadas.includes("raise")) {
						jugadores[i].accion = "fold";
					}
					else if (anterioresJugadas.includes("call") && jugadores[i].turno == 6) {
						jugadores[i].accion = "call";
					}
					else if (anterioresJugadas.includes("fold") && jugadores[i].turno == 6) {
						jugadores[i].accion = "call";
					}
					else {
						if (azarProb(7) == 0) {
							jugadores[i].accion = "call";
						}
						else {
							jugadores[i].accion = "fold";
						}
					}
				}
				ejecutarAccion(i);
			}
		}
		function ejecutarAccion(i) {
			switch (jugadores[i].accion) {
				case "fold":
					if (jugadores[i].enJuego == pujaMaxima) {
						jugadores[i].accion = "call"
						setTimeout(call, 500, i);
					}
					else {
						setTimeout(fold, 500, i);
					}
					break;
				case "raise":
					if (jugadores[i].fichas > 0) {
						setTimeout(raise, 500, i);
					}
					break;
				case "call":
					setTimeout(call, 500, i);
			}
			if (jugadores[i].accion == "fold") {
				fueraPartida++
			}

			console.log(jugadores[i].accion);
		}

		function comprobarAnterior(i) {
			var accionAnterior = "";
			var accionesAnteriores = [];
			for (var j = jugadores[i].turno; j > 0; j--) {
				accionAnterior = jugadores[j - 1].accion;
				accionesAnteriores.push(accionAnterior);
			}
			return accionesAnteriores;
		}

		function azarProb(numero) {
			return Math.floor(Math.random() * numero);
		}

		otraVez();

		function otraVez() {

			actualizarInfo();
			randowArrayOrdenBaraja();
			crearBaraja();
			setTimeout(repartirCartas, 100 * baraja.length / 2 + 2000);

			function crearBaraja() {
				//Crear baraja completa
				for (var i = 0; i < baraja.length; i++) {
					$("#baraja").append("<img id=" + baraja[i] + " src=img/reve.png>");
				}
				setTimeout(animacionBaraja, 500);
			}

			function animacionBaraja() {
				let flujo = 100;
				let flujo2 = 100;
				for (var j = baraja.length; j >= baraja.length / 2; j--) {
					$("#" + baraja[j]).animate({
						left: "57%",
					}, 800, function () {
						for (var j = baraja.length / 2; j < baraja.length; j++) {
							setTimeout(barajarBarajaDerecha, flujo, j);
							flujo += 100;
						}
					});
				}

				for (var l = 0; l < baraja.length / 2; l++) {
					$("#" + baraja[l]).animate({
						left: "35%",
					}, 800, function () {
						for (l = 0; l <= baraja.length / 2; l++) {
							setTimeout(barajarBarajaIzquierda, flujo2, l);
							flujo2 += 100;
						}
					});
				}
			}

			function barajarBarajaDerecha(j) {
				$("#" + baraja[j]).addClass("add_keyframe");
			}

			function barajarBarajaIzquierda(l) {
				$("#" + baraja[l]).addClass("add_keyframe2");
			}

			function randowArrayOrdenBaraja() {
				for (i = 0; i < baraja.length; i++) {
					var aleatorio = Math.floor(Math.random() * (baraja.length - 0));
					actual = baraja[i];
					sustituir = baraja[aleatorio];
					baraja[aleatorio] = actual;
					baraja[i] = sustituir;
				}
			}

			function repartirCartas() {
				jugadores.sort(function (a, b) {//ordenar los turno de los jugadores
					return a.turno - b.turno
				})
				for (var i = 0; i < 2; i++) {//2 veces repe
					for (j = 0; j < 7; j++) {
						jugadores[j].repartirFuncion(i);//reparte una carta
					}
					izqJugador += 10;
				}
				preFlop();
			}
		}
	});
});