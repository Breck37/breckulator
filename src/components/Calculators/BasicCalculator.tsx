import React, { useState } from 'react'
import '../../styles/calculator.scss';

const BasicCalculator = () => {
    const [total, setTotal] = useState<string | number | any>(0);


    const updateTotal = (total: any) => {
        setTotal(Number(total))
        console.log(total)
    }

    const includeOperator = (operator: React.MouseEvent<HTMLElement>) => {
        console.log(operator);
    }

    
    return (
        <div className="basic">
            <div className="screen-container">
                <div className="screen-top">
                    <div className="logo">
                        <p>Beckulator</p>
                        <h4>7000</h4>
                    </div>
                    <div className="solar"></div>
                </div>
            <div className="screen">
                {total}
            </div>
            </div>
            <div className="middle-skinny"></div>
            <div className="basic-keys-container">
                <button onClick={e => updateTotal(e.target)} value="invert" className="operator-key divide">+/-</button>
                <button onClick={e => updateTotal(e.target)} value="percent" className="operator-key divide">%</button>
                <button onClick={e => updateTotal(e.target)} value="square" className="operator-key divide">√</button>
                <button onClick={e => updateTotal(e.target)} value="clearEntry" className="basic-key equals">CE</button>
                <button onClick={e => updateTotal(e.target)} value="poer" className="basic-key divide">On/C</button>

                <button onClick={e => updateTotal(e.target)} value="" className="basic-key 9">MRC</button>
                <button onClick={e => updateTotal(e.target)} value="" className="basic-key 9">M-</button>
                <button onClick={e => updateTotal(e.target)} value="" className="basic-key 9">M+</button>
                <button onClick={includeOperator} value="" className="operator-key divide">÷</button>


                <button onClick={e => updateTotal(e.target)}   className="basic-key 9">9</button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key 8">8</button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key 7">7</button>
                <button onClick={includeOperator} value="multiply" className="operator-key times">x</button>

                <button onClick={e => updateTotal(e.target)}   className="basic-key 6 ">6</button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key 5">5</button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key 4">4</button>
                <button onClick={includeOperator} value="" className="operator-key minus"> - </button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key three">3</button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key two">2</button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key one">1</button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key 0">0</button>
                <button onClick={e => updateTotal(e.target)}   className="basic-key dot">.</button>
                <button onClick={includeOperator}   className="basic-key clear">{"="}</button>
                <button onClick={includeOperator} value="" className="operator-key plus">+</button>

            </div>
        </div>
    )
}

export default BasicCalculator;