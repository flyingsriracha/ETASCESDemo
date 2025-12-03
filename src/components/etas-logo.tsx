import React from 'react';

interface ETASLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const ETASLogo: React.FC<ETASLogoProps> = ({ 
  width = 160, 
  height = 48,
  className = '' 
}) => {
  return (
    <div 
      className={className}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAdCAIAAAD96H+YAAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAFZasAABMjAA1b3wAALm8AA6ABAAMAAAABAAEAAKACAAQAAAABAAAAcKADAAQAAAABAAAAHQAAAAApekm2AAAAW0lEQVR4nO3QAQkAIBDAQLV/57fEQJC7BGN7Zhad8zrgN4bGDI0ZGjM0ZmjM0JihMUNjhsYMjRkaMzRmaMzQmKExQ2OGxgyNGRozNGZozNCYoTFDY4bGDI0ZGruOrwM3LkvBjQAAAABJRU5ErkJggg=="
        alt="ETAS Logo"
        style={{
          width: 'auto',
          maxHeight: '40px',
          height: '40px',
          filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.15))',
        }}
      />
    </div>
  );
};
