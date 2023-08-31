const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/adicionar', (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const data = obterDataFormatada();

    const linhaCSV = `${nome},${telefone},${data}\n`;
    const arquivoPath = path.join(__dirname, 'contatos.csv');

    fs.appendFile(arquivoPath, linhaCSV, 'utf-8', (err) => {
        if (err) {
            console.error('Erro ao adicionar linha ao arquivo:', err);
            res.status(500).send('Erro ao adicionar linha ao arquivo.');
        } else {
            console.log('Linha adicionada com sucesso ao arquivo.');
            res.status(200).send('Linha adicionada com sucesso ao arquivo.');
        }
    });
});

function obterDataFormatada() {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // O mês começa em zero

    return dia + '/' + mes;
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
