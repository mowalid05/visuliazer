'use client';
import { GBFST } from "./GBFS-test";
import { useState, useEffect } from "react";
import Agent from './Agent';
import { GridCell } from "./GBFS";
import { A_star, GridCellA } from "./A_star";
import { DFS, GridCellD } from "./DFS";

type Position = {
    row: number,
    col: number
};

function Playground({ visualize, selectedAlgorithm, Clear }) {
    const cellSize = 20;
    const gridSize = { cols: 60, rows: 30 };
    const [agent, setAgent] = useState<Position>({ row: 4, col: 13 });  // New state for the agent
    const [target, setTarget] = useState<Position>({ row: 4, col: 30 });
    const [visited, setVisited] = useState<Position[]>([]);
    const [isDraggingTarget, setIsDraggingTarget] = useState(false);  // Renamed from isDragging
    const [isDraggingAgent, setIsDraggingAgent] = useState(false);  // New state for dragging the agent
    const [walls, setWalls] = useState<Position[]>([]);
    const [isAddingWall, setIsAddingWall] = useState(false);  // New state for adding walls

    // ...



    useEffect(() => {
        if (Clear) {
            setWalls([]);
            setVisited([]);

        }
    }, [Clear]);
    useEffect(() => {
        if (visualize) {
            let algo = selectedAlgorithm;
            if (algo === "Gready Breadth first seacrch (GBFS)") {
                let agentGridCell: GridCell = {
                    position: agent,
                    distance: Math.abs(agent.row - target.row) + Math.abs(agent.col - target.col),
                    valid: true // or calculate this based on your logic
                };

                let newVisited = GBFST(agentGridCell, target, walls);
                console.log(newVisited);
                console.log(target);
                console.log(agent);
                newVisited.forEach((cell, index) => {
                    setTimeout(() => {
                        setVisited(prevVisited => [...prevVisited, cell]);
                    }, index * 100);
                });
            }
            else if (algo === "A*") {
                let agentGridCell: GridCellA = {
                    position: agent,
                    distance: Math.abs(agent.row - target.row) + Math.abs(agent.col - target.col),
                    valid: true, // or calculate this based on your logic
                    cost: 0
                };

                let newVisited = A_star(agentGridCell, target, walls);
                console.log(newVisited);
                console.log(target);
                console.log(agent);
                newVisited.forEach((cell, index) => {
                    setTimeout(() => {
                        setVisited(prevVisited => [...prevVisited, cell]);
                    }, index * 100);
                });

            }
            else if (algo === "Depth First Search (DFS)") {
                let agentGridCell: GridCellD = {
                    position: agent,

                    valid: true // or calculate this based on your logic
                };

                let newVisited = DFS(agentGridCell, target, walls);
                console.log(newVisited);
                console.log(target);
                console.log(agent);
                newVisited.forEach((cell, index) => {
                    setTimeout(() => {
                        setVisited(prevVisited => [...prevVisited, cell]);
                    }, index * 10);
                });

            }
        }
    }, [visualize, selectedAlgorithm, target, agent]);

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize.cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${gridSize.rows}, ${cellSize}px)`,
        gap: '1px',
        backgroundColor: 'lightgray',
        padding: '1px',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',  // This positions the container
        bottom: '0',  // This positions the container at the bottom
        width: '100vw',
        backgroundColor: 'lightgray',

    };

    const styles = {
        target: {
            backgroundColor: 'blue',
            border: '1px solid gray'
        },
        visited: {
            backgroundColor: 'white',
            border: '1px solid gray',
            transition: 'background-color 0.5s'
        },
        unvisited: {
            backgroundColor: 'black',
            border: '1px solid gray'
        },
        agent: {
            backgroundColor: 'red',
            border: '1px solid gray'
        },
        wall: {
            backgroundColor: 'purple',
            border: '1px solid gray'
        }
    };
    // ...

    const moveAgent = (newPosition: Position) => {
        // Remove wall if agent is moved onto it
        if (walls.some(wall => wall.row === newPosition.row && wall.col === newPosition.col)) {
            setWalls(prevWalls => prevWalls.filter(wall => wall.row !== newPosition.row || wall.col !== newPosition.col));
        }
        setAgent(newPosition);
    };

    const moveTarget = (newPosition: Position) => {
        // Remove wall if target is moved onto it
        if (walls.some(wall => wall.row === newPosition.row && wall.col === newPosition.col)) {
            setWalls(prevWalls => prevWalls.filter(wall => wall.row !== newPosition.row || wall.col !== newPosition.col));
        }
        setTarget(newPosition);
    };

    // ...

    const handleAddWall = (position: Position) => {
        if (position.row === agent.row && position.col === agent.col) return;
        else if (position.row === target.row && position.col === target.col) return;
        else if (walls.some(wall => wall.row === position.row && wall.col === position.col)) {
            setWalls(prevWalls => prevWalls.filter(wall => wall.row !== position.row || wall.col !== position.col));
            return;
        }
        setWalls(prevWalls => [...prevWalls, position]);
    };

    return (
        <>
            <main style={containerStyle}>
                <div style={gridStyle}>
                    {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, index) => {
                        const row = Math.floor(index / gridSize.cols);
                        const col = index % gridSize.cols;
                        const id = `${row}-${col}`;

                        const cellStyle = row === agent.row && col === agent.col ? styles.agent
                            : row === target.row && col === target.col ? styles.target
                                : walls.some(wall => wall.row === row && wall.col === col) ? styles.wall
                                    : visited.some(visit => visit.row === row && visit.col === col) ? styles.visited : styles.unvisited;
                        return (
                            <div
                                key={id}
                                id={id}
                                style={cellStyle}
                                onMouseDown={() => {
                                    if (row === target.row && col === target.col) {
                                        setIsDraggingTarget(true);

                                    } else if (row === agent.row && col === agent.col) {
                                        setIsDraggingAgent(true);
                                    } else {
                                        setIsAddingWall(true);  // Start adding walls
                                        handleAddWall({ row, col });
                                    }
                                }}
                                onMouseEnter={() => {
                                    if (isDraggingTarget && row >= 0 && row < gridSize.rows && col >= 0 && col < gridSize.cols) {
                                        moveTarget({ row, col });
                                    } else if (isDraggingAgent && row >= 0 && row < gridSize.rows && col >= 0 && col < gridSize.cols) {
                                        moveAgent({ row, col });
                                    } else if (isAddingWall && row >= 0 && row < gridSize.rows && col >= 0 && col < gridSize.cols) {  // Add walls while mouse is down
                                        handleAddWall({ row, col });
                                    }
                                }}
                                onMouseUp={() => {
                                    setIsDraggingTarget(false);
                                    setIsDraggingAgent(false);
                                    setIsAddingWall(false);  // Stop adding walls
                                }}
                            >
                            </div>
                        );
                    })}
                </div>
            </main>
        </>
    );

}

export default Playground;