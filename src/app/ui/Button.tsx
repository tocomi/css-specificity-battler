import { FC, ReactNode, memo } from 'react';

type Props = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

export const Button: FC<Props> = memo(function Button({ onClick, disabled, children }: Props) {
  const bg = disabled ? 'bg-gray-400' : 'bg-sky-600';

  return (
    <button
      className={`${bg} py-2 px-4 rounded-xl text-white text-lg`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});
