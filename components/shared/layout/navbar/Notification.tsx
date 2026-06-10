import Icon from '@/components/ui/icon';

const Notification = () => {
  return (
    <div className="relative">
      <Icon icon="TbBell" size={22} />
      <span className="absolute top-0 right-0.5 flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-red-500" />
      </span>
    </div>
  );
};

export default Notification;
