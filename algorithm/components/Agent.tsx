

function Agent() {
    let row = 6;
    let col = 13;
    const id = `${row}-${col}`;
    let agent = { id: id, row: row, col: col };
    return agent;
}

export default Agent;
