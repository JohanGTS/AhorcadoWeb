
const palabraAgregada= document.getElementById("introducirPalabra");
let letraFallada= document.getElementById("letraFallada");


let conjuntoPalabras=["BUG","BINARIO","HTML","JAVA","COOKIE","CURSOR","DATOS","ARCHIVO","CARPETA","HACKER",
"CSS","OBJETO","LINK","MENU","MODEM","RED"];

let letrasErradas="";
let aciertos=0;
let letrasCorrectas="";
let storedArray;

let palabraSecreta="";

let puedeEscribir=true;

window.sessionStorage.setItem("items", JSON.stringify(conjuntoPalabras));// se declara donde se almacenará el array en el cache

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
}

function generarPalabraSecreta()
{
    storedArray=JSON.parse(sessionStorage.getItem("items"));
    let palabra=storedArray[Math.floor(Math.random() * conjuntoPalabras.length)];
    palabraSecreta= palabra;
    console.log(palabraSecreta);
}

function agregarALista()
{
    let palabraVerificar=palabraAgregada.value.toUpperCase();
    if(palabraVerificar.length>8||palabraVerificar.length<2)
    {
        alert("Palabra fuera de rango");
        return;
    }
    storedArray=JSON.parse(sessionStorage.getItem("items"));// se obtiene una copia actualizada de los elementos en el array
    if(storedArray.includes(palabraVerificar))
    {
        alert("Palabra existente");
        return;
    }
    
    conjuntoPalabras.push(palabraVerificar);
    window.sessionStorage.setItem("items", JSON.stringify(conjuntoPalabras));//guardamos el array en el cache

    palabraAgregada.value="";
}

function mostrarPalabra(){
   alert("La palabra era "+palabraSecreta);
}




/* Inicio funciones del canvas */ 

const conjuntoCajas= document.getElementById("conjuntoCajas");
let contador=0;
let textBox="";



function totalCaja()
{    
    for(let i=0;i<palabraSecreta.length;i++)
    {
        agregarCaja();
    }
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
                console.log("ganaste");
                return false;
            }
          }
      }
  
  }


 function verificar(){
    //mierda si acierta
    //else
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
            console.log(letra);
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
                        console.log("Has perdido");
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
/* Fin funciones del canvas */ 

function cambiarImagen(nombre){
    let img= document.getElementById("ahorcado");
    img.src="/imagenes/"+nombre+".png";
  }