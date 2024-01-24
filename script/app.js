const criptographedMap = new Map([
    ['a', 'ai'],
    ['e', 'enter'],
    ['i', 'imes'],
    ['o', 'ober'],
    ['u', 'ufat']
]);

const decodedMap = {
    'ai': 'A',
    'enter': 'E',
    'imes': 'I',
    'ober': 'O',
    'ufat': 'U'
}

const ELEMENT_IDS = {
    INPUT: 'input',
    RECTANGLE_TEXT: 'rectangle_text',
    COPY_BUTTON: 'copy',
    RECTANGLE_IMG: 'rectangle_img',
    RECTANGLE_H2: 'rectangle_h2'
};

let rectangleImgExists = true;
let copyButtonExists = false;

function getText() {
    return document.getElementById(ELEMENT_IDS.INPUT).value;
}

function removeElement(id) {
    var element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function changeParagraph(result) {
    var paragraph = document.getElementById(ELEMENT_IDS.RECTANGLE_TEXT);
    paragraph.innerHTML = result;
    paragraph.style.height = '48.8rem';
}

function changeRightDiv(result) {
    removeElement(ELEMENT_IDS.RECTANGLE_IMG);
    removeElement(ELEMENT_IDS.RECTANGLE_H2);
    changeParagraph(result);

    var rightDiv = document.querySelector('.content__right_div');
    if(!copyButtonExists){
        var copyButton = createCopyButton();
        rightDiv.appendChild(copyButton);
    }


    rectangleImgExists = false;
}

function createImg() {
    var img = document.createElement('img');
    img.src = '../assets/High quality products 1 1.svg';
    img.id = ELEMENT_IDS.RECTANGLE_IMG;
    img.alt = 'boy with a magnifier';

    return img;
}

function createH2() {
    var h2 = document.createElement('h2');
    h2.id = ELEMENT_IDS.RECTANGLE_H2;
    h2.className = 'content__section__rectangle__h2';
    h2.innerHTML = 'Nenhuma mensagem encontrada';

    return h2;
}

function createParagraph() {
    var p = document.createElement('p');
    p.id = ELEMENT_IDS.RECTANGLE_TEXT;
    p.className = 'content__section__rectangle__paragraph';
    p.innerHTML = 'Digite um texto que você deseja criptografar ou descriptografar.';

    return p;
}

function createCopyButton() {
    var button = document.createElement('button');
    button.textContent = 'Copiar';
    button.id = ELEMENT_IDS.COPY_BUTTON;
    button.type = 'button';
    button.onclick = copyText;

    copyButtonExists = true;

    return button;
}

function resetRightDiv() {
    removeElement(ELEMENT_IDS.COPY_BUTTON);
    removeElement(ELEMENT_IDS.RECTANGLE_TEXT);
    var textDiv = document.querySelector('.content__section__rectangle__text');
    var rightDiv = document.querySelector('.content__section__rectangle__div');

    textDiv.appendChild(createH2());
    textDiv.appendChild(createParagraph());

    rightDiv.appendChild(createImg());
    rightDiv.appendChild(textDiv);

    rectangleImgExists = true;
    copyButtonExists = false;
}

function copyText() {

    const button = document.getElementById('copy');
    console.log(button);

    button.addEventListener('click', function(event) {
        event.preventDefault();
        const source = document.getElementById(ELEMENT_IDS.RECTANGLE_TEXT);
        const text = source.innerText;

        navigator.clipboard.writeText(text).then(() => {
          
            console.log('Texto copiado: ' + text);
        })
        .catch((err) => {
            
            console.error('Erro ao copiar texto:', err);
        });
    });
}

function criptograph() {
    let text = getText();

    if (!text.trim()) {
        if (!rectangleImgExists) {
            resetRightDiv();
        }
    }else{
        let length = text.length;
        let result = '';

        for (let pointer = 0; pointer < length; pointer++) {
            let letter = text[pointer];
            console.log(`pointer: ${pointer} || letter: ${letter}`);

            if (criptographedMap.has(letter)) {
                let word = criptographedMap.get(letter);
                result += word;
                console.log(`word: ${word} || text: ${result}`);
            } else {
                result += letter;
            }
        }


        changeRightDiv(result);

        console.log(`result= ${result}`);
    }
}

function decode(){
    let text = getText();

    if (!text.trim()) {
        if (!rectangleImgExists) {
            resetRightDiv();
        }
    }
    else{

        for(const [pattern, value] of Object.entries(decodedMap)){
            const regex = new RegExp(pattern, 'g'); // criando um regex para substituir todas as ocorrencias do padrao
            text = text.replace(regex, value);
        }
        
        result = text.toLowerCase();

        changeRightDiv(result);
    }
}