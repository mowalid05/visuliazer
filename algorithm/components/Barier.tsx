type Position = {
    row: number,
    col: number
};
// function positionToString(position: { row: number, col: number }): string {
//     return `${position.row}-${position.col}`;
// }

function Barierrs() {
    let cols = 60;
    let rows = 30;
    let Barier = [];
    for (let i = 0; i < rows; i++) {
        Barier.push({row: i, col: -1});
        Barier.push({row: i, col: cols});
    }
    for (let i = 0; i < cols; i++) {
        Barier.push({row: -1, col: i});
        Barier.push({row: rows, col: i});
    }

    return Barier as Position[];
}    
export default Barierrs;