import classNames from 'classnames';

export interface SectionContentProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

const SectionContent = ({
  title,
  children,
  className,
  titleClassName,
}: SectionContentProps) => {
  return (
    <section className={classNames('flex flex-col gap-4 lg:gap-6', className)}>
      <h1
        className={classNames(
          'text-xl font-semibold text-neutral-600 md:text-2xl',
          titleClassName
        )}
      >
        {title}
      </h1>
      {children}
    </section>
  );
};

export default SectionContent;
