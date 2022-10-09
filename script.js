const lengthSlider = document.querySelector(".pass-length input");
msg = document.querySelector(".msg"),
closeIcon = document.querySelector('.material-symbols-outlined'),
progress = document.querySelector(".progress"),
generateBtn = document.querySelector(".generate-btn"),
passwordInput = document.querySelector(".input-box input"),
copyIcon = document.querySelector(".input-box span"),
passIndicator = document.querySelector(".pass-indicator"),
options = document.querySelectorAll(".option input");

const characters = { 
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>≃"
}

const generatePassword = () =>{
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => {
        if(option.checked){//checks if option is marked
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id]
            }else if(option.id === "spaces") {//if checkbox id is spaces
                staticPassword += `  ${staticPassword}  `;
            }else{//pass TRUE value to excludeDuplicate
                excludeDuplicate = true;
            }
        }
        
    });

    for(let i =0; i < passLength; i++){//random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){//if excludeDuplicate is true
            !randomPassword.includes(randomChar) || randomChar == "" ? randomPassword += randomChar : i--;
        }else{//add random character to randomPassword
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;//Passing randomPasswrod to passwordInput value
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <=16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerHTML = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

const copyPassword = () =>{
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1500);
}

document.querySelector('.generate-btn').onclick = function () {
    msg.classList.add("active");
    progress.classList.add("active");

    setTimeout(() =>{
        msg.classList.remove("active");
        progress.classList.remove("active");
    },3200);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input",updateSlider);
generateBtn.addEventListener("click", generatePassword);
closeIcon.addEventListener("click", () => {
    msg.classList.remove("active");
})