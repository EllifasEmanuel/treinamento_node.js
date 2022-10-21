import fs from 'fs';
import chalk from 'chalk';

function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8';
    fs.readFile(caminhoDoArquivo, encoding, (_, texto) => {
        console.log(chalk.blue(texto));
    })
}

pegaArquivo('./arquivos/texto.md');