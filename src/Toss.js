import React from 'react'

export default function Toss() {

    let initailRandomValue = false;
    let randomValue = 0;

    const doToss = () => {
        randomValue = Math.floor(Math.random() * 10 + 10);
        setTimeout(animateResult, 80);
    }

    const animateResult = () => {
        let result = initailRandomValue? 'tails': 'heads';
        initailRandomValue = !initailRandomValue;
        if(randomValue>0) {
            randomValue--;
            document.getElementById('toss-section').innerText = result;
            setTimeout(animateResult, 80);
        }
    }

    const reset = () => {
        document.getElementById('toss-section').innerText = "";
    }

    return (
        <div className = "app">
            <div className = "app-title">
                <h1>SukhaYaGilla</h1>
                <p>Gudiyari Cricket Association</p>
            </div>
            <div className = "toss-section" id = "toss-section"></div>
            <button onClick = {doToss}>Toss</button>
            <button onClick = {reset}>Reset</button>
            <h3>Made by Rohan</h3>
        </div>
    )
}
