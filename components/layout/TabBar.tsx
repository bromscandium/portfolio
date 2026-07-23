import type { Combo } from '@/lib/i18n';

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
}

export function TabBar({
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
}: Props) {
  return (
    <div className="fixed inset-x-0 top-0 z-[200] flex h-9.5 items-stretch border-b border-black bg-panel-5">
      {tabsOpen.map((t) => {
        const isActive = t === activeCombo;
        return (
          <div
            key={t}
            onClick={() => onSelect(t)}
            onMouseDown={(e) => {
              if (e.button === 1) {
                e.preventDefault();
                e.stopPropagation();
                onMiddleClose(t);
              }
            }}
            draggable
            onDragStart={(e) => {
              onDragStart(t);
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragOver={(e) => {
              e.preventDefault();
              onDragOver(t);
            }}
            onDrop={(e) => e.preventDefault()}
            onDragEnd={onDragEnd}
            className="mt-1 flex max-w-80 cursor-pointer items-center gap-2.5 rounded-t-card border-r border-black px-4 text-[12px]"
            style={{
              background: isActive ? '#0c0c0c' : '#131313',
              color: isActive ? '#bbb' : '#666',
              boxShadow: isActive ? 'inset 0 2px 0 rgba(248,173,64,.5)' : 'none',
            }}
          >
            <span className="text-orange">{t.startsWith('dev') ? '❯' : '✦'}</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{labelFor(t)}</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onClose(t);
              }}
              className="ml-2 cursor-pointer text-fg-6 transition-colors hover:text-fg"
            >
              ✕
            </span>
          </div>
        );
      })}
      <div className="relative flex items-center gap-3.5 px-3.5 text-[13px] text-fg-6">
        {plusItems.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPlusOpen(!plusOpen);
            }}
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
}
