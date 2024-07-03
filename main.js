// Seleciona o elemento que exibe o tamanho da senha
const numeroSenha = document.querySelector('.parametro-senha__texto');
// Define o tamanho inicial da senha
let tamanhoSenha = 12;
// Exibe o tamanho inicial da senha na página
numeroSenha.textContent = tamanhoSenha;

// Define os caracteres disponíveis para a geração da senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Seleciona os botões de incremento e decremento do tamanho da senha
const botoes = document.querySelectorAll('.parametro-senha__botao');
// Seleciona o campo onde a senha gerada será exibida
const campoSenha = document.querySelector('#campo-senha');
// Seleciona os checkboxes que definem quais tipos de caracteres serão incluídos na senha
const checkbox = document.querySelectorAll('.checkbox');
// Seleciona o elemento que exibe a força da senha
const forcaSenha = document.querySelector('.forca');

// Associa funções de clique aos botões de incremento e decremento do tamanho da senha
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Função para diminuir o tamanho da senha
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Função para aumentar o tamanho da senha
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Associa a geração de senha à mudança no estado dos checkboxes
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera uma senha inicial ao carregar a página
geraSenha();

// Função para gerar a senha
function geraSenha() {
    let alfabeto = '';
    // Adiciona letras maiúsculas ao alfabeto se o checkbox correspondente estiver marcado
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    // Adiciona letras minúsculas ao alfabeto se o checkbox correspondente estiver marcado
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    // Adiciona números ao alfabeto se o checkbox correspondente estiver marcado
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    // Adiciona símbolos ao alfabeto se o checkbox correspondente estiver marcado
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }
    // Gera a senha com base no alfabeto criado
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha += alfabeto[numeroAleatorio];
    }
    // Exibe a senha gerada no campo de senha
    campoSenha.value = senha;
    // Classifica a força da senha
    classificaSenha(alfabeto.length);
}

// Função para classificar a força da senha
function classificaSenha(tamanhoAlfabeto){
    // Calcula a entropia da senha
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    // Remove classes de força anteriores
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    // Adiciona a classe de força correspondente à entropia calculada
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57 ) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');
    }
    // Exibe o valor da entropia (em tempo de quebra) na página
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = 2**Math.floor(entropia)/(100e6*60*60*24);
}
