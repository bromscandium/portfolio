import type { Combo } from '@/lib/i18n';

interface Props {
  combo: Combo;
  active: boolean;
  label: string;
  onSelect: (t: Combo) => void;
  onClose: (t: Combo) => void;
  onMiddleClose: (t: Combo) => void;
  onDragStart: (t: Combo) => void;
  onDragOver: (t: Combo) => void;
  onDragEnd: () => void;
}

export const Tab = ({ combo, active, label, onSelect, onClose, onMiddleClose, onDragStart, onDragOver, onDragEnd }: Props) => {
  const select = () => onSelect(combo);

  const middleClose = (e: React.MouseEvent) => {
    if (e.button !== 1) return;
    e.preventDefault();
    e.stopPropagation();
    onMiddleClose(combo);
  };

  const dragStart = (e: React.DragEvent) => {
    onDragStart(combo);
    e.dataTransfer.effectAllowed = 'move';
  };

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(combo);
  };

  const preventDrop = (e: React.DragEvent) => e.preventDefault();

  const close = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(combo);
  };

  return (
    <div
      onClick={select}
      onMouseDown={middleClose}
      draggable
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDrop={preventDrop}
      onDragEnd={onDragEnd}
      className="mt-1 flex w-55 shrink-0 cursor-pointer items-center gap-2.5 rounded-t-card border-r border-black px-4 text-[12px]"
      style={{
        background: active ? '#0c0c0c' : '#131313',
        color: active ? '#bbb' : '#666',
        boxShadow: active ? 'inset 0 2px 0 rgba(248,173,64,.5)' : 'none',
      }}
    >
      <span onClick={close} className="cursor-pointer text-fg-6 transition-colors hover:text-fg">
        ✕
      </span>
      <span className="text-orange">{combo.startsWith('dev') ? '❯' : '✦'}</span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>
    </div>
  );
};
