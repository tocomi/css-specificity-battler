import { MainScreen } from '../app/features/battle';

const Popup = () => {
  document.body.className = 'w-[50rem] h-[36rem]';

  return (
    <div className="p-2 h-[36rem]">
      <MainScreen />
    </div>
  );
};

export default Popup;
