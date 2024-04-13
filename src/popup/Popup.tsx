import { Button } from '../app/ui/Button';

const Popup = () => {
  document.body.className = 'w-[50rem] h-[30rem]';
  return (
    <div className="p-2">
      <Button onClick={() => undefined}>getElements</Button>
    </div>
  );
};

export default Popup;
