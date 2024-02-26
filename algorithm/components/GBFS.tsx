import Barierrs from "./Barier";
// Define types for grid cell and GBFS parameters
export type GridCell = {
    position: Position,
    distance: number,
    valid: boolean
};
export type Position = {
    row: number,
    col: number
};

export type GBFS_Params = {
    curr: Position,
    target: Position,
    visited: Position[],
    walls: Position[],
    choices: GridCell[]
};

// Define the GBFS algorithm
export function GBFST(agent: Position, target: Position, walls: Position[], visited: Position[] = []) {
    let curr = agent;
    visited.push(curr);
    let barriers = Barierrs()
    if (curr.row === target.row && curr.col === target.col) {
        return visited;
    }

    let directions = [
        { name: 'up', dRow: -1, dCol: 0 },
        { name: 'down', dRow: 1, dCol: 0 },
        { name: 'right', dRow: 0, dCol: 1 },
        { name: 'left', dRow: 0, dCol: -1 }
    ];

    let grid: { [key: string]: GridCell } = {};
    let min = Number.MAX_VALUE;
    let nextPosition: Position | null = null;

    for (let direction of directions) {
        let newRow = curr.row + direction.dRow;
        let newCol = curr.col + direction.dCol;
        let position = { row: newRow, col: newCol };
        let distance = Math.abs(newRow - target.row) + Math.abs(newCol - target.col);
        let valid = !barriers.some(barrier => barrier.row === newRow && barrier.col === newCol) && !walls.some(wall => wall.row === newRow && wall.col === newCol) && !visited.some(v => v.row === newRow && v.col === newCol);

        if (valid && distance < min) {
            min = distance;
            nextPosition = position;
        }
    }

    if (nextPosition) {
        return GBFST(nextPosition, target, walls, visited);
    } else {
        throw new Error('No valid path to target');
    }
}

