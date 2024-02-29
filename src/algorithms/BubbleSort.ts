import AlgorithmData from "../interface/AlgorithmData";

interface BubbleSortSteps extends AlgorithmData {
    swappedItems: [number, number][];
}

const bubbleSort = (data: AlgorithmData): BubbleSortSteps[] => {
    const { array } = data;
    const steps: BubbleSortSteps[] = [];
    const n = array.length;

    for(let i = 0; i < n-1; i++) {
        let swapped = false;

        for(let j = 0; j < n-i-1; j++) {
            if(array[j] > array[j+1]) {
                [array[j], array[j+1]] = [array[j+1], array[j]]
                swapped = true;

                steps.push({
                    array: [...array],
                    swappedItems: [[j, j+1]]

                })
            }
        }

        if(!swapped) {
            break;
        }
    }
    return steps;
}

export default bubbleSort