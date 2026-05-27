const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sou um projeto Node + Express!');
});

const posts = [
    { id: 1, titulo: "Lançamento do novo sistema", descricao: "Confira todas as novidades da atualização mais recente do nosso sistema de gestão.", autor: "Maria Silva", dataPublicacao: "2026-04-28", fotoAutor: "https://i.pravatar.cc/150?img=1" },
    { id: 2, titulo: "Dicas de produtividade para devs", descricao: "Aprenda como organizar seu tempo e entregar mais projetos com qualidade.", autor: "João Souza", dataPublicacao: "2026-04-25", fotoAutor: "https://i.pravatar.cc/150?img=2" },
    { id: 3, titulo: "Introdução ao Node.js", descricao: "Um guia completo para quem está começando a aprender desenvolvimento back-end.", autor: "Ana Costa", dataPublicacao: "2026-04-22", fotoAutor: "https://i.pravatar.cc/150?img=3" },
    { id: 4, titulo: "CSS Grid na prática", descricao: "Exemplos reais de layouts responsivos usando CSS Grid moderno.", autor: "Pedro Lima", dataPublicacao: "2026-04-20", fotoAutor: "https://i.pravatar.cc/150?img=4" },
    { id: 5, titulo: "JavaScript assíncrono com async/await", descricao: "Entenda de vez como funciona a programação assíncrona em JavaScript.", autor: "Carla Mendes", dataPublicacao: "2026-04-18", fotoAutor: "https://i.pravatar.cc/150?img=5" },
    { id: 6, titulo: "Como criar uma API REST do zero", descricao: "Passo a passo para construir sua primeira API com Node.js e Express.", autor: "Rafael Torres", dataPublicacao: "2026-04-15", fotoAutor: "https://i.pravatar.cc/150?img=6" },
    { id: 7, titulo: "Banco de dados com PostgreSQL", descricao: "Aprenda os fundamentos do banco de dados relacional mais popular do mercado.", autor: "Fernanda Rocha", dataPublicacao: "2026-04-13", fotoAutor: "https://i.pravatar.cc/150?img=7" },
    { id: 8, titulo: "Deploy no Render: guia completo", descricao: "Saiba como publicar sua aplicação Node.js no Render de forma gratuita.", autor: "Lucas Alves", dataPublicacao: "2026-04-10", fotoAutor: "https://i.pravatar.cc/150?img=8" },
    { id: 9, titulo: "Autenticação com JWT", descricao: "Implemente login seguro na sua aplicação usando JSON Web Tokens.", autor: "Beatriz Nunes", dataPublicacao: "2026-04-08", fotoAutor: "https://i.pravatar.cc/150?img=9" },
    { id: 10, titulo: "React: componentes e props", descricao: "Fundamentos de React para quem está começando no desenvolvimento front-end.", autor: "Thiago Martins", dataPublicacao: "2026-04-05", fotoAutor: "https://i.pravatar.cc/150?img=10" },
    { id: 11, titulo: "Git e GitHub para iniciantes", descricao: "Controle de versão essencial para todo desenvolvedor moderno.", autor: "Juliana Freitas", dataPublicacao: "2026-04-03", fotoAutor: "https://i.pravatar.cc/150?img=11" },
    { id: 12, titulo: "Segurança em aplicações web", descricao: "Principais vulnerabilidades e como proteger seu projeto contra ataques.", autor: "Bruno Carvalho", dataPublicacao: "2026-04-01", fotoAutor: "https://i.pravatar.cc/150?img=12" },
    { id: 13, titulo: "TypeScript do básico ao avançado", descricao: "Por que usar TypeScript e como ele melhora a qualidade do seu código.", autor: "Larissa Dias", dataPublicacao: "2026-03-29", fotoAutor: "https://i.pravatar.cc/150?img=13" },
    { id: 14, titulo: "Testes automatizados com Jest", descricao: "Aprenda a escrever testes unitários e garantir a qualidade do seu código.", autor: "Marcos Oliveira", dataPublicacao: "2026-03-27", fotoAutor: "https://i.pravatar.cc/150?img=14" },
    { id: 15, titulo: "Docker para desenvolvedores", descricao: "Containerize suas aplicações e simplifique o ambiente de desenvolvimento.", autor: "Patrícia Santos", dataPublicacao: "2026-03-25", fotoAutor: "https://i.pravatar.cc/150?img=15" },
    { id: 16, titulo: "Consumindo APIs com Fetch", descricao: "Como buscar dados de APIs externas usando JavaScript nativo no navegador.", autor: "Eduardo Gomes", dataPublicacao: "2026-03-23", fotoAutor: "https://i.pravatar.cc/150?img=16" },
    { id: 17, titulo: "Acessibilidade na web", descricao: "Boas práticas para tornar seu site acessível a todos os usuários.", autor: "Vanessa Pereira", dataPublicacao: "2026-03-20", fotoAutor: "https://i.pravatar.cc/150?img=17" },
    { id: 18, titulo: "Performance no front-end", descricao: "Técnicas para deixar seu site mais rápido e melhorar a experiência do usuário.", autor: "Rodrigo Barbosa", dataPublicacao: "2026-03-18", fotoAutor: "https://i.pravatar.cc/150?img=18" },
    { id: 19, titulo: "Flexbox: guia definitivo", descricao: "Domine o Flexbox com exemplos práticos e visuais para cada propriedade.", autor: "Amanda Ferreira", dataPublicacao: "2026-03-15", fotoAutor: "https://i.pravatar.cc/150?img=19" },
    { id: 20, titulo: "MongoDB: banco NoSQL", descricao: "Introdução ao banco de dados orientado a documentos mais usado no Node.js.", autor: "Felipe Ribeiro", dataPublicacao: "2026-03-13", fotoAutor: "https://i.pravatar.cc/150?img=20" },
    { id: 21, titulo: "Variáveis de ambiente com dotenv", descricao: "Proteja dados sensíveis da sua aplicação usando arquivos .env corretamente.", autor: "Isabela Moreira", dataPublicacao: "2026-03-10", fotoAutor: "https://i.pravatar.cc/150?img=21" },
    { id: 22, titulo: "CORS: o que é e como resolver", descricao: "Entenda o erro de CORS e saiba como configurar o back-end corretamente.", autor: "Gustavo Azevedo", dataPublicacao: "2026-03-08", fotoAutor: "https://i.pravatar.cc/150?img=22" },
    { id: 23, titulo: "Responsividade com media queries", descricao: "Crie layouts que funcionam perfeitamente em qualquer tamanho de tela.", autor: "Renata Campos", dataPublicacao: "2026-03-05", fotoAutor: "https://i.pravatar.cc/150?img=23" },
    { id: 24, titulo: "LocalStorage e SessionStorage", descricao: "Armazene dados no navegador do usuário com as APIs de Web Storage.", autor: "Daniel Castro", dataPublicacao: "2026-03-03", fotoAutor: "https://i.pravatar.cc/150?img=24" },
    { id: 25, titulo: "Eventos no JavaScript", descricao: "Como capturar e manipular eventos do usuário com addEventListener.", autor: "Priscila Lopes", dataPublicacao: "2026-03-01", fotoAutor: "https://i.pravatar.cc/150?img=25" },
    { id: 26, titulo: "Validação de formulários", descricao: "Técnicas de validação client-side e server-side para formulários web.", autor: "Henrique Monteiro", dataPublicacao: "2026-02-27", fotoAutor: "https://i.pravatar.cc/150?img=26" },
    { id: 27, titulo: "PWA: Progressive Web Apps", descricao: "Transforme seu site em um aplicativo instalável com tecnologias web.", autor: "Camila Teixeira", dataPublicacao: "2026-02-25", fotoAutor: "https://i.pravatar.cc/150?img=27" },
    { id: 28, titulo: "Geolocalização com JavaScript", descricao: "Use a API de geolocalização do navegador para criar experiências localizadas.", autor: "Vinícius Cunha", dataPublicacao: "2026-02-22", fotoAutor: "https://i.pravatar.cc/150?img=28" },
    { id: 29, titulo: "Notificações push no navegador", descricao: "Envie notificações para usuários mesmo quando eles não estão no seu site.", autor: "Letícia Borges", dataPublicacao: "2026-02-20", fotoAutor: "https://i.pravatar.cc/150?img=29" },
    { id: 30, titulo: "Websockets em tempo real", descricao: "Crie aplicações com comunicação bidirecional em tempo real usando WebSockets.", autor: "Alexandre Pinto", dataPublicacao: "2026-02-18", fotoAutor: "https://i.pravatar.cc/150?img=30" },
    { id: 31, titulo: "Introdução ao Python para web", descricao: "Como usar Python com Flask ou Django para criar back-ends robustos.", autor: "Natália Fonseca", dataPublicacao: "2026-02-15", fotoAutor: "https://i.pravatar.cc/150?img=31" },
    { id: 32, titulo: "Clean Code na prática", descricao: "Princípios de código limpo para escrever programas mais legíveis e manuteníveis.", autor: "Leandro Vieira", dataPublicacao: "2026-02-13", fotoAutor: "https://i.pravatar.cc/150?img=32" }
];

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.listen(3000, () => {
    console.log('running at http://localhost:3000');
});
