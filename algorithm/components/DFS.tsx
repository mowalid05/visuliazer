/**
 * This module contains the implementation of a search algorithm that is intended to be Depth-First Search (DFS),
 * but it does not correctly implement DFS.
 * 
 * The module exports several types and a function:
 * 
 * - `GridCellD`: A type representing a cell in a grid. Each cell has a position and a validity flag.
 * - `Position`: A type representing a position in a grid. Each position has a row and a column.
 * - `GBFS_Params`: A type representing the parameters for the Greedy Best-First Search (GBFS) algorithm.
 * - `DFS`: A function that attempts to implement the DFS algorithm.
 * 
 * The `DFS` function takes an agent, a target, a list of walls, a list of visited positions, and a list of choices.
 * It returns a list of visited positions.
 * 
 * The function starts by marking the agent's position as visited. Then, for each direction (up, down, right, left),
 * it checks if the position in that direction is valid (i.e., not a barrier, not a wall, and not visited before).
 * If the position is valid, it adds it to the choices.
 * 
 * Then, the function tries to select the next position to visit. If a next position exists, it removes it from the choices
 * and makes a recursive call to `DFS` with the next position. If a next position does not exist, it checks if there are any choices left.
 * If there are no choices left, it returns the visited positions. Otherwise, it selects the last choice as the next position,
 * removes it from the choices, and makes a recursive call to `DFS` with the next position.
 * 
 * However, this is not a correct implementation of DFS. In DFS, the algorithm should always choose the deepest unvisited node,
 * which is not what this function is doing. Instead, this function is always choosing the last valid position that it has encountered,
 * which is more similar to a Breadth-First Search (BFS) approach.
 */
import Barierrs from "./Barier";
// Define types for grid cell and GBFS parameters
export type GridCellD = {
    position: Position,
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
    choices: GridCellD[]
};
export function DFS(agent: GridCellD, target: Position, walls: Position[], visited: Position[] = [], choices: GridCellD[] = []) {
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
    let nextPosition: GridCellD | null = null;

    for (let direction of directions) {
        let newRow = curr.position.row + direction.dRow;
        let newCol = curr.position.col + direction.dCol;
        let position = { row: newRow, col: newCol };

        let valid = !barriers.some(barrier => barrier.row === newRow && barrier.col === newCol) && !walls.some(wall => wall.row === newRow && wall.col === newCol) && !visited.some(v => v.row === newRow && v.col === newCol);

        if (valid) {
            choices.push({ position, valid });

        }
    }


    while(choices.length>0){
        let choice = choices.pop();
        if (choice != null && choice.valid) {
            nextPosition = choice;
            break;
        }
        else{
            if(choice!=null)
            visited.push(choice.position);
        }
    }ءءءء
    if(choices.length===0){
        return visited;
    }
    else
    {
        return DFS(nextPosition, target, walls, visited, choices);
    }
}