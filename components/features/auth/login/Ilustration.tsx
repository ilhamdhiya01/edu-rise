import Image from 'next/image';

const Ilustration = () => {
  return (
    <div className="relative aspect-4/5 w-full max-w-[550px]">
      <Image
        src="/images/saly.png"
        alt="Login Background"
        fill
        priority
        sizes="(max-width: 1024px) 0vw, (max-width: 1440px) 40vw, 550px"
        className="object-contain"
      />
    </div>
  );
};

export default Ilustration;
