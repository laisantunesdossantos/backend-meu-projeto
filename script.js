const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

const btnCep = document.getElementById("buscarCep");
const enderecoDiv = document.getElementById("endereco");

btnCep.addEventListener("click", async function(){

    let cep = document.getElementById("cep").value.trim();

    enderecoDiv.innerHTML = "Carregando...";

    if(!/^\d{5}-?\d{3}$/.test(cep)){
        enderecoDiv.innerHTML = "CEP inválido";
        return;
    }

    cep = cep.replace("-", "");

    try{
        const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);

        if(!res.ok){
            enderecoDiv.innerHTML = "CEP não encontrado";
            return;
        }

        const data = await res.json();

        enderecoDiv.innerHTML = `
            <p><b>CEP:</b> ${data.cep}</p>
            <p><b>Rua:</b> ${data.street}</p>
            <p><b>Bairro:</b> ${data.neighborhood}</p>
            <p><b>Cidade:</b> ${data.city}</p>
            <p><b>Estado:</b> ${data.state}</p>
        `;

        localStorage.setItem("cep", cep);
        localStorage.setItem("endereco", JSON.stringify(data));

    }catch{
        enderecoDiv.innerHTML = "Erro ao buscar CEP";
    }

});

window.onload = function(){

    const cepSalvo = localStorage.getItem("cep");
    const enderecoSalvo = localStorage.getItem("endereco");

    if(cepSalvo){
        document.getElementById("cep").value = cepSalvo;
    }

    if(enderecoSalvo){
        const data = JSON.parse(enderecoSalvo);

        enderecoDiv.innerHTML = `
            <p><b>CEP:</b> ${data.cep}</p>
            <p><b>Rua:</b> ${data.street}</p>
            <p><b>Bairro:</b> ${data.neighborhood}</p>
            <p><b>Cidade:</b> ${data.city}</p>
            <p><b>Estado:</b> ${data.state}</p>
        `;
    }
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    mensagem.innerHTML = "";

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    let erros = [];

    if (nome.split(" ").length < 2) {
        erros.push("Digite nome e sobrenome");
    }

    const regexTelefone = /^\d{2}\s\d{5}-\d{4}$/;
    if (!regexTelefone.test(telefone)) {
        erros.push("Telefone inválido (00 00000-0000)");
    }

    const regexCep = /^\d{5}-\d{3}$/;
    if (!regexCep.test(cep)) {
        erros.push("CEP inválido (00000-000)");
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        erros.push("Email inválido");
    }

    if (senha.length < 6) {
        erros.push("Senha deve ter no mínimo 6 caracteres");
    }

    if (senha !== confirmarSenha) {
        erros.push("As senhas não coincidem");
    }

    if (erros.length > 0) {
        mensagem.innerHTML = erros.map(e => `<p>${e}</p>`).join("");
        mensagem.style.color = "red";
        return;
    }

    try {
        const resposta = await fetch("https://backend-node-nmze.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nome,
                email: email,
                phone: telefone,
                cep: cep,
                password: senha,
                confirmPassword: confirmarSenha
            })
        });

        const data = await resposta.json();

        if (!resposta.ok) {
            mensagem.style.color = "red";
            mensagem.innerHTML = JSON.stringify(data);
            return;
        }

        mensagem.style.color = "green";
        mensagem.innerHTML = `
            Parabéns <b>${nome}</b>, cadastro realizado!<br>
            Você ganhou: <b>${data.gift}</b>
        `;

    } catch (erro) {
        mensagem.style.color = "orange";
        mensagem.innerHTML = "Servidor indisponível. Tente novamente.";
    }
});