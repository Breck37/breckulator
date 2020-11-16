import React, { useState } from 'react'
import '../../styles/calculator.scss';

const BasicCalculator = () => {
    const [total, setTotal] = useState<string | number>(0)

    
    return (
        <div className="inner-calculator  basic">
            <div className="screen">
                {total}
            </div>
            <div className="basic-keys-container">
            <div className="basic-keys basic-keyboard">
                <button className="basic-key one">1</button>
                <button className="basic-key two">2</button>
                <button className="basic-key three">3</button>
                <button className="basic-key 4">4</button>
                <button className="basic-key 5">5</button>
                <button className="basic-key 6 ">6</button>
                <button className="basic-key 7">7</button>
                <button className="basic-key 8">8</button>
                <button className="basic-key 9">9</button>
                <button className="basic-key 0">0</button>
                <button className="basic-key 00">00</button>
                <button className="basic-key dot">.</button>
            </div>
            <div className="basic-keys basic-arithmetic">
                <button className="basic-key plus">+</button>
                <button className="basic-key minus"> - </button>
                <button className="basic-key times">*</button>
                <button className="basic-key divide">/</button>
            </div>
            </div>
        </div>
    )
}

export default BasicCalculator;