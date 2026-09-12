// Sign
const sign = document.getElementById("sign");

//Buttons
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const b4 = document.getElementById("b4");

const rb = document.getElementById("rb");

const wb = document.getElementById("wb");

const mb = document.getElementById("mb");
let mb_canPress = true;
let muted = false;

let choosen_button = "";
let button_pressing_active = false;

// System ('w' == "word")
let q = "Next Word coming soon...";
let a = "Right Answer";
let w1 = "";
let w2 = "";
let w3 = "";
let w4 = "";

let rand = 0;
let randr = 0;
let r1 = 0;
let r2 = 0;
let r3 = 0;
let r4 = 0;

let counter = 0; // This counts how many how have the user have passed already.

let sizeof_words = 0;

// sounds
const good_answer = new Audio("good_answer.mp3");
const bad_answer = new Audio("bad_answer.mp3");

const alreadyUsedWords = [];

async function loadWords() { // ChatGPT supported this function, cause I don't really know JSON
    try {
        const response = await fetch("UnitOfWords.json");
        const data = await response.json();

        console.log("Words loaded:", data);
        
        sizeof_words = data.EnglishWords.length;

        // Pick random word and options
        rand = Math.floor(Math.random() * data.EnglishWords.length); // the right answer

        if (alreadyUsedWords.length >= data.EnglishWords.length) { // A fix provided by ChatGPT, because of infinite loop.
            sign.innerText = "All words completed!";
            // optional: disable buttons here
            return;
        }
        
        do {
        rand = Math.floor(Math.random() * data.EnglishWords.length);
        } while (alreadyUsedWords.includes(data.EnglishWords[rand].en));

        alreadyUsedWords.push(data.EnglishWords[rand].en);

        q = data.EnglishWords[rand]["hun"]; // question
        a = data.EnglishWords[rand]["en"]; // answer

        r1 = Math.floor(Math.random() * data.EnglishWords.length);
        w1 = data.EnglishWords[r1]["en"];

        r2 = Math.floor(Math.random() * data.EnglishWords.length);
        w2 = data.EnglishWords[r2]["en"];

        r3 = Math.floor(Math.random() * data.EnglishWords.length);
        w3 = data.EnglishWords[r3]["en"];

        r4 = Math.floor(Math.random() * data.EnglishWords.length);
        w4 = data.EnglishWords[r4]["en"];

        randr = Math.floor(Math.random() * 4);
        if (randr == 0){
            w1 = data.EnglishWords[rand]["en"];
        } else if (randr == 1){
            w2 = data.EnglishWords[rand]["en"];
        } else if (randr == 2){
            w3 = data.EnglishWords[rand]["en"];
        } else if (randr == 3){
            w4 = data.EnglishWords[rand]["en"];
        }

        // Update the UI
        sign.innerText = q + "\n" + counter + "/" + sizeof_words;
        b1.innerText = w1;
        b2.innerText = w2;
        b3.innerText = w3;
        b4.innerText = w4;
        
        if (counter >= sizeof_words) {document.location.reload(true);} // Refresh page when all words done, so you can do all of it again.

    } catch (error) {
        console.error("Error loading words:", error);
    }
}

function check_a(answer){
    if (answer == a)
    {   
        if (!muted) {good_answer.pause();good_answer.play();}
        counter++;
        loadWords();
    } else {if (!muted) {bad_answer.pause();bad_answer.play();}}
}

document.addEventListener("DOMContentLoaded",() => {

    loadWords();

    // Button even handling
    b1.addEventListener("click",() => {
        document.documentElement.style.setProperty("--b1","0px");
        document.documentElement.style.setProperty("--bt1","10px");        
        choosen_button = "b1";
        button_pressing_active = true;
        check_a(w1);
    });
    b1.addEventListener("transitionend",() => {
        document.documentElement.style.setProperty("--b1","10px");
        document.documentElement.style.setProperty("--bt1","0px");
        button_pressing_active = false;
    });

    b2.addEventListener("click",() => {
        document.documentElement.style.setProperty("--b2","0px");
        document.documentElement.style.setProperty("--bt2","10px");        
        choosen_button = "b2";
        button_pressing_active = true;
        check_a(w2);
    });
    b2.addEventListener("transitionend",() => {
        document.documentElement.style.setProperty("--b2","10px");
        document.documentElement.style.setProperty("--bt2","0px");
        button_pressing_active = false; 
    });

    b3.addEventListener("click",() => {
        document.documentElement.style.setProperty("--b3","0px");
        document.documentElement.style.setProperty("--bt3","10px");        
        choosen_button = "b3";
        button_pressing_active = true;
        check_a(w3);
    });
    b3.addEventListener("transitionend",() => {
        document.documentElement.style.setProperty("--b3","10px");
        document.documentElement.style.setProperty("--bt3","0px");
        button_pressing_active = false; 
    });

    b4.addEventListener("click",() => {
        document.documentElement.style.setProperty("--b4","0px");
        document.documentElement.style.setProperty("--bt4","10px");        
        choosen_button = "b4";
        button_pressing_active = true;
        check_a(w4);
    });
    b4.addEventListener("transitionend",() => {
        document.documentElement.style.setProperty("--b4","10px");
        document.documentElement.style.setProperty("--bt4","0px");
        button_pressing_active = false; 
    });

    // restart button
    rb.addEventListener("click",() => {
        document.documentElement.style.setProperty("--rb","0px");
        document.documentElement.style.setProperty("--rbt","10px");        
        button_pressing_active = true;
    });
    rb.addEventListener("transitionend",() => {
        document.documentElement.style.setProperty("--rb","10px");
        document.documentElement.style.setProperty("--rbt","0px");
        button_pressing_active = false;
        document.location.reload(true);
    });

    // show words buttons
    wb.addEventListener("click",() => {
        document.documentElement.style.setProperty("--wb","0px");
        document.documentElement.style.setProperty("--wbt","10px");        
        button_pressing_active = true;
    });
    wb.addEventListener("transitionend",() => {
        document.documentElement.style.setProperty("--wb","10px");
        document.documentElement.style.setProperty("--wbt","0px");
        button_pressing_active = false;
        window.location.href = "show_words.html";
    });

    // mute button
    // document.documentElement.style.setProperty("--mb-state","off");
    mb.addEventListener("click",() => {
        document.documentElement.style.setProperty("--mb","0px");
        document.documentElement.style.setProperty("--mbt","10px");        
        button_pressing_active = true;
        let bodystyle = window.getComputedStyle(document.body)
        let state = bodystyle.getPropertyValue("--mb-state");

        if (state === "off") {
            document.documentElement.style.setProperty("--mb-main-color",bodystyle.getPropertyValue("--mb-main-on-color"))
            document.documentElement.style.setProperty("--mb-outline-color",bodystyle.getPropertyValue("--mb-outline-on-color"))
            document.documentElement.style.setProperty("--mb-state","on");
            muted = false;
        }
        else 
        if (state === "on") {
            document.documentElement.style.setProperty("--mb-main-color",bodystyle.getPropertyValue("--mb-main-off-color"))
            document.documentElement.style.setProperty("--mb-outline-color",bodystyle.getPropertyValue("--mb-outline-off-color"))
            document.documentElement.style.setProperty("--mb-state","off");
            muted = true;
        }
        else {
            alert("What am I? -> "+state);
            // somehow when in style.css "" is used, the final value will be for example
            // "off" not off when read as string, so ""on"" instead of "on"
        }

        console.log(muted);

        // debugging stuff
        // document.getElementById("i1").textContent = state;
        // document.getElementById("i2").textContent = bodystyle.getPropertyValue("--mb-main-color");
        // document.getElementById("i3").textContent = bodystyle.getPropertyValue("--mb-outline-color");
    });

    mb.addEventListener("transitionend",() => {
        document.documentElement.style.setProperty("--mb","10px");
        document.documentElement.style.setProperty("--mbt","0px");
        button_pressing_active = false;
    });
});
