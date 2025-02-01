// pages/page5.tsx
import React from 'react';

const Page5: React.FC = () => {
   return (
      <div>
         <h1>This is Page 5</h1>
         <p>This page does not use the default layout.</p>
      </div>
   );
};

// Layout'u devre dışı bırakmak için özel bir ayar
Page5.noLayout = true;

export default Page5;
