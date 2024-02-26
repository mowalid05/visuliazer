import GetSelectedAlgorithmName from "./header"
import GreadyBFS from "./GBFS"
import Agent from "./Agent"
import GBFST from "./GBFS-test";

function Visulise_it() {

    var algo:string = GetSelectedAlgorithmName().toString();
    if (algo === "Gready Breadth first seacrch (GBFS)") {
        let agent = Agent(); // get the agent's position
        let target = {row: 5, col: 40}; // this will be replaced by your target function later
        let walls: any[] = []; // this will be replaced by your walls function later
        let visited = GBFST(agent, target,walls);
    }
    
    
}
export default Visulise_it;
