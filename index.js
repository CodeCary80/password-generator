const lengthInput = document.getElementById('length-input');
const strengthText = document.getElementById('strength-text');
const generateBtn = document.querySelector('button');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];


lengthInput.addEventListener('input',function(){
    const length = parseInt(this.value);

    strengthText.className = '';

    if(isNaN(length) || length === 0){
        strengthText.textContent = "";
    }else if (length < 8){
        strengthText.textContent = 'weak';
        strengthText.className = 'weak';
    }else if(length < 12){
        strengthText.textContent = 'good';
        strengthText.className = 'good';
    }else if(length < 16){
        strengthText.textContent = 'stong';
        strengthText.className = 'strong';
    }else{
        strengthText.textContent = 'excellent';
        strengthText.className = 'excellent';
    }
});

function isUppercase(char){
    return char>='A'&& char<='Z';
}
function isLowercase(char){
    return char>='a'&& char<='z';
}
function isNumber(char){
    return char>='0'&& char<='9';
}
function isSymbol(char){
    return !isUppercase(char) && !isLowercase(char) && !isNumber(char);
}

function generatePassword(length, availableChars){
    let password = '';
    for(let i=0; i<length; i++){
        const randomIndex = Math.floor(Math.random()*availableChars.length);
        password += availableChars[randomIndex];
    }
    return password;
}

generateBtn.addEventListener('click',function(){
    const length = parseInt(lengthInput.value);

    const checkboxes = document.querySelectorAll(
  '#controller-left input[type="checkbox"]'
);

    const includeUppercase = checkboxes[0].checked;
    const includeLowercase = checkboxes[1].checked;
    const includeNumbers = checkboxes[2].checked;
    const includeSymbols = checkboxes[3].checked;

    let availableChars = characters.filter(char=>{
        if(includeUppercase && isUppercase(char)) return true;
        if(includeLowercase && isLowercase(char)) return true;
        if(includeNumbers && isNumber(char)) return true;
        if(includeSymbols && isSymbol(char)) return true;
        return false;
    });

    if(availableChars.length === 0){
        alert('Please select at least one character type');
        return;
    }
    password1.textContent = generatePassword(length,availableChars);
    password2.textContent = generatePassword(length,availableChars);
});

function copyAndShowCopied(element){
    const originalText = element.textContent;

    if(!originalText) return;

    navigator.clipboard.writeText(originalText);
    element.textContent = "Copied!"

    setTimeout(()=>{
        element.textContent = originalText;
    },1800);
}

password1.addEventListener('click',function(){
    copyAndShowCopied(password1);
})

password2.addEventListener('click',function(){
    copyAndShowCopied(password2);
})