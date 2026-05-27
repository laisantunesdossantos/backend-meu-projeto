function salvarNome(){
    const nome = document.getElementById("nomePerfil").value.trim();

    if(nome === "") return;

    localStorage.setItem("nome", nome);
    mostrarSaudacao();
}

function mostrarSaudacao(){
    const nome = localStorage.getItem("nome");
    const saudacao = document.getElementById("saudacao");

    if(nome){
        saudacao.innerText = "Olá, " + nome + ", seja bem-vindo!";
    }
}

mostrarSaudacao();

function pegarLocalizacao(){
    const p = document.getElementById("localizacao");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
            p.innerText =
                "Latitude: " + pos.coords.latitude +
                " | Longitude: " + pos.coords.longitude;
        }, () => {
            p.innerText = "Erro ao obter localização";
        });
    }else{
        p.innerText = "Geolocalização não suportada";
    }
}

function enviarNotificacao(){

    if(Notification.permission === "granted"){
        new Notification("Bem-vindo ao site!");
    } else if(Notification.permission !== "denied"){
        Notification.requestPermission().then(permission => {
            if(permission === "granted"){
                new Notification("Bem-vindo ao site!");
            }
        });
    }
}

function telaCheia(){
    if(document.documentElement.requestFullscreen){
        document.documentElement.requestFullscreen();
    }
}

async function verBateria(){
    const p = document.getElementById("bateria");

    if(navigator.getBattery){
        const battery = await navigator.getBattery();
        p.innerText = "Bateria: " + (battery.level * 100).toFixed(0) + "%";
    }else{
        p.innerText = "API de bateria não suportada";
    }
}