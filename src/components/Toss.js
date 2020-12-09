import React from 'react'

export default function Toss() {

    let initailRandomValue = false;
    let randomValue = 0;

    const doToss = () => {
        randomValue = Math.floor(Math.random() * 10 + 10);
        setTimeout(animateResult, 80);
    }

    const animateResult = () => {
        let result = initailRandomValue ? 'tails' : 'heads';
        initailRandomValue = !initailRandomValue;
        if (randomValue > 0) {
            randomValue--;
            document.getElementById('toss-section').innerText = result;
            setTimeout(animateResult, 80);
        }
    }

    const reset = () => {
        document.getElementById('toss-section').innerText = "";
    }

    return (
        <>
            <div className="toss-section" id="toss-section"></div>
            <button onClick={doToss}>Toss</button>
            <button onClick={reset}>Reset</button>
        </>
    )
}
