import React, { useState } from "react";
import BubbleSort from "../algorithms/BubbleSort";
import AlgorithmData from "../interface/AlgorithmData";

const AlgorithmVisualizer: React.FC = () => {
    const [algorithm, setAlgorithm] = useState<string>('');
    const [arrayInput, setArrayInput] = useState<string>('');
    const [array, setArray] = useState<number[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0)

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(event?.target?.value);
    }

    const handelArrayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (/^(\d+\s*,\s*)*\d*$/.test(inputValue)) {
            setArrayInput(inputValue);
      
            const inputArray = inputValue
              .split(',')
              .map((num) => parseInt(num.trim(), 10))
              .filter((num) => !isNaN(num));
      
            setArray(inputArray);
        }
    }

    const visualizeAlgorithm = () => {
        let steps: AlgorithmData[] = [];

        switch(algorithm) {
            case 'bubblesort':
                steps = BubbleSort({ array })
                break;
            default:
                break;

        }

        let step = 0;
        const intervalId = setInterval(() => {
            if(step < steps.length) {
                setArray(steps[step].array);
                setCurrentStep(step);
                step++
            } else {
                clearInterval(intervalId)
            }
        }, 500)
    }

    return (
        <div style={{margin: '20px'}}>
            <div>
                <label>
                    Select Algorithm:
                    <select value={algorithm} onChange={handleAlgorithmChange}>
                        <option value="">Select Algorithm</option>
                        <option value="bubblesort">Bubble Sort</option>
                    </select>
                </label>
            </div>
            <div>
                <label>Enter array (comma-seperated numbers):
                    <input type="text" value={arrayInput} onChange={handelArrayChange} />
                </label>
            </div>
            <div>
                <div>
                    {array.map((value, index) => (
                        <span key={index}>
                            {value}{index < array.length - 1? ' ': ''}
                        </span>
                    ))}
                </div>
            </div>
            <div style={{marginTop: '10px'}}>
                {currentStep > 0 && (
                    <p>Current Step: {currentStep}</p>
                )}
            </div>
            <div style={{marginTop: '10px'}}>
            <button onClick={visualizeAlgorithm} disabled={!algorithm}>
                Visualize {algorithm}
            </button>
            </div>
            
        </div>
    )
}

export default AlgorithmVisualizer