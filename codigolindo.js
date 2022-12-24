let $elinput = document.querySelector('.untext');
let $acaba = document.querySelector('.acaba');
let $calculadorabuttons = document.querySelector('.botonescalculadora');
const marcobotones = document.createElement('div');
marcobotones.classList.add('marcobotones');
$calculadorabuttons.append(marcobotones);
let sepresiono1eravez = false,
    operadoranterior = '';

for (let index = 9; index >= 0; index--) {
    const botonescalculadora = document.createElement('button');
    botonescalculadora.textContent = index;
    botonescalculadora.classList = 'botones';
    if(index == 0){
        botonescalculadora.classList.add('zero');
    }
    botonescalculadora.addEventListener('click', function(e){
        return $elinput.value += index;
    })
    botonescalculadora.addEventListener('click', function(e){
        return verificar($elinput.value);
    })
    marcobotones.append(botonescalculadora);
}
const operantes = {
        0: {operador: 'Borrar',
        clase: 'backspace'},
        1: {operador: 'C',
        clase: 'clear'},
        2: {operador: '+',
        clase: 'suma'},
        3: {operador: '-',
        clase: 'resta'},
        4: {operador: '*',
        clase: 'multiplicacion'},
        5: {operador: '/',
        clase: 'division'},
        6: {operador: '.',
        clase: 'decimal'},  
        7: {operador: '=',
        clase: 'igual'},
} //objeto con los operantes (4), clear e igual

const marcooperadores = document.createElement('div');
marcooperadores.classList.add('marcooperadores');
$calculadorabuttons.append(marcooperadores);

for (let index = 0; index < 8; index++) {
    const botonesoperantes = document.createElement('button');
    botonesoperantes.textContent = operantes[index].operador;
    botonesoperantes.classList = operantes[index].clase;
    botonesoperantes.classList.add('botones');
    if(index >= 2){
            botonesoperantes.classList.add('botonoperador');
    }
    botonesoperantes.addEventListener('click', function(e){
        switch(operantes[index].operador){
            case 'Borrar':
                return $elinput.value = $elinput.value.slice(0,-1);
            case 'C':
                return $elinput.value = '';
            default:
                if(sepresiono1eravez == false){
                    $elinput.value += operantes[index].operador;
                    operadoranterior = operantes[index].operador;
                    sepresiono1eravez = true;
                }else{
                    // operadoranterior = operantes[index].operador;
                    // sepresiono1eravez = false;
                    return $elinput.value = procesomatematico($elinput.value,operantes[index].operador);
                }
                
        }
    })
    botonesoperantes.addEventListener('click', function(e){
        return verificar($elinput.value);
    })
    marcooperadores.append(botonesoperantes);
}

function procesomatematico(elvalor, operador){
    let splitarray = elvalor.split(operadoranterior);

    if(operador == '='){

        let stringfuncion = String('return' + splitarray[0]+operadoranterior+splitarray[1])
        let nuevaigual = new Function(stringfuncion);
        return nuevaigual();
    }

    if(!(isNaN(Number(elvalor.charAt(elvalor.length - 1))))){
        switch(operadoranterior){
                case '+':
                    operadoranterior = operador;
                    return Number(splitarray[0]) + Number(splitarray[1]) + operador;
                case '-':
                    operadoranterior = operador;
                    return Number(splitarray[0]) - Number(splitarray[1]) + operador;
                case '*':
                    operadoranterior = operador;
                    return Number(splitarray[0]) * Number(splitarray[1]) + operador;
                case '/':
                    operadoranterior = operador;
                    return Number(splitarray[0]) / Number(splitarray[1]) + operador;
                default:
                    break;            
            }
    }else{
        return elvalor + operador;
    }
}
function verificar(elstring){
    if(isNaN(Number(elstring.charAt(elstring.length - 1)))){
        todoslosoperadores.forEach(element => {
            element.disabled = true;
        });
    }else{
        todoslosoperadores.forEach(element => {
            element.disabled = false;
        });
    }
}

let todoslosoperadores = document.querySelectorAll('.botonoperador');