
const palabraAgregada= document.getElementById("introducirPalabra");



let conjuntoPalabras=["BUG","BINARIO","HTML","JAVA","COOKIE","CURSOR","DATOS","ARCHIVO","CARPETA","HACKER",
"CSS","OBJETO","LINK","MENU","MODEM","RED","12345678"];

let storedArray;

let palabraSecreta="";

let puedeEscribir=true;

window.sessionStorage.setItem("items", JSON.stringify(conjuntoPalabras));

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function comienza()
{
    fallos=0;
    limpiarConjuntoCajas();
    generarPalabraSecreta();
    totalCaja();
    cambiarImagen("ahorcado0");
    esperarLetras();
}
function esLetra(event)
{
    //return((event.charCode >= 97 && event.charCode <= 122)||(event.charCode >= 65 && event.charCode <= 90)||event.charCode==164||event.charCode==165);
    const pattern = new RegExp('^[a-zA-Z]+$');
    let pal= event.key;
    if(pattern.test(pal))
    {
        console.log("1");
    } 
    else{
        console.log("0");
    }
    return pattern.test(pal);
}




function lettersOnly() 
{
            var charCode = event.keyCode;

            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)

                return true;
            else
                return false;
}

function esperarLetras(){
    document.addEventListener('keyup', (event) => {
        var keyName = event.key;
        var KeyCode = event.keyCode; 
        const pattern = new RegExp('^[A-Z]+$', 'i');

        if(KeyCode >= 65 && KeyCode <=90){
            //Imprime la letra presionada
            //console.log(keyName);
            if(pattern.test(keyName)){
                if(puedeEscribir){
                    console.log(keyName);
                }
            }
        }
        else{
            return
        }
      }, false);
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
    storedArray=JSON.parse(sessionStorage.getItem("items"));
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


function esLetra(event){
    /*return evento.charCode >= 65 && evento.charCode <= 90*/
    return (event.charCode >= 48 && event.charCode <= 57)

}

/* Inicio funciones del canvas */ 

function dibujarCanva()
{
    horca.lineWidth=8;
    horca.lineCap="round";
    horca.linJoin="round";
    horca.fillStyle("#F3F5F6");
    horca.strokeStyle="#8A3871";

    horca.fillRect(0,0,1200,1860);
    horca.beginPath();
    horca.moveTo(650,500);
    horca.lineTo(900,500);
    horca.stroke();
    horca.closePath();
    
}

const conjuntoCajas= document.getElementById("conjuntoCajas");
let contador=0;
let textBox="";


function totalCaja()
{ 
    /*generarPalabraSecreta();
    alert(palabraSecreta);
    alert(longitud);*/
    
    let longitud= palabraSecreta.length;
    for(let i=0;i<longitud;i++)
    {
        agregarCaja();
    }
}

function agregarCaja(){
    var div= document.createElement("div");
    div.setAttribute("class","areaCajas");
    div.setAttribute("id","caja"+contador);

    textBox='<textarea id="caja'+contador+'" class="cajasMultiples" readonly ></textarea> ';
    div.innerHTML=textBox;
    conjuntoCajas.appendChild(div);
    contador++;
}

function limpiarConjuntoCajas() {
    while (conjuntoCajas.hasChildNodes()) {
        conjuntoCajas.removeChild(conjuntoCajas.firstChild);
    }
  }


  function cambiarImagen(nombre){
    let img= document.getElementById("ahorcado");
    img.src="/imagenes/"+nombre+".png";
  }

  function verificar(){
    //mierda si acierta
    //else
    fallos++;
    if(fallos==7)
    {
        
        fallos=0;
    }
    let numAhorcado="ahorcado"+fallos;
    cambiarImagen(numAhorcado);
  }
/* Fin funciones del canvas */ 