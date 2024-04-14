import { BattleScreen } from '../app/features/battle';

const Popup = () => {
  document.body.className = 'w-[50rem] h-[30rem]';

  return (
    <div className="p-2 h-[30rem]">
      <BattleScreen />
    </div>
  );
};

export default Popup;
