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
export function GBFST(agent: GridCell, target: Position, walls: Position[], visited: Position[] = [], choices: GridCell[] = []) {
    let curr = agent;
    visited.push(curr.position);
    let barriers = Barierrs()
    if (curr.position.row === target.row && curr.position.col === target.col) {
        return visited;
    }

    let directions = [
        { name: 'up', dRow: -1, dCol: 0 },
        { name: 'down', dRow: 1, dCol: 0 },
        { name: 'right', dRow: 0, dCol: 1 },
        { name: 'left', dRow: 0, dCol: -1 }
    ];

    let min = Number.MAX_VALUE;
    let nextPosition: GridCell | null = null;

    for (let direction of directions) {
        let newRow = curr.position.row + direction.dRow;
        let newCol = curr.position.col + direction.dCol;
        let position = { row: newRow, col: newCol };
        let distance = Math.abs(newRow - target.row) + Math.abs(newCol - target.col);
        let valid = !barriers.some(barrier => barrier.row === newRow && barrier.col === newCol) && !walls.some(wall => wall.row === newRow && wall.col === newCol) && !visited.some(v => v.row === newRow && v.col === newCol);

        if (valid) {
            choices.push({ position, distance, valid });
            if (distance < min) {
                min = distance;
                nextPosition = { position, distance, valid }; 
            }
        }
    }

    
    if (nextPosition) {
        for (let choice of choices) {
            if (choice.distance < nextPosition.distance && choice.valid) {
                nextPosition = choice;
            }
        }
        // Remove the chosen position from the choices array
        choices = choices.filter(choice => choice.position.row !== nextPosition.position.row || choice.position.col !== nextPosition.position.col);
        return GBFST(nextPosition, target, walls, visited, choices);
    } else {
        // If no valid next position can be found, stop the recursion
        if (choices.length === 0) {
            return visited;
        }
    
        // If nextPosition is not null, remove it from choices

        nextPosition=choices[0];
        min = Number.MAX_VALUE;
        for(let choice of choices) {
            if (choice.distance < min) {
                min = choice.distance;
                nextPosition = choice;
            }
        }
        choices = choices.filter(choice => choice.position.row !== nextPosition.position.row || choice.position.col !== nextPosition.position.col);
        
        return GBFST(nextPosition, target, walls, visited, choices);
    }
}