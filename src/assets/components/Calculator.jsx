import React from 'react'
import DisplayWindow from './DisplayWindow'
import KeysWindow from './KeysWindow'
import { useState } from 'react'

const Calculator = () => {
  const [displayExp, setDisplayExp] = useState("");
  const [result] = useState("0");

  const sciFunctions = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    log: Math.log10,
    ln: Math.log,
    '√': Math.sqrt,
    π: () => Math.PI,
    e: () => Math.E,
    "^": (base, exponent) => Math.pow(base, exponent),
    "!": (n) => {
      if (n < 0) return NaN;
      if (n === 0 || n === 1) return 1;
      let factorial = 1;
      for (let i = 2; i <= n; i++) {
        factorial *= i;
      }
      return factorial;
    }
  };

  function parseExpression(expr) {
    try {
     
      let parsed = expr
        .replace(/sin\(([^)]+)\)/g, (_, val) => `Math.sin(${val})`)
        .replace(/cos\(([^)]+)\)/g, (_, val) => `Math.cos(${val})`)
        .replace(/tan\(([^)]+)\)/g, (_, val) => `Math.tan(${val})`)
        .replace(/log\(([^)]+)\)/g, (_, val) => `Math.log10(${val})`)
        .replace(/ln\(([^)]+)\)/g, (_, val) => `Math.log(${val})`)
        .replace(/\u221a\(([^)]+)\)/g, (_, val) => `Math.sqrt(${val})`)
        .replace(/\u03c0/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/(\d+)!/g, (_, val) => `${sciFunctions["!"](+val)}`);

      return eval(parsed);
    } catch {
      return "Error";
    }
  }

  function handleButton(value) {
    if (value === "AC") {
      setDisplayExp("");
    } else if (value === "DEL") {
      setDisplayExp(displayExp.slice(0, -1));
    } else if (Object.prototype.hasOwnProperty.call(sciFunctions, value)) {
      if (value === 'π' || value === 'e') {
        setDisplayExp(displayExp + sciFunctions[value]());
      } else if (value === '!') {
        setDisplayExp(displayExp + '!');
      } else {
        setDisplayExp(displayExp + value + '(');
      }
    } else if (value === "=") {
      const result = parseExpression(displayExp);
      setDisplayExp(result.toString());
    } else {
      setDisplayExp(displayExp + value);
    }
  }

  return (
    <div className='calculator'>
      <DisplayWindow expression={displayExp} result={result} />
      <KeysWindow handleButton={handleButton} />
    </div>
  );
}

export default Calculator;
