import chalk from "chalk";

function extraiLinks (arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus (listaUrls) {
    const arraStatus = await Promise.all(
        listaUrls.map(async (url) => {
            try{
                const response = await fetch(url)
                return response.status;
            } catch (erro){
                return manejaErros(erro);
            }
        })
    )
    return arraStatus;
}

function manejaErros (erro) {
    if(erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado';
    }else{
        return 'Ocorreu algum erro';
    }
}

export default async function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}

// const res = await fetch('https://nodejs.org/api/documentation.json');
// if(res.ok){
//     const data = await res.json();
//     console.log(data)
// }