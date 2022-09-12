
let conjuntoPalabras=["BUG","TI","HTML","JAVA","COOKIE","CURSOR","DATOS","ARCHIVO","CARPETA","HACKER",
"CSS","OBJETO","LINK","MENU","MODEM","RED"];

let palabraSecreta;

function generarAleatorio(){
    let longitud= conjuntoPalabras.length-1;
    return Math.floor(Math.random*longitud+1);
}

function obtenerPalabraSecreta()
{
    return conjuntoPalabras[generarAleatorio()];
}
