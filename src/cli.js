import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk from 'chalk';

const caminho = process.argv;

function imprimeLista(resultado, caminho = ''){
    console.log(chalk.green(`Lista de links do arquivo ${caminho}:`),resultado);
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];
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
        imprimeLista(resultado);
    } 
    else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDeArquivo) => {
            const caminhoArquivo = `${caminho}/${nomeDeArquivo}`;
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(lista, caminhoArquivo);
        })
    }
}

processaTexto(caminho);