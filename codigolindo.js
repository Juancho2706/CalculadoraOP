let $elinput = document.querySelector('.untext');                           //Dom for White bar to display values
let $calculadorabuttons = document.querySelector('.botonescalculadora');    //Dom for num buttons
const marcobotones = document.createElement('div');                         //Creating a space to put the buttons
marcobotones.classList.add('marcobotones');
$calculadorabuttons.append(marcobotones);
let sepresiono1eravez = false,
    operadoranterior = '';
$elinput.value = '0';

for (let index = 9; index >= 0; index--) {      //FOR TO MAKE NUMBER BUTTONS
    const botonescalculadora = document.createElement('button');
    botonescalculadora.textContent = index;
    botonescalculadora.classList = 'botones';
    if(index == 0){
        botonescalculadora.classList.add('zero');
    }
    botonescalculadora.addEventListener('click', function(e){
        if($elinput.value == '0'){
            return $elinput.value = index;
        }
        return $elinput.value += index;
    })
    botonescalculadora.addEventListener('click', function(e){
        verificar(false);
        sepresiono1eravez = false;
    })
    marcobotones.append(botonescalculadora);
}
const operantes = {                             //THIS IS TO CREATE AN OBJECT OF OPERATORS
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
}
function teclaslocas(index){                    //ADDING KEYBOARD SUPPORT TO NUMBERS
    if(typeof index === 'string' && !isNaN(parseInt(index))){
        if($elinput.value == '0'){
                verificar(false);
                return $elinput.value = index;
            }
            verificar(false);
            return $elinput.value += index;
    }
    
}
const marcooperadores = document.createElement('div');
marcooperadores.classList.add('marcooperadores');
$calculadorabuttons.append(marcooperadores);

for (let index = 0; index < 8; index++) {       //FOR TO MAKE THE OPERANTS BUTTONS
    const botonesoperantes = document.createElement('button');
    botonesoperantes.textContent = operantes[index].operador;
    botonesoperantes.classList = operantes[index].clase;
    botonesoperantes.classList.add('botones');
    if(index < 2){
        botonesoperantes.classList.add('botonborrar');
}
    if(index >= 2){
            botonesoperantes.classList.add('botonoperador');
    }
    botonesoperantes.addEventListener('click', function(e){
        elevento(index)})
    marcooperadores.append(botonesoperantes);
}
const todoslosoperadores = document.querySelectorAll('.botonoperador');     //DOM FOR SELECTING ALL THE OPERANTS BUTTONS

function verificar(prendeapaga){                //CHECK IF THERE IS ALREADY A '.' AND IF IT ALTERNATES BETWEEN DISABLING THE OPERANTS OR NOT
        todoslosoperadores.forEach(element => {
            element.disabled = prendeapaga;
        });
        if($elinput.value.indexOf('.') !== -1){
            todoslosoperadores[4].disabled = true;
        }
}
function nuevaigual(valorinput){                //MAKES A NEW FUNCTION WITH THE INPUT VALUE AND RETURNS THE EQUATION
    let stringfuncion = String('return ' + valorinput);
    let nuevaigual = new Function(stringfuncion);
    
    if(Number.isInteger(nuevaigual())){
        return nuevaigual();
    }else{
        return nuevaigual().toFixed(2);
    }
}
function elevento(index){                       //MAIN FUNCTION, this takes the operators and resolve the math problem and evaluates it
    switch(operantes[index].operador){
        case 'Borrar':
            $elinput.value = $elinput.value.slice(0,-1);
            if(!(/\d$/.test($elinput.value))){
                verificar(true);
            }else{
                verificar(false);
            }
            if($elinput.value == ''){
                $elinput.value = '0';
                verificar(false);
            }
            break;
        case 'C':
            verificar(false);
            todoslosoperadores[4].disabled = false;
            return $elinput.value = '0';
        default:
            if(sepresiono1eravez == true){
                     sepresiono1eravez = false;
                     verificar(false);
                     return $elinput.value = nuevaigual($elinput.value).toString();
            }
            switch(operantes[index].operador){
            case '+':
            case '-':
            case '*':
            case '/':
                entrecero($elinput.value);
                // sepresiono1eravez = true;
                verificar(true);
                // $elinput.textContent = nuevaigual($elinput.value) + operantes[index].operador;
                return $elinput.value = nuevaigual($elinput.value) + operantes[index].operador;
            case '=':
                verificar(false);
                if($elinput.value.indexOf('.') !== -1){
                    todoslosoperadores[4].disabled = true;
                }
                entrecero($elinput.value);
                return $elinput.value = nuevaigual($elinput.value);
            case '.':
                verificar(true);
                return $elinput.value = $elinput.value + operantes[index].operador;
            }   
    }
}
document.addEventListener('keydown', function(e){ //TO ADD KEY SUPPORT FOR THE OPERANTS
    if((todoslosoperadores[4].disabled) == true){
        let key = e.key;
        console.log(key);
        return teclaslocas(key);
    }
    if($elinput.value.indexOf(operantes.operador) !== -1){
        todoslosoperadores[4].disabled = true;
    }
        let key = e.key;
        console.log(key);
        teclaslocas(key);
        switch(key){
                case '+':
                case '-':
                case '*':
                case '/':
                case '=':
                case '.':
                    for (let index = 0; index < 8; index++) {
                        if(operantes[index].operador == key){
                            return elevento(index);
                        }
                    }
                case 'Delete':
                    return elevento(1);
                case 'Backspace':
                    return elevento(0);
                case 'Enter':
                    return elevento(6);
            }
           
})
function entrecero (valor){                     //CANT DIVIDE TO 0
    if(valor.includes('/0')){
        alert('Told ya');
        $elinput.value = "0";
        return window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
}