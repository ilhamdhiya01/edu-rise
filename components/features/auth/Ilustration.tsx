import Image from 'next/image';
import React from 'react';

const Ilustration = React.memo(() => {
  return (
    <div className="relative aspect-4/5 w-full max-w-[550px]">
      <Image
        src="/images/saly.png"
        alt="Login Background"
        fill
        priority
        className="object-contain"
        sizes="(max-width: 1024px) 0vw, (max-width: 1440px) 40vw, 550px"
      />
    </div>
  );
});

Ilustration.displayName = 'Ilustration';

export default Ilustration;
