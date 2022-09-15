
const palabraAgregada= document.getElementById("introducirPalabra");

let conjuntoPalabras=["BUG","BINARIO","HTML","JAVA","COOKIE","CURSOR","DATOS","ARCHIVO","CARPETA","HACKER",
"CSS","OBJETO","LINK","MENU","MODEM","RED"];

let storedArray;

let palabraSecreta;

function home(){
    window.location.href="index.html";
}

function iniciarJuego(){
    window.location.href="areaJuego.html";
}

function irAgregarPalabra(){
    window.location.href = 'agregarPalabra.html';
}


function generarAleatorio(){
    let longitud= conjuntoPalabras.length-1;
    return Math.floor(Math.random*longitud+1);
}

function obtenerPalabraSecreta()
{
    return conjuntoPalabras[generarAleatorio()];
}

function prueba()
{
    storedArray=JSON.parse(sessionStorage.getItem("items"));
    console.log(storedArray);
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