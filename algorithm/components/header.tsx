
'use client';
import Playground from "./Playground";
import { useState, useEffect } from "react";
import Agent from "./Agent";

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [Visualize, setVisualize] = useState(false);
    const [AddWalls, setAddWalls] = useState(false);
    const [clear, setClear] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleVisualize = () => {
        if (GetSelectedAlgorithmName() !== "")
            setVisualize(true);
        setTimeout(() => setVisualize(false), 0);
    }
    const handleAddWalls = () => {
        setAddWalls(true);
    }
    useEffect(() => {
        if (AddWalls) {
            setAddWalls(false);
            console.log("Adding Walls");
        }
    }, [AddWalls]);
    const handleclear = () => {
        setClear(true);
        setTimeout(() => setClear(false), 0);
    }

    // useEffect(() => {

    //     if (Visualize) {


    //         setVisualize(false);
    //         Playground();
    //         console.log("Visualizing");

    //     }
    // }, [Visualize, selectedAlgorithm]);
    const selectAlgorithm = (algorithm: string) => {
        setSelectedAlgorithm(algorithm);
        setShowDropdown(false);
    };

    const GetSelectedAlgorithmName = () => {
        return selectedAlgorithm;
    };

    return (
        <>
            <main
                className="fixed top-0 w-screen m-0 
                    flex flex-row 
                    bg-white justify-between px-4 text-gray-700 shadow hover:text-green-500"
            >
                <div className="relative">
                    <button onMouseEnter={toggleDropdown} onClick={toggleDropdown} onMouseLeave={toggleDropdown}>
                        Algorithm
                    </button>
                    {showDropdown && (
                        <ul className="absolute top-9 left-0 bg-white border border-gray-300 rounded shadow" style={{ width: "300px" }}>
                            <li onClick={() => selectAlgorithm("Gready Breadth first seacrch (GBFS)")}>
                                Gready Breadth first seacrch (GBFS)
                            </li>
                            <li onClick={() => selectAlgorithm("A*")}>A*</li>
                            <li onClick={() => selectAlgorithm("Depth First Search (DFS)")}>Depth First Search (DFS)</li>
                            {/* Add more algorithms as needed */}
                        </ul>
                    )}
                </div>
                <button onClick={handleVisualize} >Visualize {GetSelectedAlgorithmName()}</button>
                {/* <button >Move target</button>
                <button onClick={handleAddWalls}> Add Walls</button> */}
                <button onClick={handleclear}>Clear</button>

            </main>
            <Playground visualize={Visualize} selectedAlgorithm={selectedAlgorithm} Clear={clear} />
        </>
    );
}

export default Header;
