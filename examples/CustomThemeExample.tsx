import React from 'react';
import FuturisticChatWidget from '../src/components/FuturisticChatWidget';

export function CustomThemeExample() {
  return (
    <FuturisticChatWidget
      config={{
        theme: {
          primary: 'emerald',
          secondary: 'teal',
          background: 'gray',
          textColor: 'white'
        },
        position: 'bottom-left'
      }}
    />
  );
}

export default CustomThemeExample; 