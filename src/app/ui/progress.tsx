import * as ProgressPrimitive from '@radix-ui/react-progress';
import { memo } from 'react';

export const Progress = memo(function Progress({ value }: { value: number }) {
  return (
    <ProgressPrimitive.Root
      className={'relative h-2 w-full overflow-hidden rounded-full bg-sky-700/20'}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-sky-700 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
