
const palabraAgregada= document.getElementById("introducirPalabra");
let letraFallada= document.getElementById("letraFallada");
const bodyAreaJuego= document.querySelector(".contenedor");
const mostrarMensaje=document.querySelector(".mostrarMensaje");
const conjuntoCajas= document.getElementById("conjuntoCajas");
let valorInput=document.querySelector('input');
//const nuevoJuego= 


let conjuntoPalabras=["BUG","BINARIO","HTML","JAVA","COOKIE","CURSOR","DATOS","ARCHIVO","CARPETA","HACKER",
"CSS","OBJETO","LINK","MENU","MODEM","RED"];


let letrasErradas="";
let aciertos=0;
let letrasCorrectas="";
let storedArray;

let palabraSecreta="";

let puedeEscribir=true;

storedArray=JSON.parse(sessionStorage.getItem("items"));
if(storedArray==null)
{
    storedArray=conjuntoPalabras;
}

let fallos=0;

function home(){
    window.location.href="index.html";
}

function iniciarJuego(){
    window.location.href="areaJuego.html";
}

function irAgregarPalabra(){
    window.location.href = 'agregarPalabra.html';
}



function comienza()
{
    letraFallada.value="";
    fallos=0;
    aciertos=0;
    contador=0;
    letrasCorrectas="";
    letrasErradas="";
    limpiarConjuntoCajas();
    generarPalabraSecreta();
    totalCaja();
    cambiarImagen("ahorcado0");
    valorInput.disabled=false;
}

function generarPalabraSecreta()
{
    storedArray=JSON.parse(sessionStorage.getItem("items"));

    if(Array.isArray(storedArray))
    {
        palabraSecreta=storedArray[Math.floor(Math.random() * storedArray.length)];
    }
    else
    {
        palabraSecreta=conjuntoPalabras[Math.floor(Math.random() * conjuntoPalabras.length)];
    }
    console.log(palabraSecreta);
}


function agregarALista()
{
    let palabraVerificar=palabraAgregada.value.toUpperCase();
    if(palabraVerificar.length>8||palabraVerificar.length<2)
    {
        difuminar();
        mostrarMensajeAgregarPalabra("Palabra fuera de rango");
        return;
    }
    if(storedArray.includes(palabraVerificar))
    {
        difuminar();
        mostrarMensajeAgregarPalabra("Palabra existente");
        return;
    }
    
    conjuntoPalabras.push(palabraVerificar);
    window.sessionStorage.setItem("items", JSON.stringify(conjuntoPalabras));//guardamos el array en el cache
    storedArray=JSON.parse(sessionStorage.getItem("items"));// se obtiene una copia actualizada de los elementos en el array
    palabraAgregada.value="";
}

/* Inicio funciones del canvas */ 

let contador=0;
let textBox="";

function totalCaja()
{    
    for(let i=0;i<palabraSecreta.length;i++)
    {
        agregarCaja();
    }
}

if(mostrarMensaje!=null)
{
    mostrarMensaje.style.display="none"
}


function agregarCaja(){
    var div= document.createElement("div");
    div.setAttribute("class","areaCajas"); // añadimos la clase al elemento creadao
    div.setAttribute("id","caja"+contador);// le asignamos un id

    textBox='<textarea id="caja'+contador+'" class="cajasMultiples" readonly value=""></textarea> '; // declaramos las propiedades del textarea nueva
    div.innerHTML=textBox;
    conjuntoCajas.appendChild(div);
    contador++;
}

function limpiarConjuntoCajas() {
    while (conjuntoCajas.hasChildNodes()) {
        conjuntoCajas.removeChild(conjuntoCajas.firstChild);
    }
  }

  function rellenarCaja(letra)
  {
      for(let i=0;i<palabraSecreta.length;i++)
      {
          if(palabraSecreta[i]==letra)
          {
            let caja= document.getElementById('caja'+i).innerHTML='<textarea class="cajasMultiples" readonly>'+letra+'</textarea> ';;
            aciertos++;
            if(aciertos==palabraSecreta.length)
            {
                difuminar();
                let complemento;
                if(fallos==1)
                {
                    complemento=fallos+" fallo";
                }
                else
                {
                    complemento=fallos+" fallos";
                }
                mensajesMostrarMensaje("¡Has ganado!","Con tan solo "+complemento);

                return false;
            }
          }
      }
  
  }


 function verificar(){

    if(aciertos==palabraSecreta.length||fallos==6)
    {
        return false;
    }

    if(esLetra(event))
    {
        let letra=event.key.toUpperCase();
        if(palabraSecreta.includes(letra))
        {
            letrasCorrectas+=letra;
            rellenarCaja(letra);
            
            
        }
        else{
            if(!letrasErradas.includes(letra))
            {
                fallos++;
                letrasErradas+=letra;
                let agregar= letra+"    ";
                letraFallada.value+=agregar;
                
                cambiarImagen("ahorcado"+fallos);
                if(fallos==6)
                    {
                        difuminar();
                        mensajesMostrarMensaje("¡Has perdido!",("La palabra era "+palabraSecreta.toLowerCase()));
                    }
            }
            
        }
        return true;
    }
    else
    {
        return false
    }
    
  }

  
function esLetra() 
{
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) ) // se comprueba si el código de la tecla corresponde a una letra
        return true;
            
    return false;
}

function esLetra2()
{
    if(esLetra(event))
    {
        verificar(event);
        return true;
    }
    return false;
}

function limpiarInput()
{
    console.log(valorInput.value)
    if(valorInput.value.length!=0)
    {
       valorInput.value="";
       if(fallos==6)
       {
        valorInput.disabled=true;
       }
    }
}
/* Fin funciones del canvas */ 

function cambiarImagen(nombre){
    let img= document.getElementById("ahorcado");
    img.src="imagenes/"+nombre+".png";
  }


 function difuminar()
 {
    bodyAreaJuego.className+=" difuminar";
    
    document.querySelector(".mostrarMensaje").style.display="flex";
    document.querySelector(".botonesInferior").style.display="none";

 }

 function enfocar()
 {
    bodyAreaJuego.className="contenedor";
    document.querySelector(".mostrarMensaje").style.display="none";
    document.querySelector(".botonesInferior").style.display="block";
 }

 function mostrarMensajeAgregarPalabra(mensaje)
 {
    document.getElementById("mensaje").innerText =mensaje;
 }
 
 function mensajesMostrarMensaje(resultado,masInfo)
 {
    document.getElementById("resultado").innerText =resultado;
    document.getElementById("masInfo").innerText =masInfo;
 }