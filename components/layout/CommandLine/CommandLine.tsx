import type { CmdContext } from '@/lib/commands';
import { SHELL, TERMINAL_ROOT } from '@/lib/config';
import { useCommandLine } from '@/hooks/useCommandLine';
import { CommandRow } from './CommandRow';
import { PathLine } from './PathLine';
import { TreeView } from './TreeView';

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  actions: Omit<CmdContext, 'clear' | 'close'>;
}

export const CommandLine = ({ open, onOpen, onClose, actions }: Props) => {
  const { rows, input, onInputChange, height, inputRef, bodyRef, suggestion, menu, treeOpen, closeTree, onKeyDown, startResize } = useCommandLine(open, onClose, actions);
  const ghost = suggestion && suggestion.startsWith(input) ? suggestion.slice(input.length) : '';

  if (!open) {
    return (
      <button
        onClick={onOpen}
        className="fixed inset-x-0 bottom-6.5 z-[150] flex h-6.5 w-full cursor-pointer items-center gap-2 border-t border-line-0 bg-panel-0 px-4 text-left font-mono text-[11px] text-fg-6 transition-colors hover:text-orange"
      >
        <span className="text-orange">❯</span>
        <span>open terminal</span>
        <span className="ml-auto text-fg-8">` or click</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-6.5 z-[150] flex flex-col border-t border-line-4 bg-[#0a0a0a]" style={{ height }}>
      <div
        onPointerDown={startResize}
        className="flex h-6 shrink-0 cursor-ns-resize items-center gap-2 border-b border-line-2 bg-panel-5 px-3 text-[11px] text-fg-6"
      >
        <span className="text-orange">❯</span>
        <span
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          className="cursor-pointer transition-colors hover:text-orange"
          title="click to close"
        >
          {SHELL} — {TERMINAL_ROOT}
        </span>
        <span className="mx-auto text-fg-9">⠿ drag to resize</span>
        <button onClick={onClose} className="cursor-pointer border-none bg-transparent text-fg-6 transition-colors hover:text-orange" aria-label="close terminal">
          ✕
        </button>
      </div>
      {treeOpen ? (
        <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-[1.55]">
          <TreeView actions={actions} onExit={closeTree} />
        </div>
      ) : (
        <div ref={bodyRef} onClick={() => inputRef.current?.focus()} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-[1.55]">
          {rows.map((r) => (
            <CommandRow key={r.id} row={r} />
          ))}
          <div className="mt-2">
            <PathLine />
            <div className="flex items-center gap-2">
              <span className="text-orange">❯</span>
              <div className="relative min-w-0 flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => onInputChange(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="w-full border-none bg-transparent font-mono text-[13px] text-[#eee] outline-none"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                />
                {ghost && !menu && (
                  <span className="pointer-events-none absolute left-0 top-0 whitespace-pre font-mono text-[13px] text-fg-6" aria-hidden>
                    <span className="invisible">{input}</span>
                    {ghost}
                  </span>
                )}
              </div>
            </div>
            {menu && (
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 pl-4">
                {menu.options.map((o, i) => (
                  <span
                    key={o.value}
                    className="whitespace-pre"
                    style={{ background: i === menu.index ? '#161616' : 'transparent', color: i === menu.index ? 'var(--color-orange)' : '#8a8a8a' }}
                  >
                    {o.value}
                    {o.dir && <span className="text-fg-8">/</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
