import classNames from 'classnames';

interface ProgressProps {
  progress: number;
}

const Progress = ({ progress }: ProgressProps) => {
  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="bg-primary-200 mt-1 h-2 w-[80%] overflow-hidden rounded-full">
        <div
          className={classNames('h-full transition-all duration-300', {
            'bg-primary-500': progress < 100,
            'bg-green-600': progress === 100,
          })}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div
        className={classNames(
          'flex items-center justify-between text-sm font-semibold',
          {
            'text-green-600': progress === 100,
            'text-primary-600': progress < 100,
          }
        )}
      >
        <span>{progress}%</span>
      </div>
    </div>
  );
};

export default Progress;
