//VARIABLES GLOBALES
let jugadorId = null;
let enemigoId=null;
let mokepones =[];
let mokeponesEnemigos = [];
let mascotaJugador
let mascotaEnemigo
let ataqueJugador =[];
let opcionesAtaques
let ataqueEnemigo =[];
let indexAtaqueJugador=[];
let indexAtaqueEnemigo=[];
let victoriasJugador=0;
let victoriasEnemigo=0;
let mascotaEnemigoVida =3;
let mascotaJugadorVida =3;
let idMensaje=0;
let opcionDeMokepones
let inputBogptile
let inputPeacock
let inputRatigueya
let inputTectonred
let inputIsulv
let inputPydos
let botonFuego
let botonAgua
let botonTierra
let botones=[];

//SELECCION DE ELEMENTOS HTML
const contenedorDeMokepones= document.getElementById("contenedor-mokepones");
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const mascotaElegida= document.getElementById("mascota-elegida");

const sectionVerMapa=document.getElementById("ver-mapa");
const mapa=document.getElementById("canvas-mapa");

const faseDeBatalla = document.getElementById("fase-batalla");
const spanMascotaJugador= document.getElementById("mascota-jugador");
const spanMascotaEnemigo= document.getElementById("mascota-enemigo");
const spanMascotaEnemigoVidas= document.getElementById("mascota-enemigo-vida");
const spanMascotaJugadorVidas= document.getElementById("mascota-jugador-vida");
const spanMascotaEnemigoVictorias=document.getElementById("mascota-enemigo-victorias");
const spanMascotaJugadorVictorias=document.getElementById("mascota-jugador-victorias");
const imgMascotaJugador=document.getElementById("foto-mascota-jugador");
const imgMascotaEnemigo=document.getElementById("foto-mascota-enemigo");

const tituloAtaques= document.getElementById("titulo-ataques");
const botonReiniciar=document.getElementById("boton-reiniciar");
const indiceMensaje=document.getElementById("indice");
const contenedorDeAtaques=document.getElementById("botones-ataques");

const divInstrucciones=document.getElementById("instrucciones");
const botonBatalla=document.getElementById("enfrentamiento");
const divRegistroBatalla=document.getElementById("registro-batalla");
const articleRegistroBatalla= document.getElementById("registro");

let lienzo= mapa.getContext('2d');
let intervalo
let mapaBakcground = new Image();
mapaBakcground.src= "./assets/images/mokemap.png";

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth-20;
const anchoMaximoDelMapa = 800;


if (anchoDelMapa>anchoMaximoDelMapa){
    anchoDelMapa=anchoMaximoDelMapa -20;
}
alturaQueBuscamos= anchoDelMapa*600/800

mapa.width= anchoDelMapa;
mapa.height=alturaQueBuscamos;

//CLASES
class Mokepon{
    constructor(nombre, foto, vida, mapaFoto, id=null){
        this.id=id;
        this.nombre=nombre;
        this.foto=foto;
        this.vida=vida;
        this.ataques=[];
        this.ancho=60;
        this.alto=60;
        this.x=aleatorio(0,mapa.width-this.ancho);
        this.y=aleatorio(0,mapa.height-this.alto);
        this.mapaFoto=new Image();
        this.mapaFoto.src=mapaFoto;
        this.velocidadX=0;
        this.velocidadY=0;
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        );
    }
}

let bogptile= new Mokepon("Bogptile","./assets/images/bogptile.jpg",5,"./assets/images/bogptile.jpg" );
let peacock= new Mokepon("Peacock","./assets/images/peacock.jpg",5, "./assets/images/peacock.jpg");
let ratigueya= new Mokepon("Ratigueya","./assets/images/ratigueya.jpg",5,"./assets/images/ratigueya.jpg");
let tectonred= new Mokepon("Tectonred","./assets/images/tectonred.jpg",5,"./assets/images/tectonred.jpg");
let isulv= new Mokepon("Isulv","./assets/images/isulv.jpg",5,"./assets/images/isulv.jpg");
let pydos= new Mokepon("Pydos","./assets/images/pydos.jpg",5, "./assets/images/pydos.jpg");

const BOGPTILE_ATAQUES=[
    {nombre:"💧", id:"boton-agua"},
    {nombre:"💧", id:"boton-agua" },
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🌱", id:"boton-tierra"},
    {nombre:"🌱", id:"boton-tierra"},
    {nombre:"🔥", id:"boton-fuego"},
]
const PEACOCK_ATAQUES=[
    {nombre:"💧", id:"boton-agua"},
    {nombre:"💧", id:"boton-agua" },
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🌱", id:"boton-tierra"},
]
const RATIGUEYA_ATAQUES=[
    {nombre:"🌱", id:"boton-tierra"},
    {nombre:"🌱", id:"boton-tierra"},
    {nombre:"🌱", id:"boton-tierra"},
    {nombre:"🌱", id:"boton-tierra"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🔥", id:"boton-fuego"},
]
const TECTONRED_ATAQUES=[
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🌱", id:"boton-tierra"},
    {nombre:"🌱", id:"boton-tierra"},
    {nombre:"💧", id:"boton-agua"},
]
const ISULV_ATAQUES=[
    {nombre:"💧", id:"boton-agua"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🌱", id:"boton-tierra"},
]
const PYDOS_ATAQUES=[
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"🔥", id:"boton-fuego"},
    {nombre:"💧", id:"boton-agua"},
    {nombre:"🌱", id:"boton-tierra"},
]
bogptile.ataques.push(...BOGPTILE_ATAQUES);
peacock.ataques.push(...PEACOCK_ATAQUES);
ratigueya.ataques.push(...RATIGUEYA_ATAQUES);
tectonred.ataques.push(...TECTONRED_ATAQUES);
isulv.ataques.push(...ISULV_ATAQUES);
pydos.ataques.push(...PYDOS_ATAQUES);

mokepones.push(bogptile,peacock,ratigueya,tectonred,isulv,pydos);
//FUNCIONES
function iniciarJuego(){
    //OCULTANDO SECCIONES
    faseDeBatalla.style.display="none";
    divRegistroBatalla.style.display="none";
    botonReiniciar.style.display="none";
    indiceMensaje.style.display="none";
    sectionVerMapa.style.display="none";

    //AGREGANDO MOKEPONES
    let fragmentoMokepones=document.createDocumentFragment();
    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <div class="contenedor-tarjeta-interno">
            <div class="tarjeta-frente">
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </div>
            <div class="tarjeta-dorso" id="tarjeta-${mokepon.nombre}">
                <label for=${mokepon.nombre}>${mokepon.nombre}</label>
                <input type="radio" name="mascota" id=${mokepon.nombre}>
            </div>
        </div>
        `;
        let div=document.createElement("div");
        div.setAttribute("class", "contenedor-tarjeta");
        div.innerHTML=opcionDeMokepones;
        fragmentoMokepones.appendChild(div);
    });
    contenedorDeMokepones.appendChild(fragmentoMokepones);
    //BOTONES DE MASCOTAS
    inputBogptile = document.getElementById("Bogptile");
    inputPeacock = document.getElementById("Peacock");
    inputRatigueya = document.getElementById("Ratigueya");
    inputTectonred = document.getElementById("Tectonred");
    inputIsulv = document.getElementById("Isulv");
    inputPydos = document.getElementById("Pydos");
    botonMascotaJugador = document.getElementById("boton-mascota");
    //AGREGANDO ESCUCHAS DE EVENTO
    inputBogptile.addEventListener("click", cambiarMascotaElegida);
    inputPeacock.addEventListener("click", cambiarMascotaElegida);
    inputRatigueya.addEventListener("click", cambiarMascotaElegida);
    inputTectonred.addEventListener("click", cambiarMascotaElegida);
    inputIsulv.addEventListener("click", cambiarMascotaElegida);
    inputPydos.addEventListener("click", cambiarMascotaElegida);    
    botonMascotaJugador.addEventListener("click", confirmarMascotaJugador);
    botonBatalla.addEventListener("click",iniciarBatalla);
    //BOTON DE REINICIO
    botonReiniciar.addEventListener("click", reiniciarJuego);

    unirseAlJuego();
}

function unirseAlJuego(){
    fetch("http://192.168.0.114:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta);
                        jugadorId=respuesta;
                    })
            }
        })    
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//SELECCION DE MASCOTAS
function cambiarMascotaElegida(){
    //BOTONES MASCOTAS
    inputBogptile = document.getElementById("Bogptile");
    inputPeacock = document.getElementById("Peacock");
    inputRatigueya = document.getElementById("Ratigueya");
    inputTectonred = document.getElementById("Tectonred");
    inputIsulv = document.getElementById("Isulv");
    inputPydos = document.getElementById("Pydos");
    if(inputBogptile.checked){
        mascotaJugador=bogptile;
    }else if(inputPeacock.checked){
        mascotaJugador=peacock;
    }else if(inputRatigueya.checked){
        mascotaJugador=ratigueya;
    }else if(inputTectonred.checked){
        mascotaJugador=tectonred;
    }else if(inputIsulv.checked){
        mascotaJugador=isulv;
    }else if(inputPydos.checked){
        mascotaJugador=pydos;
    }
    mascotaElegida.innerHTML=`Elegiste a ${mascotaJugador.nombre}`;
}

function confirmarMascotaJugador(){   
    if(mascotaJugador==undefined){
        alert("Debes seleccionar un MOKEPON!");
    } else{
        imgMascotaJugador.setAttribute("src", mascotaJugador.foto);
        imgMascotaJugador.setAttribute("alt", mascotaJugador.nombre);
        spanMascotaJugador.innerHTML= mascotaJugador.nombre;
    //MOSTRANDO Y OCULTANDO SECCIONES
        sectionSeleccionarMascota.style.display="none";
        sectionVerMapa.style.display="flex";
        seleccionarMokepon(mascotaJugador.nombre);
        iniciarMapa();
        agregarBotones();
    }
}

function seleccionarMokepon(mascota){
    fetch(`http://192.168.0.114:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokepon: mascota
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){
    mascotaEnemigo=enemigo;
    imgMascotaEnemigo.setAttribute("src", mascotaEnemigo.foto);
    imgMascotaEnemigo.setAttribute("alt", mascotaEnemigo.nombre);
    spanMascotaEnemigo.innerHTML=mascotaEnemigo.nombre;
    //CARGANDO VIDAS DE LAS MASCOTAS
    spanMascotaEnemigoVidas.innerHTML=cargarVidas(mascotaEnemigoVida);
    spanMascotaJugadorVidas.innerHTML=cargarVidas(mascotaJugadorVida);
}

function agregarBotones(){
    //AGREGANDO BOTONES DE ATAQUE
    let fragmentoAtaques=document.createDocumentFragment();
    mascotaJugador.ataques.forEach((ataque)=>{
        let button=document.createElement("button");
        button.setAttribute("id", ataque.id);
        button.setAttribute("class", `${ataque.id}-ataque bAtaques`);
        button.textContent=ataque.nombre;
        fragmentoAtaques.appendChild(button);
    })
    contenedorDeAtaques.appendChild(fragmentoAtaques);
//AGREGANDO ESCUCHA DE EVENTOS A BOTONES
    botones = document.querySelectorAll(".bAtaques");
    agregarAtaques();
} 

function agregarAtaques(){
    botones.forEach((boton)=>{
        boton.addEventListener("click", (e)=>{
            if(e.target.textContent === "🔥"){
                ataqueJugador.push("FUEGO");
                boton.style.background= "#73777B";
                boton.disabled = true;
            }else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA");
                boton.style.background= "#73777B";
                boton.disabled = true;
            } else{
                ataqueJugador.push("TIERRA");
                boton.style.background= "#73777B";
                boton.disabled = true;
            }
            if(ataqueJugador.length==5){
                botones.forEach((boton)=>{
                    boton.disabled = true;
                    boton.style.background= "#73777B";
                })
            }
        })
    })
}
function enviarAtaques(){
    fetch(`http://192.168.0.114:8080/mokepon/${jugadorId}/ataques`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo= setInterval(obtenerAtaques,50)
}

function obtenerAtaques(){
    fetch (`http://192.168.0.114:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length===5){
                            ataqueEnemigo=ataques;
                            divInstrucciones.style.display="none";
                            divRegistroBatalla.style.display="flex";
                            batalla();
                        }
                    })
            }
        })
}

function cargarVidas(vidas){
    let corazones='';
    for(let i = 0; i<vidas;i++){
        corazones+="❤";
    }
    return corazones;
}

//BATALLA
function iniciarBatalla(){
    if(ataqueJugador.length==5){
        botonBatalla.innerHTML="Iniciando Batalla"
        enviarAtaques();    
    }else{
        alert("Debes seleccionar al menos 5 ataques para iniciar el juego!")
    }
}

function validarVictorias(){
    if(victoriasJugador>victoriasEnemigo){
        crearMensajeFinal("BATALLA FINALIZADA! Felicitaciones eres el ganador! 🎉🎉🎉");
    } else if(victoriasJugador===victoriasEnemigo){
        crearMensajeFinal("BATALLA FINALIZADA! Empataron");
    } else{
        crearMensajeFinal("BATALLA FINALIZADA! Que mal haz perdido! 😣😣😣");
    }
}

function validarVidas(){
    let finalizarJuego= false;
    if(mascotaEnemigoVida==0){
        finalizarJuego=true;
        crearMensajeFinal("BATALLA FINALIZADA! Felicitaciones eres el ganador! 🎉🎉🎉");
    } else if(mascotaJugadorVida==0){
        finalizarJuego=true;
        crearMensajeFinal("BATALLA FINALIZADA! Que mal haz perdido! 😣😣😣");
    }
    return finalizarJuego;
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = [ataqueJugador[jugador],jugador];
    indexAtaqueEnemigo = [ataqueEnemigo[enemigo],enemigo];
}

function batalla(){
    clearInterval(intervalo);

    for (let i = 0; i < ataqueJugador.length; i++) {
        indexAmbosOponentes(i,i);
        let resultado;
        if (ataqueJugador[i]==ataqueEnemigo[i]){
            resultado= "Empate 😐";
        } else if(ataqueJugador[i]== "FUEGO" && ataqueEnemigo[i]=="TIERRA" || ataqueJugador[i]=="AGUA" && ataqueEnemigo[i]=="FUEGO"||ataqueJugador[i]=="TIERRA"&&ataqueEnemigo[i]=="AGUA"){
            mascotaEnemigoVida-=1;
            victoriasJugador++;
            spanMascotaEnemigoVidas.innerHTML=cargarVidas(mascotaEnemigoVida);
            spanMascotaJugadorVictorias.innerHTML=victoriasJugador;
            spanMascotaEnemigoVictorias.innerHTML=victoriasEnemigo;
            resultado="Ganaste 🎉";
        } else{
            mascotaJugadorVida-=1;
            victoriasEnemigo++;
            spanMascotaJugadorVidas.innerHTML=cargarVidas(mascotaJugadorVida);
            spanMascotaJugadorVictorias.innerHTML=victoriasJugador;
            spanMascotaEnemigoVictorias.innerHTML=victoriasEnemigo;
            resultado="Perdiste 😣";
        }
        crearMensaje(resultado);
        if(validarVidas()){
            break;
        }
    }
    if(!validarVidas()){
        validarVictorias()
    }
}

//MOSTRANDO REGISTRO DE BATALLA
function crearMensaje(resultado){
    let batalla= document.createElement("p");
    let p= document.createElement("p");
    let mensajeBatalla=`Encuentro `+(indexAtaqueJugador[1]+1+':');
    let mensaje= `Tu mascota atacó con ${indexAtaqueJugador[0]}, la mascota del enemigo atacó con ${indexAtaqueEnemigo[0]} - ${resultado}`;
    p.textContent=mensaje;
    batalla.textContent=mensajeBatalla;      
    articleRegistroBatalla.appendChild(batalla);
    articleRegistroBatalla.appendChild(p);

    //MOVER REGISTRO AL FINAL
    indiceMensaje.setAttribute("href",`#${idMensaje}`);
    p.setAttribute("id", idMensaje);
    indiceMensaje.click();
    idMensaje++;
}

function crearMensajeFinal(resultado){
    tituloAtaques.innerHTML=resultado;
//MOSTRANDO Y OCULTANDO SECCIONES
    botonReiniciar.style.display="block";
//DESACTIVANDO Y OCULTANDO BOTONES DE ATAQUE
    botones.forEach((boton)=>{
        boton.style.display="none";
    })

}


function pintarCanvas(){
    mascotaJugador.x+=mascotaJugador.velocidadX
    mascotaJugador.y+=mascotaJugador.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height);
    lienzo.drawImage(
        mapaBakcground,
        0,
        0,
        mapa.width,
        mapa.height,
    );
    mascotaJugador.pintarMokepon();

    enviarPosicion(mascotaJugador.x, mascotaJugador.y)

    mokeponesEnemigos.forEach((mokepon)=>{
        mokepon.pintarMokepon();
        revisarColision(mokepon);
    })

}

function enviarPosicion(x, y){
    fetch(`http://192.168.0.114:8080/mokepon/${jugadorId}/posicion`, {
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            x,
            y
        })
    })
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({enemigos}){
                        mokeponesEnemigos = enemigos.map(function(enemigo){
                            let mokeponEnemigo= null;
                            const mokeponNombre=enemigo.mokepon.nombre || '';
                            if (mokeponNombre === "Bogptile"){
                                mokeponEnemigo= new Mokepon("Bogptile","./assets/images/bogptile.jpg",5,"./assets/images/bogptile.jpg",enemigo.id);
                            } else if(mokeponNombre=== "Peacock"){
                                mokeponEnemigo= new Mokepon("Peacock","./assets/images/peacock.jpg",5, "./assets/images/peacock.jpg",enemigo.id);
                            } else if(mokeponNombre=== "Ratigueya"){
                                mokeponEnemigo= new Mokepon("Ratigueya","./assets/images/ratigueya.jpg",5,"./assets/images/ratigueya.jpg",enemigo.id);
                            } else if (mokeponNombre==="Tectonred"){
                                mokeponEnemigo= new Mokepon("Tectonred","./assets/images/tectonred.jpg",5,"./assets/images/tectonred.jpg",enemigo.id);
                            } else if (mokeponNombre === "Isulv"){
                                mokeponEnemigo= new Mokepon("Isulv","./assets/images/isulv.jpg",5,"./assets/images/isulv.jpg",enemigo.id);
                            } else if(mokeponesNombre ==="Pydos"){
                                mokeponEnemigo= new Mokepon("Pydos","./assets/images/pydos.jpg",5, "./assets/images/pydos.jpg",enemigo.id);
                            }
                            mokeponEnemigo.x=enemigo.x;
                            mokeponEnemigo.y=enemigo.y;
                            return mokeponEnemigo
                        })
                        console.log(mokeponesEnemigos);                        
                    })
            }
        })
}

function moverDerecha(){
    mascotaJugador.velocidadX=1;
}
function moverIzquierda(){
    mascotaJugador.velocidadX=-1;
}
function moverArriba(){
    mascotaJugador.velocidadY=-1;
}
function moverAbajo(){
    mascotaJugador.velocidadY=1;
}
function detenerMovimiento(){
    mascotaJugador.velocidadX=0;
    mascotaJugador.velocidadY=0;
}
function sePresionoUnaTecla(e){
    switch (e.key) {
        case "ArrowUp":
            moverArriba();
            break
        case "w":
            moverArriba();
            break
        case "W":
            moverArriba();
            break
        case "ArrowDown":
            moverAbajo();
            break
        case "s":
            moverAbajo();
            break
        case "S":
            moverAbajo();
            break
        case "ArrowRight":
            moverDerecha();
            break
        case "d":
            moverDerecha();
            break
        case "D":
            moverDerecha();
            break
        case "ArrowLeft":
            moverIzquierda();
            break;
        case "a":
            moverIzquierda();
            break
        case "A":
            moverIzquierda();
            break
        default:
            break
    }
}

function revisarColision(enemigo){
    const arribaEnemigo=enemigo.y;
    const abajoEnemigo=enemigo.y+enemigo.alto;
    const derechaEnemigo=enemigo.x+enemigo.ancho;
    const izquierdaEnemigo=enemigo.x;

    const arribaMascota=mascotaJugador.y;
    const abajoMascota=mascotaJugador.y+mascotaJugador.alto;
    const derechaMascota=mascotaJugador.x+mascotaJugador.ancho;
    const izquierdaMascota=mascotaJugador.x;

    if(
        abajoMascota<arribaEnemigo||
        arribaMascota>abajoEnemigo||
        derechaMascota<izquierdaEnemigo||
        izquierdaMascota>derechaEnemigo
    ){
        return;
    }
    detenerMovimiento();
    clearInterval(intervalo);
    enemigoId= enemigo.id
    /* alert('Te encontraste con '+enemigo.nombre);
    alert('A luchar!'); */
    seleccionarMascotaEnemigo(enemigo);
    sectionVerMapa.style.display="none";
    faseDeBatalla.style.display="grid";
}

function iniciarMapa(){
    intervalo= setInterval(pintarCanvas,10);
    window.addEventListener("keydown", sePresionoUnaTecla);
    window.addEventListener("keyup", detenerMovimiento);
}

function reiniciarJuego(){
    location.reload();
}

window.addEventListener("load", iniciarJuego);