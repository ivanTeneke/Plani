//Chatbox modficar el contendio
function getBotResponse(input) {
if (input == "A") {
    return "Antes de continuar ¿Sabías que el Proyectar es de uso obligatorio a partir de la Resolución Nº 3609/22? Por lo tanto, es muy importante que conozcas la plataforma. Ahora bien, sobre qué tenés dudas:"+
    '\nD)	Manual de Uso del Proyectar '+
    '\nE)	Manual de Guía para la Carga de Seguimiento a Proyectos en Ejecución';
} else if (input == "D") {
    return "Manual de Uso del Proyectar"+
    "\nA continuación, se adjunta un link con la información solicitada"+
    "\nhttps://drive.google.com/file/d/1A1p7XvwESqvG8gSyOBcL5lDJwSDbkPA8/view?usp=sharing";
} else if (input == "E") {
    return "Manual de Guía para la Carga de Seguimiento a Proyectos en Ejecución "+
    "\nA continuación, se adjunta un link con la información solicitada"+
    "\nhttps://drive.google.com/file/d/1RLWaOZfZlTUEEOEbRli81ti2FHZ4kFv1/view?usp=sharing";
} else if (input == "B") {
    return "Seleccionar el numero de secretaria que pertenece "+
    '\n1. Intendecia'+
    '\n2. Sec. de Cordinacion de Gobierno' +
    '\n3. Sec. de Hacienda ' +
    '\n4. Sec. de Desarrollo Urbano' +
    '\n5. Sec. de Desarrollo Economico' +
    '\n6. Sec. de Infraestructura' +
    '\n7. Sec. de Salud' +
    '\n8. Sec. de Ambiente y Desarrollo Sustentable' +
    '\n9. Sec. de Movilidad Urbana y Seguridad Ciudadania' +
    '\n10. Sec. de Cultura y Educacion' +
    '\n11. Sec. de Desarrollo Humano' +
    '\n12. Sec. de Turismo y Deportes' +
    '\n13. Sec. de Tribunal de Faltas';
}else {
    return "Didn't get that, try asking something else";
}
}

var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");

        var content =this.nextElementSibling;

        if (content.style.maxHeight){
            content.style.maxHeight = null;
        }else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours
    }

    if (minutes < 10) {
        minutes = "0" + minutes
    }

    let time = hours + ":" + minutes;
    return time;
}
// aca va la respuesta que se va a visualizar al abrir el chat (deben corregir el espacio no los esta tomando bien. Buscar otra alternativa)
function firstBotMessage() {
    let firstMessage = "Bienvenido 🤗, \nTe comunicaste con la Subsecretaria de Planificación y Análisis de Gestión, para continuar debe seleccionar alguna de las siguientes opciones" 
    +"\nA) Información sobre el proyectar" 
    +"\nB) Asesoramiento por secretaria"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);

}

firstBotMessage();

function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHTML = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHTML);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText == "Let's shop at Tokyos!";
    }

    let userHTML = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHTML);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    },2000)
}

function buttonSendText(sampleText) {
    let userHTML = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHTML);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Loved!")
}

$("#textInput").keypress(function(e) {
    if(e.which == 13) {
        getResponse();
    }
});