import type { Combo } from '@/lib/i18n';
import { Tab } from './Tab';

interface Props {
  tabsOpen: Combo[];
  activeCombo: Combo;
  onSelect: (t: Combo) => void;
  onClose: (t: Combo) => void;
  onMiddleClose: (t: Combo) => void;
  onDragStart: (t: Combo) => void;
  onDragOver: (t: Combo) => void;
  onDragEnd: () => void;
  plusOpen: boolean;
  setPlusOpen: (v: boolean) => void;
  plusItems: Combo[];
  onOpenCombo: (c: Combo) => void;
  labelFor: (c: Combo) => string;
  shortLabelFor: (c: Combo) => string;
  onOpenPalette: () => void;
}

export const TabBar = ({
  tabsOpen,
  activeCombo,
  onSelect,
  onClose,
  onMiddleClose,
  onDragStart,
  onDragOver,
  onDragEnd,
  plusOpen,
  setPlusOpen,
  plusItems,
  onOpenCombo,
  labelFor,
  shortLabelFor,
  onOpenPalette,
}: Props) => {
  const togglePlus = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlusOpen(!plusOpen);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-[200] flex h-9.5 items-stretch border-b border-black bg-panel-5">
      {tabsOpen.map((t) => (
        <Tab
          key={t}
          combo={t}
          active={t === activeCombo}
          label={labelFor(t)}
          onSelect={onSelect}
          onClose={onClose}
          onMiddleClose={onMiddleClose}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        />
      ))}
      <div className="relative flex items-center gap-3.5 px-3.5 text-[13px] text-fg-6">
        {plusItems.length > 0 && (
          <button
            onClick={togglePlus}
            title="open new tab"
            className="cursor-pointer border-none bg-transparent p-0 font-mono text-[15px] text-fg-6 transition-colors hover:text-orange"
          >
            +
          </button>
        )}
        {plusOpen && plusItems.length > 0 && (
          <div className="absolute left-0 top-9 z-[700] flex min-w-47.5 flex-col rounded-card border border-line-5 bg-panel-6 p-1.5 shadow-[0_14px_40px_rgba(0,0,0,.6)]">
            {plusItems.map((c) => (
              <button
                key={c}
                onClick={() => onOpenCombo(c)}
                className="cursor-pointer rounded-btn border-none bg-transparent px-3 py-2.25 text-left font-mono text-[12px] text-fg-1 transition-colors hover:bg-[#222] hover:text-orange"
              >
                + {shortLabelFor(c)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
