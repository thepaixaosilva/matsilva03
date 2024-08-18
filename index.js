const fs = require('fs')

fs.readFile('README_BASE.md', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    const currTimeBrazil = new Date().toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo"
    })

    const currTimePST = new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles"
    })

    const substituicoes = {
        greeting_brazil: new Date(currTimeBrazil).getHours()  >= 0 && new Date(currTimeBrazil).getHours() < 12 ? "Bom Dia!" : new Date(currTimeBrazil).getHours() < 18 ? "Boa Tarde!" : "Boa Noite!",
        greeting_usa_pacific: new Date(currTimePST).getHours() >= 0 && new Date(currTimePST).getHours() < 12 ? "Good Morning!" : new Date(currTimePST).getHours() < 18 ? "Good Afternoon!" : "Good Evening!",
        greeting_world: new Date().getHours() >= 0 && new Date().getHours() < 12 ? "Good Morning!" : new Date().getHours() < 18 ? "Good Afternoon!" : "Good Evening!"
    }

    const modificado = data
        .replace(
            /%{.*}/gm,
            e => substituicoes?.[e.slice(2, -1)] || e
        )

    fs.writeFile('README.md', modificado, 'utf-8', (err) => {
        if (err) {
            throw err;
        }
        console.log('✔ Processo finalizado!');
    });
});
