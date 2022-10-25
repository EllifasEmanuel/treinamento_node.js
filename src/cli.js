import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk from 'chalk';
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

function imprimeLista(valida, resultado, caminho = ''){
    if (valida) {
        console.log(chalk.green(`Lista de links do arquivo ${caminho}:`),listaValidada(resultado));
    } else {
        console.log(chalk.green(`Lista de links do arquivo ${caminho}:`),resultado);
    }
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
    try{
        fs.lstatSync(caminho);
    } catch(erro){
        if(erro.code === "ENOENT"){
            console.log(chalk.red(`Arquivo ou diretório não encontrado: ${caminho}.`));
            return; 
        }
    }
    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeLista(valida, resultado);
    } 
    else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDeArquivo) => {
            const caminhoArquivo = `${caminho}/${nomeDeArquivo}`;
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(valida, lista, caminhoArquivo);
        })
    }
}

processaTexto(caminho);