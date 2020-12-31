import React, { useState, useEffect } from 'react'
import '../../styles/calculator.scss';

interface BasicOperatorFunctions {
 [key: string]: (a: string, b: string, cFn: any) => void;
}

interface BasicCalcFunctions {
    [key: string]: (args?: any) => void;
}

interface MemoryCalcFunctions {
    [key: string]: (currentMemory: string, memoryIsActive: boolean, currentValue: string, ) => string;
}

const basicOperatorFunctions: BasicOperatorFunctions = {
    plus: (a: string, b: string, cFn: (args: any) => string) => cFn(parseInt(a) + parseInt(b)),
    minus: (a: string, b: string, cFn: (args: any) => string) => cFn(parseInt(a) - parseInt(b)),
    multiply: (a: string, b: string, cFn: (args: any) => string) => cFn(parseInt(a) * parseInt(b)),
    divide: (a: string, b: string, cFn: (args: any) => string) => cFn(parseInt(a) / parseInt(b)),
};


const BasicCalculator = () => {
    const [currentValue, setCurrentValue] = useState<string>('')
    const [lastValue, setLastValue] = useState<string>('')
    const [memory, setMemory] = useState<string>('0')
    const [memoryIsActive, setMemoryIsActive] = useState<boolean>(false)
    const [operations, setOperations] = useState<string[]>([]);
    const [total, setTotal] = useState<string | number | any>(0);
    const [isPowerOn, setIsPowerOn] = useState<boolean>(false);
    const [fontSize, setFontSize] = useState(5)

    useEffect(() => {
        var elem = document.getElementById('screen');

        if(elem && elem?.scrollWidth > 322) {
            setFontSize(fontSize - 0.1)
        } else if (currentValue.length < 8 && fontSize < 5) {
            setFontSize(5);
        }
    }, [currentValue, fontSize])

    const basicFunctions: BasicCalcFunctions = {
        power: isPowerOn && (currentValue || lastValue || memory !== '0' || total || isNaN(total)) ? () => { 
            resetState();
        } : () => {
            setMemory('0')
            setMemoryIsActive(false);
            setIsPowerOn(!isPowerOn)
        },
        clearEntry: (a: string) => {
            if(!a) return;
            const splitEntry = a.split('');
            splitEntry.pop();
            if(memoryIsActive) {
                setMemory(splitEntry.join(''));
            } else {
                setCurrentValue(splitEntry.join(''));
            }
        },
        square: (a: string) => {
            const squared = Math.sqrt(parseInt(a));
            if(memoryIsActive) {
                setMemory(`${squared}`)
            } else {
                setCurrentValue(`${squared}`)
            }
        },
        percent: (a: string) => {
            if(memoryIsActive) {
                setMemory(parseInt(a) / 100 + '')
            } else {
                setCurrentValue(parseInt(a) / 100 + '')
            }
            setTotal(parseInt(a) / 100)
        },
        invert: (a: string) => {
            const entryToInvert = a.split('')
            const setFunction = memoryIsActive ? setMemory : setCurrentValue;
            if(entryToInvert.includes('-')) {
                entryToInvert.shift();
                setFunction(entryToInvert.join(''));
            } else {
                entryToInvert.unshift('-');
                setFunction(entryToInvert.join(''))
            }   
        },
    }

    const resetState = () => {
            setMemoryIsActive(false);
            setFontSize(5);
            setTotal(0)
            setCurrentValue('');
            setLastValue('');
            setOperations([])
            setMemory('0');
    }

    const memoryOperatorFunctions: MemoryCalcFunctions = {
        MRC: (currentMemory, memoryIsActive) => {
            if(memoryIsActive) return '0';
            return currentMemory;
        },
        'M-': (currentMemory, memoryIsActive, currentValue) => {
            return `${parseInt(currentMemory) - parseInt(currentValue)}`
        },
        'M+': (currentMemory, memoryIsActive, currentValue) => {
            return `${parseInt(currentMemory) + parseInt(currentValue)}`
        },
    };

    const updateCurrentValue = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMemoryIsActive(false);
        if(!isPowerOn) return;

        if(currentValue === lastValue && operations.length) {
            const lastValueToSet = currentValue;
            setLastValue(lastValueToSet);
            setCurrentValue(event.currentTarget.value);
        } else {
            setCurrentValue(currentValue + event.currentTarget.value)
        }
    }

    const updateOperations = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOperations([event.currentTarget.value])
    }

    const includeOperator = (operator: React.MouseEvent<HTMLButtonElement>) => {
        if(!currentValue) return;

        if(operations.length > 0) {
            equate();
        }
        setLastValue(currentValue)
        updateOperations(operator)
    }

    const setFunction = (selectedFunction: React.MouseEvent<HTMLButtonElement>) => {
        return basicFunctions[selectedFunction.currentTarget.value](currentValue)
    }

    const equate = () => {
        if (operations.length > 0 && total) {
            basicOperatorFunctions[operations[operations.length - 1]](total, currentValue, setTotal);
            setCurrentValue('')
        } else if (operations.length > 0 && lastValue) {
            basicOperatorFunctions[operations[operations.length - 1]](lastValue, currentValue, setTotal);
            setCurrentValue('')
            setLastValue('')
            return;
        } 
    };

    const handleMemoryChange = (memoryFunction: React.MouseEvent<HTMLButtonElement>) => {
        const memoryResult = memoryOperatorFunctions[memoryFunction.currentTarget.value](memory, memoryIsActive, currentValue);
        if(memoryResult !== memory) {
            setMemory(memoryResult);
        }
        setMemoryIsActive(true);
        setCurrentValue('');
    };

    return (
        <div className="basic">
            <div className="screen-container">
                <div className="screen-top">
                    <div className="logo">
                        <p>Breckulator</p>
                        <h4>7000</h4>
                    </div>
                    <div className="solar"></div>
                </div>
            <div id="screen" className="screen" style={{fontSize: `${fontSize}vw`, display: fontSize < 5 ? 'flex' : 'block'}}>
                {memoryIsActive && isPowerOn ? memory : 
                    currentValue && isPowerOn ? currentValue : 
                        isPowerOn ? total : ''}
            </div>
            </div>
            <div className="basic-keys-container">
                <div className="top row">
                    <button onClick={setFunction} value="invert" className="operator-key divide">+/-</button>
                    <button onClick={setFunction} value="percent" className="operator-key divide">%</button>
                    <button onClick={setFunction} value="square" className="operator-key divide">√</button>
                    <button onClick={setFunction} value="clearEntry" className="basic-key equals red">CE</button>
                    <button onClick={setFunction} value="power" className="basic-key divide red">On/C</button>
                </div>

                <div className="row">
                    <button onClick={handleMemoryChange} value="MRC" className="basic-key 9">MRC</button>
                    <button onClick={handleMemoryChange} value="M-" className="basic-key 9">M-</button>
                    <button onClick={handleMemoryChange} value="M+" className="basic-key 9">M+</button>
                    <button onClick={includeOperator} value="divide" className="operator-key divide">÷</button>
                </div>

                <div className="row">   
                    <button onClick={updateCurrentValue} value={9} className="basic-key 9">9</button>
                    <button onClick={updateCurrentValue} value={8} className="basic-key 8">8</button>
                    <button onClick={updateCurrentValue} value={7} className="basic-key 7">7</button>
                    <button onClick={includeOperator} value="multiply" className="operator-key times">x</button>
                </div>

                <div className="row">
                    <button onClick={updateCurrentValue} value={6}   className="basic-key 6 ">6</button>
                    <button onClick={updateCurrentValue} value={5}  className="basic-key 5">5</button>
                    <button onClick={updateCurrentValue} value={4} className="basic-key 4">4</button>
                    <button onClick={includeOperator} value="minus" className="operator-key minus"> - </button>
                </div>

                <div className="bottom-container">
                    <div>
                        <div className="small row">
                            <button onClick={updateCurrentValue} value={3}  className="basic-key three">3</button>
                            <button onClick={updateCurrentValue} value={2}  className="basic-key two">2</button>
                            <button onClick={updateCurrentValue} value={1}   className="basic-key one">1</button>
                        </div>
                        <div className="small row">
                            <button onClick={updateCurrentValue} value={0} className="basic-key 0">0</button>
                            <button onClick={updateCurrentValue} value={'.'} className="basic-key dot">.</button>
                            <button onClick={equate} className="basic-key clear">{"="}</button>
                        </div>
                    </div>
                    <button onClick={includeOperator} value="plus" className=" plus operator-key plus">+</button>
                </div>
            </div>
        </div>
    )
}

export default BasicCalculator;