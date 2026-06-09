import Button from '@/components/ui/button';

export interface StateStatusProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const StateStatus = ({ title, description, action }: StateStatusProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-center text-2xl font-semibold text-neutral-900">
        {title}
      </h2>
      <p className="mt-2 text-center text-neutral-600">{description}</p>
      {action && (
        <Button
          label={action.label}
          className="mt-4"
          onClick={action.onClick}
        />
      )}
    </div>
  );
};

export default StateStatus;
