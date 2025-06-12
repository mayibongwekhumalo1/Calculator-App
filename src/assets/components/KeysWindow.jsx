import React from 'react'

function KeysWindow({handleButton}) {

    const sciKeys = ["sin", "In", "log", "cos", "tan", "π", "e", "^", "!", "√"];

    const basicKeys = [
        "1",
        "2",
        "3",
        "*",
        '/',
        '4',
        '5',
        '6',
        '-',
        '(',
        '7',
        '8',
        '9',
        '+',
        ')',
        '.',
        '0',
        'DEL',
        'AC',
        '=',
    ];

    return (
        <div className="keysWindow">
            <div className='keys_scientific'>
                {sciKeys.map((item, index) => (
                    <button key={item + index}
                    
                    onClick={() => handleButton(item)}
                    >{item}</button>
                ))}
            </div>

            <div className='keys_basic'>
                {basicKeys.map((item, index) => {
                    const isNumber = /^[0-9]$/.test(item);
                    const isEqual = item === "=";
                    return (
                        <button
                            key={item + index}
                            className={`${isEqual ? "equal" : ""}${isNumber ? " number" : ""}`.trim()}

                            onClick={() => handleButton(item)
                            }
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default KeysWindow;