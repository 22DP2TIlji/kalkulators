// Iegūst rezultātu displeju
const resultDisplay = document.getElementById('result');
const historyList = document.getElementById('history-list');

// Iegūst vēsturi no localStorage vai inicializē to kā tukšu masīvu
let history = JSON.parse(localStorage.getItem('history')) || [];

// Funkcija, lai pievienotu simbolu vai ciparu displejam
function appendToDisplay(value) {
    resultDisplay.value += value;
}

// Funkcija, lai notīrītu displeju
function clearDisplay() {
    resultDisplay.value = '';
}

// Funkcija, kas veic aprēķinu
function calculate() {
    try {
        const expression = resultDisplay.value;
        const result = eval(expression);
        resultDisplay.value = result;

        // Pievieno aprēķinu vēsturei
        addToHistory(expression, result);
    } catch (error) {
        resultDisplay.value = 'Kļūda';
    }
}

// Funkcija, lai pievienotu aprēķinu vēsturei
function addToHistory(expression, result) {
    const entry = `${expression} = ${result}`;
    history.push(entry);

    // Saglabā vēsturi localStorage
    localStorage.setItem('history', JSON.stringify(history));

    // Atjaunina vēstures skatījumu
    updateHistory();
}

// Funkcija, lai attēlotu vēsturi
function updateHistory() {
    historyList.innerHTML = ''; // Iztīra esošo vēsturi

    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${entry} <button onclick="deleteHistoryItem(${index})">Dzēst</button>`;
        historyList.appendChild(li);
    });
}

// Funkcija, lai dzēstu konkrētu vēstures ierakstu
function deleteHistoryItem(index) {
    history.splice(index, 1); // Izņem ierakstu no masīva

    // Saglabā atjaunoto vēsturi localStorage
    localStorage.setItem('history', JSON.stringify(history));

    // Atjaunina vēstures skatījumu
    updateHistory();
}

// Funkcija, lai dzēstu visu vēsturi
function clearHistory() {
    history = [];
    localStorage.removeItem('history'); // Noņem vēsturi no localStorage
    updateHistory();
}

// Atjauno vēsturi pēc lapas ielādes
window.onload = updateHistory;
