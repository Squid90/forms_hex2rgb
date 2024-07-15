import React from 'react';
import { useState } from 'react';

const hexToRgb = (hex: string): string | null => {
  let colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  let result = colorRegex.exec(hex);
  
  if (!result) return null;

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  
  return `rgb(${r}, ${g}, ${b})`;
}

const ColorConverter: React.FC = () => {
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHexColor = e.target.value;

    if (newHexColor.length === 7) {
      let rgb = hexToRgb(newHexColor);

      if (rgb) {
        setRgbColor(rgb);
        setError(false);
        document.body.style.backgroundColor = newHexColor;
      } else {
        setRgbColor('');
        setError(true);        
      }
    } else {
      setRgbColor('');
      setError(false);
      document.body.style.backgroundColor = "White";
    }

    setHexColor(newHexColor);
  }

  return (
    <div className="colorBox">
      <input type="text" maxLength="7" className="colorHex" value={hexColor} onChange={handleInputChange} />
      {error ? <label className="colorRgb">Ошибка!</label> : <label>{rgbColor}</label>}
    </div>
  );
}

export default ColorConverter;