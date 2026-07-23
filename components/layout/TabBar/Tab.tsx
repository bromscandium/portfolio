import type { Combo } from '@/lib/i18n';
import { MODE_META, splitCombo } from '@/lib/modes';

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
      className={`mt-1 flex w-55 min-w-16 shrink cursor-pointer items-center gap-2.5 rounded-t-card border-black px-4 text-[12px] md:shrink-0 ${active ? 'border-r' : 'border-x'}`}
      style={{
        background: active ? '#0c0c0c' : '#131313',
        color: active ? '#bbb' : '#666',
        boxShadow: active ? 'inset 0 2px 0 rgba(248,173,64,.5)' : 'none',
      }}
    >
      <span className="text-orange">{MODE_META[splitCombo(combo)[0]].icon}</span>
      <span className="truncate">{label}</span>
      <span onClick={close} className="ml-auto cursor-pointer text-fg-6 transition-colors hover:text-fg">
        ✕
      </span>
    </div>
  );
};
