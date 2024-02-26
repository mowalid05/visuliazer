function GreadyBFS(GBFS_prams) {
    var Visted = [];
    // get the choiseses
    // let choises = current
    var choisses = GBFS_prams.choises;
    var current = GBFS_prams.current;
    var Each_block = GBFS_prams.Each_block;
    current = { row: 5, column: 0 };
    GBFS_prams.target = { row: 5, column: 20 };
    if (current.row == GBFS_prams.target.row && current.column == GBFS_prams.target.column) {
        return (Visted);
    }
    for (var i = current.row - 1; i <= current.row + 1; i++) {
        for (var j = current.column - 1; j <= current.column + 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (i == 0 || j == 0 || i == current.row + 1 || j == current.column + 1) {
                Each_block.mdist = 0;
                Each_block.row = i;
                Each_block.column = j;
            }
            else {
                Each_block.mdist = Math.abs((current.row + 1 + i) + (GBFS_prams.target.row + 1)) + Math.abs((current.column + 1 + j) + (GBFS_prams.target.column + 1));
                Each_block.row = i;
                Each_block.column = j;
            }
        }
    }
    var min = Math.abs((current.row + 1) + (GBFS_prams.target.row + 1)) + Math.abs((current.column + 1) + (GBFS_prams.target.column + 1));
    if (choisses.size == 0) {
        Each_block.midset.forEach(function (mdist) {
            if (mdist < min) {
                min = mdist;
                current.row = Each_block.row;
                current.column = Each_block.column;
            }
        });
        Each_block.midset.forEach(function (mdist) {
            if (mdist != min) {
                choisses.append(mdist);
            }
        });
        GreadyBFS({choises: choisses, Each_block: Each_block, current: current, target: target});
    }
    else {
        Each_block.mdiset.forEach(function (mdist) {
            if (mdist < min) {
                min = mdist;
                current.row = Each_block.row;
                current.column = Each_block.column;
            }
        });
        choisses.midist.forEach(function (mdist) {
            if (mdist < min) {
                min = mdist;
                current.row = Each_block.row;
                current.column = Each_block.column;
            }
        });
        Each_block.midset.forEach(function (mdist) {
            if (mdist != min) {
                choisses.append(mdist);
            }
        });
        GreadyBFS({choises: choisses, Each_block: Each_block, current: current, target: target});
    }
}
console.log(GreadyBFS({ current: { row: 5, column: 13 }, target: { row: 5, column: 23 } }));
// let next ;
// Removed the second declaration of 'min'
// for(auto : choises)
// {
//     if (Each_block.mdist > auto.mdist)
//     {
//         (Each_block.mdsit).append(choises);
//     }
// }
