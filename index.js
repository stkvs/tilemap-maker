const generateGrid = document.querySelector('button#createGrid');
const clearGrid = document.querySelector('button#clear');
const jsonButton = document.querySelector('button#export');

const editorWindow = document.querySelector('.editor');

function createGrid() {
    editorWindow.innerHTML = '';

    let gridWidth = document.querySelector('#gridX').value;
    let gridHeight = document.querySelector('#gridY').value;

    textWidth = document.querySelector('#tilemapWidth').innerHTML = gridWidth;
    textHeight = document.querySelector('#tilemapHeight').innerHTML = gridHeight;

    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;
    grid.style.gap = '1px';
    grid.style.aspectRatio = gridWidth / gridHeight;

    for (let i = 0; i < gridWidth * gridHeight; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }

    editorWindow.appendChild(grid);

    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.style.fontSize = `${cell.clientWidth / 2}px`;
        cell.addEventListener('mousedown', () => {
            cell.classList.toggle('selected');

            document.addEventListener('keydown', (event) => {
                if (event.key === '1' && cell.classList.contains('selected')) {
                    cell.innerHTML = '1';
                }
                if (event.key === '2' && cell.classList.contains('selected')) {
                    cell.innerHTML = '2';
                }
                if (event.key === 'x' && cell.classList.contains('selected')) {
                    cell.innerHTML = 'X';
                }
            });
        });

        cell.addEventListener('mouseleave', () => {
            cell.classList.remove('selected');
        });
    });
}

function generateJSON() {
    const cells = document.querySelectorAll('.cell');
    const gridWidth = document.querySelector('#gridX').value;
    const gridHeight = document.querySelector('#gridY').value;

    let grid = {
        width: null,
        height: null,
        map: []
    };

    grid.width = gridWidth;
    grid.height = gridHeight;
    
    for (let i = 0; i < gridWidth * gridHeight; i++) {
        if (cells[i].innerHTML === 'X') {
            grid.map.push(0);
        } else if (cells[i].innerHTML === '2') {
            grid.map.push(2);
        } else {
            grid.map.push(1);
        }
    }

    console.log(grid);
    const jsonArea = document.querySelector('.json textarea');
    jsonArea.value = `const map = { width: ${grid.width}, height: ${grid.height}, map: [${grid.map}]}`;
}

generateGrid.addEventListener('click', createGrid);

clearGrid.addEventListener('click', () => {
    editorWindow.innerHTML = '';
});

jsonButton.addEventListener('click', generateJSON);

document.addEventListener("DOMContentLoaded", function () {
    const toggleInput = document.getElementById("toggle");

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        const elements = document.querySelectorAll("*:not(button):not(.grid *):not(.grid):not(.toggle-switch *)");

        elements.forEach(element => {
            if (toggleInput.checked) {
                element.style.color = "#fff";
                element.style.backgroundColor = "#333";
            } else {
                element.style.color = "";
                element.style.backgroundColor = "";
            }
        });

        // Set cookie based on the toggle state
        setCookie('darkMode', toggleInput.checked, 7); // Remember for 7 days
    };

    // Check cookie and set the initial state of toggleInput
    const darkModeCookie = getCookie('darkMode');
    if (darkModeCookie === 'true') {
        toggleInput.checked = true;
    } else {
        toggleInput.checked = false;
    }

    // Apply the dark mode based on the cookie
    toggleDarkMode();

    // Add event listener for toggle change
    toggleInput.addEventListener("change", toggleDarkMode);
});
