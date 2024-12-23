// Função para obter o resultado e as imagens baseadas no valor e no tipo de dado
// Essa macro tem dependencia do Dice so Nice
// https://foundryvtt.com/packages/dice-so-nice/
function getResult(dieType, value) {
    const images = {
        SUCESSO: "https://i.imgur.com/qxmXzle.png",
        ADAPTACAO: "https://i.imgur.com/MKf2pyq.png",
        PRESSAO: "https://i.imgur.com/dIpQmh5.png"
    };

    const results = {
        "d6": {
            1: "<VAZIO>",
            2: "<VAZIO>",
            3: `<img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            4: `<img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            5: `<img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            6: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />`
        },
        "d10": {
            1: "<VAZIO>",
            2: "<VAZIO>",
            3: `<img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            4: `<img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            5: `<img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            6: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />`,
            7: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />`,
            8: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />`,
            9: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            10: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                 <img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                 <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`
        },
        "d12": {
            1: "<VAZIO>",
            2: "<VAZIO>",
            3: `<img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            4: `<img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            5: `<img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            6: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />`,
            7: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />`,
            8: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />`,
            9: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            10: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                 <img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                 <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            11: `<img src="${images.SUCESSO}" width="30" style="border: none; border-radius: 0;" />
                 <img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                 <img src="${images.ADAPTACAO}" width="30" style="border: none; border-radius: 0;" />
                 <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`,
            12: `<img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />
                 <img src="${images.PRESSAO}" width="30" style="border: none; border-radius: 0;" />`
        }
    };

    return results[dieType][value] || "<VAZIO>";
}

// Abrir janela para entrada de dados
new Dialog({
    title: "Rolagem Assimilação RPG",
    content: `
        <form>
            <div class="form-group">
                <label for="d6">Quantidade de D6:</label>
                <input type="number" id="d6" name="d6" value="0" min="0"/>
            </div>
            <div class="form-group">
                <label for="d10">Quantidade de D10:</label>
                <input type="number" id="d10" name="d10" value="0" min="0"/>
            </div>
            <div class="form-group">
                <label for="d12">Quantidade de D12:</label>
                <input type="number" id="d12" name="d12" value="0" min="0"/>
            </div>
        </form>
    `,
    buttons: {
        roll: {
            label: "Rolar",
            callback: async (html) => {
                const d6 = parseInt(html.find("#d6").val()) || 0;
                const d10 = parseInt(html.find("#d10").val()) || 0;
                const d12 = parseInt(html.find("#d12").val()) || 0;

                // Realizar as rolagens
                const rolls = [];
                if (d6 > 0) rolls.push(await new Roll(`${d6}d6`).roll({async: true}));
                if (d10 > 0) rolls.push(await new Roll(`${d10}d10`).roll({async: true}));
                if (d12 > 0) rolls.push(await new Roll(`${d12}d12`).roll({async: true}));

                // Exibir os dados usando Dice So Nice
                rolls.forEach(r => game.dice3d.showForRoll(r));

                // Compilar resultados com divs estilizados
                let chatContent = `
                    <h2>Resultado das Rolagens</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-start;">
                `;
                rolls.forEach((roll) => {
                    const dieType = roll.terms[0].faces;
                    roll.terms[0].results.forEach((r) => {
                        chatContent += `
                            <div style="flex: 0 0 120px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 3px solid #6ab53f; border-radius: 10px; padding: 10px; background: #f9f9f9; text-align: center; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                <strong style="font-size: 1.2em; color: #6ab53f;">D${dieType}</strong>
                                <div style="font-size: 1em; margin-top: 5px;">${r.result}</div>
                                <div style="margin-top: 10px;">${getResult(`d${dieType}`, r.result)}</div>
                            </div>
                        `;
                    });
                });
                chatContent += `</div>`;

                // Enviar para o chat
                ChatMessage.create({
                    user: game.user.id,
                    content: chatContent
                });
            }
        }
    },
    default: "roll"
}).render(true);