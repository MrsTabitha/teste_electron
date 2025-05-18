const { contextBridge } = require('electron');

// Processos 
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron
})

// Manipução do DOM
window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})

function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return data.toLocaleDateString('pt-BR', options)
}