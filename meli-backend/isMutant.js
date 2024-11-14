/**
 * Verifica si una secuencia de ADN es de un mutante o no, basándose en las secuencias horizontales, verticales y diagonales.
 * Se considera mutante si existe al menos una secuencia de 4 letras consecutivas iguales.
 *
 * @param {string[]} dna - Una matriz bidimensional que representa el ADN, donde cada fila es un string que contiene caracteres representando nucleótidos (por ejemplo, 'A', 'T', 'C', 'G').
 * @returns {boolean} - Devuelve `true` si se encuentran al menos 2 secuencias mutantes (4 letras consecutivas iguales) en cualquier dirección (horizontal, vertical, diagonal); de lo contrario, devuelve `false`.
 * 
 * La función funciona de la siguiente manera:
 * 1. Se itera sobre cada posición (i, j) del ADN.
 * 2. Para cada posición, se verifican las 4 direcciones posibles en las que se puede formar una secuencia de 4 caracteres consecutivos: 
 *    - Horizontal: `checkSequence(i, j, 0, 1)`
 *    - Vertical: `checkSequence(i, j, 1, 0)`
 *    - Diagonal hacia abajo (de izquierda a derecha): `checkSequence(i, j, 1, 1)`
 *    - Diagonal hacia arriba (de izquierda a derecha): `checkSequence(i, j, -1, 1)`
 * 3. Si se encuentra una secuencia de 4 caracteres consecutivos iguales en cualquiera de esas direcciones, se incrementa el contador `mutantSequences`.
 * 4. Si se encuentra más de una secuencia mutante, la función devuelve `true` (es mutante).
 * 5. Si no se encuentran suficientes secuencias mutantes, la función devuelve `false`.
 * 
 * Este algoritmo es eficiente porque solo verifica secuencias a partir de posiciones que permiten formar secuencias de longitud 4 sin desbordar el array.
 */
function isMutant(dna) {
    const n = dna.length;  // Longitud de la matriz ADN
    let mutantSequences = 0;  // Contador de secuencias mutantes

    /**
     * Función auxiliar para verificar si hay una secuencia mutante de 4 caracteres consecutivos.
     * 
     * @param {number} x - La posición inicial en la fila.
     * @param {number} y - La posición inicial en la columna.
     * @param {number} dx - El desplazamiento en la dirección horizontal (1 o -1).
     * @param {number} dy - El desplazamiento en la dirección vertical (1 o -1).
     * @returns {boolean} - Devuelve `true` si se encuentra una secuencia mutante, de lo contrario `false`.
     */
    function checkSequence(x, y, dx, dy) {
        const letter = dna[x][y];  // Letra en la posición inicial
        for (let i = 1; i < 4; i++) {  // Verifica los siguientes 3 elementos en la dirección especificada
            const nx = x + dx * i;  // Nueva posición en la fila
            const ny = y + dy * i;  // Nueva posición en la columna
            // Si la posición está fuera de los límites o el carácter no coincide, no es una secuencia válida
            if (nx >= n || ny >= n || dna[nx][ny] !== letter) {
                return false;
            }
        }
        return true;  // Si todos los caracteres coinciden, es una secuencia mutante
    }

    // Recorre toda la matriz de ADN buscando secuencias mutantes
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Verifica si se puede formar una secuencia en alguna de las 4 direcciones
            if (
                (j <= n - 4 && checkSequence(i, j, 0, 1)) ||  // Horizontal
                (i <= n - 4 && checkSequence(i, j, 1, 0)) ||  // Vertical
                (i <= n - 4 && j <= n - 4 && checkSequence(i, j, 1, 1)) ||  // Diagonal hacia abajo
                (i >= 3 && j <= n - 4 && checkSequence(i, j, -1, 1))  // Diagonal hacia arriba
            ) {
                mutantSequences += 1;  // Incrementa el contador de secuencias mutantes
                if (mutantSequences > 1) {  // Si ya se encuentran más de una secuencia, retorna true
                    return true;
                }
            }
        }
    }

    return false;  // Si no se encuentran suficientes secuencias mutantes, retorna false
}

export default isMutant;
