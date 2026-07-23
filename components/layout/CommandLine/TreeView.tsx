import { useMemo, useRef, useState } from 'react';
import { portfolio, type Project } from '@/lib/data';
import { slugify } from '@/lib/i18n';
import type { CmdContext } from '@/lib/commands';

interface TreeNode {
  key: string;
  label: string;
  section?: number;
  project?: Project;
  children?: TreeNode[];
}

interface Flat {
  node: TreeNode;
  depth: number;
  prefix: string;
  expandable: boolean;
  expanded: boolean;
}

const CATS: { key: Project['category']; label: string }[] = [
  { key: 'professional', label: 'professional' },
  { key: 'hackathon', label: 'hackathons' },
  { key: 'university', label: 'university' },
  { key: 'pet', label: 'pet' },
];

const TREE: TreeNode[] = [
  { key: 'intro', label: 'intro', section: 0 },
  { key: 'experience', label: 'experience', section: 1 },
  { key: 'skills', label: 'skills', section: 2 },
  {
    key: 'projects',
    label: 'projects',
    section: 3,
    children: CATS.map((c) => ({
      key: `cat:${c.key}`,
      label: `${c.label}/`,
      children: portfolio
        .filter((p) => p.category === c.key)
        .sort((a, b) => b.id - a.id)
        .map((p) => ({ key: `p:${p.id}`, label: slugify(p.title), project: p })),
    })),
  },
  { key: 'contact', label: 'contact', section: 4 },
];

const flatten = (nodes: TreeNode[], expanded: Set<string>, ancestors: boolean[] = []): Flat[] => {
  const out: Flat[] = [];
  nodes.forEach((node, i) => {
    const isLast = i === nodes.length - 1;
    const prefix = ancestors.map((last) => (last ? '   ' : '│  ')).join('') + (isLast ? '└─ ' : '├─ ');
    const expandable = !!node.children?.length;
    const isExpanded = expanded.has(node.key);
    out.push({ node, depth: ancestors.length, prefix, expandable, expanded: isExpanded });
    if (expandable && isExpanded) out.push(...flatten(node.children!, expanded, [...ancestors, isLast]));
  });
  return out;
};

interface Props {
  actions: Omit<CmdContext, 'clear' | 'close'>;
  onExit: () => void;
}

export const TreeView = ({ actions, onExit }: Props) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['projects']));
  const [sel, setSel] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const flat = useMemo(() => flatten(TREE, expanded), [expanded]);
  const selClamped = Math.min(sel, flat.length - 1);

  const toggle = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const activate = (f: Flat) => {
    if (f.expandable) return toggle(f.node.key);
    if (f.node.project) {
      actions.goTo(3);
      actions.openProject(f.node.project.id);
      return onExit();
    }
    if (f.node.section !== undefined) {
      actions.goTo(f.node.section);
      return onExit();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    const f = flat[selClamped];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel(Math.min(selClamped + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel(Math.max(selClamped - 1, 0));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (f.expandable && !f.expanded) toggle(f.node.key);
      else activate(f);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (f.expandable && f.expanded) toggle(f.node.key);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      activate(f);
    } else if (e.key === 'Escape' || e.key === 'q') {
      e.preventDefault();
      onExit();
    }
  };

  return (
    <div ref={ref} tabIndex={0} autoFocus onKeyDown={onKeyDown} onBlur={onExit} className="outline-none">
      <div className="font-bold text-cyan">~/yaroslav</div>
      {flat.map((f, i) => {
        const active = i === selClamped;
        const marker = f.expandable ? (f.expanded ? '▾ ' : '▸ ') : '';
        const isProject = !!f.node.project;
        return (
          <div
            key={f.node.key}
            onMouseEnter={() => setSel(i)}
            onMouseDown={(e) => {
              e.preventDefault();
              activate(f);
            }}
            className="cursor-pointer whitespace-pre"
            style={{ background: active ? '#161616' : 'transparent' }}
          >
            <span className="text-fg-9">{f.prefix}</span>
            <span style={{ color: active ? '#f8ad40' : isProject ? '#56b6c2' : '#ddd' }}>
              {marker}
              {f.node.label}
            </span>
          </div>
        );
      })}
      <div className="mt-1 text-[11px] text-fg-6">↑↓ move · → expand · ↵ open · esc quit</div>
    </div>
  );
};
