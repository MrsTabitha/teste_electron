// Processo de Renderização 

console.log("Processo de Renderização ")
console.log(`Electron: ${api.verElectron()}`)

function openChild() {
    //console.log("Teste do Botão")
    api.open()
}

api.send("Oi!")

api.on((event, message) => {
    console.log(`Processo de renderização recebeu uma mensagem: ${message}`)
})