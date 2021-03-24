const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const ULTIMO_NIVEL = 7;
class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(() => {this.sgteNivel()}, 500);
    }
    inicializar() {
        this.sgteNivel = this.sgteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        btnEmpezar.classList.toggle('hide');
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
        console.log(this.secuencia);
    }
    sgteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia();     
        this.agregarEventosClick();
    }
    numeroAColor(num) {
        switch (num) {
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }
    }
    colorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
        }
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.numeroAColor(this.secuencia[i]);
            setTimeout( () => this.iluminarColor(color), 1000 * i);
        }
    }
    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout( () => this.apagarColor(color), 500);
    }
    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }
    agregarEventosClick() {
        // var selfO_this = this
        this.colores.celeste.addEventListener('click', this.elegirColor); // .bing(selfO_this)
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
    }
    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
    }
    elegirColor(ev) {
        // js puede perder el contexto
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.colorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        console.log(numeroColor === this.secuencia[this.subnivel]);
        if(numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if(this.subnivel === this.nivel) {
                this.nivel++;
                this.eliminarEventosClick();
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganaste();
                } else {
                    setTimeout(() => {
                        this.sgteNivel();
                    }, 1000)
                }
            } 
        } else {
                console.log('mal!');
                this.perdiste();
        }
    }
    ganaste() {
        swal('Secuencias','Ganaste!', 'success')
            .then( () => {
                this.inicializar();
            })
    }
    perdiste() {
        swal('Secuencias', 'Vuelve a intentarlo', 'error')
            .then( ()=> {
                this.eliminarEventosClick();
                this.inicializar();
            })
    }
}
const empezarJuego = () => {
    window.juego = new Juego()
}