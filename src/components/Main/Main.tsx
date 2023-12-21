import React, { useState, useEffect } from 'react';
import calculateTimeInSeconds from '../../Helpers/TimerHelper';
import Controls from '../Controls/Controls';
import useTimeStore from '../../timeStore';
import './Main.css';

function Main() {
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const setTimeArray = useTimeStore((state) => state.setTimeArray);
    const timeArray = useTimeStore((state) => state.timeArray);
    
    // const [timeArray, setTimeArray] = useState<Array<number|string>>([]);
    // timeArray 를 firebase에 줘야하는데.. 어캐 export하지? 걍 위에서 value를 끄집어 올 수도? (props)
    // redux?

    useEffect(() => {
        setTimeArray(calculateTimeInSeconds(timeInSeconds));
    }, [timeInSeconds]); 

    return(
        <main className="stopwatch-container">
            <section className="timer-display">
                <p id="hour">{timeArray[0]}</p>
                <span>:</span>
                <p id="minute">{timeArray[1]}</p>
                <span>:</span>
                <p id="second">{timeArray[2]}</p>
            </section>
            <Controls setTimeInSeconds={setTimeInSeconds} />
        </main>
    );
}

export default Main;