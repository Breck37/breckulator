import React, { useState } from 'react'
import '../../styles/calculator.scss';

const BasicCalculator = () => {
    const [total, setTotal] = useState<string | number>(0)

    
    return (
        <div className="basic">
            <div className="screen-container">
                <div className="screen-top">
                    <div className="logo"></div>
                    <div className="solar"></div>
                </div>
            <div className="screen">
                {total}
            </div>
            </div>
            <div className="middle-skinny"></div>
            <div className="basic-keys-container">
                <button className="basic-key 9">MRC</button>
                <button className="basic-key 9">M-</button>
                <button className="basic-key 9">M+</button>


                <button className="basic-key 9">9</button>
                <button className="basic-key 8">8</button>
                <button className="basic-key 7">7</button>
                <button className="basic-key 6 ">6</button>
                <button className="basic-key 5">5</button>
                <button className="basic-key 4">4</button>
                <button className="basic-key three">3</button>
                <button className="basic-key two">2</button>
                <button className="basic-key one">1</button>
                <button className="basic-key 0">0</button>
                <button className="basic-key dot">.</button>
                <button className="basic-key clear">{"="}</button>

                <button className="operator-key divide">÷</button>
                <button className="operator-key times">x</button>
                <button className="operator-key minus"> - </button>
                <button className="operator-key plus">+</button>

                <button className="operator-key divide">+/-</button>
                <button className="operator-key divide">%</button>
                <button className="operator-key divide">√</button>
                <button className="basic-key equals">CE</button>
                <button className="basic-key divide">On/C</button>
            </div>
        </div>
    )
}

export default BasicCalculator;