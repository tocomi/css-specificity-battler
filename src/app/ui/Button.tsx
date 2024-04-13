import { FC, ReactNode, memo } from 'react';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const Button: FC<Props> = memo(function Button({ onClick, children }: Props) {
  return (
    <button className="py-2 px-4 bg-sky-600 rounded-xl text-white" onClick={onClick}>
      {children}
    </button>
  );
});
