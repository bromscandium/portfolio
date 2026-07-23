'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { portfolio, type Category } from '@/lib/data';
import { comboLabel, getStrings, type Combo, type Lang, type Mode } from '@/lib/i18n';
import { TabBar } from './TabBar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { CommandLine } from './CommandLine';
import { ProfilePicker } from './windows/ProfilePicker';
import { HelpOverlay } from './windows/HelpOverlay';
import { ProjectModal } from './windows/ProjectModal';
import { Intro } from '@/components/sections/Intro/Intro';
import { Experience } from '@/components/sections/Experience/Experience';
import { Skills } from '@/components/sections/Skills/Skills';
import { Projects } from '@/components/sections/Projects/Projects';
import { Contact } from '@/components/sections/Contact/Contact';

const CMD = 'whoami --verbose';
const ALL_COMBOS: Combo[] = ['dev-en', 'dev-uk', 'human-en', 'human-uk'];
const PRE_DELAY = 1;
const EXPAND_DELAY = 0.55;

export function Terminal() {
  const [mode, setMode] = useState<Mode>('dev');
  const [lang, setLang] = useState<Lang>('en');
  const [tabsOpen, setTabsOpen] = useState<Combo[]>(['dev-en']);
  const [active, setActive] = useState(0);
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [closingM, setClosingM] = useState(false);
  const [picker, setPicker] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [langHover, setLangHover] = useState(false);
  const [viewHover, setViewHover] = useState(false);
  const [typedN, setTypedN] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [crtOn, setCrtOn] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ref0 = useRef<HTMLElement>(null);
  const ref1 = useRef<HTMLElement>(null);
  const ref2 = useRef<HTMLElement>(null);
  const ref3 = useRef<HTMLElement>(null);
  const ref4 = useRef<HTMLElement>(null);
  const refs = [ref0, ref1, ref2, ref3, ref4];
  const preT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overId = useRef<number | null>(null);
  const dragTab = useRef<Combo | null>(null);
  const closingRef = useRef(false);

  const human = mode === 'human';
  const s = useMemo(() => getStrings(mode, lang), [mode, lang]);
  const activeCombo = `${mode}-${lang}` as Combo;
  const heroDone = human || typedN >= CMD.length;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const setCombo = useCallback((m: Mode, l: Lang, fromPicker = false) => {
    const combo = `${m}-${l}` as Combo;
    setMode(m);
    setLang(l);
    setPlusOpen(false);
    if (fromPicker) {
      setPicker(false);
      setTabsOpen([combo]);
    } else {
      setTabsOpen((prev) => (prev.includes(combo) ? prev : [...prev, combo]));
    }
    try {
      localStorage.setItem('brom_mode', m);
      localStorage.setItem('brom_lang', l);
    } catch {}
  }, []);

  const goTo = useCallback((i: number) => {
    const el = refs[i].current;
    if (!el) return;
    const extra = window.matchMedia('(min-width: 768px)').matches ? 0 : 44;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 38 - extra, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeM = useCallback(() => {
    if (closingRef.current || expandedId === null) return;
    closingRef.current = true;
    setClosingM(true);
    setTimeout(() => {
      closingRef.current = false;
      setExpandedId(null);
      setClosingM(false);
    }, 240);
  }, [expandedId]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const m = localStorage.getItem('brom_mode');
      const l = localStorage.getItem('brom_lang');
      const savedLang: Lang = l === 'uk' || l === 'en' ? l : 'en';
      if (m === 'dev' || m === 'human') {
        setMode(m);
        setLang(savedLang);
        setTabsOpen([`${m}-${savedLang}` as Combo]);
      } else {
        setLang(savedLang);
        setPicker(true);
      }
    } catch {}
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setTypedN(n);
      if (n >= CMD.length) clearInterval(id);
    }, 65);
    const fb = setTimeout(() => {
      clearInterval(id);
      setTypedN(CMD.length);
    }, 2500);
    return () => {
      clearInterval(id);
      clearTimeout(fb);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let act = 0;
      refs.forEach((r, i) => {
        if (r.current && r.current.getBoundingClientRect().top <= mid) act = i;
      });
      setActive((prev) => (prev !== act ? act : prev));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCardEnter = useCallback(
    (id: number) => {
      if (expandedId === id) return;
      overId.current = id;
      if (preT.current) clearTimeout(preT.current);
      if (hoverT.current) clearTimeout(hoverT.current);
      preT.current = setTimeout(() => {
        if (overId.current !== id) return;
        setHoverId(id);
        hoverT.current = setTimeout(() => {
          if (overId.current === id) {
            setExpandedId(id);
            setHoverId(null);
          }
        }, EXPAND_DELAY * 1000);
      }, PRE_DELAY * 1000);
    },
    [expandedId],
  );

  const onCardLeave = useCallback((id: number) => {
    overId.current = null;
    if (preT.current) clearTimeout(preT.current);
    if (hoverT.current) clearTimeout(hoverT.current);
    setHoverId((prev) => (prev === id ? null : prev));
  }, []);

  const onCardClick = useCallback((id: number) => {
    if (preT.current) clearTimeout(preT.current);
    if (hoverT.current) clearTimeout(hoverT.current);
    setExpandedId((prev) => (prev === id ? null : id));
    setHoverId(null);
  }, []);

  const closeTab = useCallback(
    (t: Combo) => {
      if (tabsOpen.length < 2) return;
      const left = tabsOpen.filter((x) => x !== t);
      setTabsOpen(left);
      if (activeCombo === t) {
        const [m, l] = left[0].split('-') as [Mode, Lang];
        setCombo(m, l);
      }
    },
    [tabsOpen, activeCombo, setCombo],
  );

  const onDragOver = useCallback(
    (t: Combo) => {
      const from = dragTab.current;
      if (!from || from === t) return;
      setTabsOpen((prev) => {
        const arr = prev.filter((x) => x !== from);
        arr.splice(arr.indexOf(t) + (prev.indexOf(from) < prev.indexOf(t) ? 1 : 0), 0, from);
        return arr;
      });
    },
    [],
  );

  const cycleTab = useCallback(
    (dir: number) => {
      const i = tabsOpen.indexOf(activeCombo);
      const ni = (i + dir + tabsOpen.length) % tabsOpen.length;
      const [m, l] = tabsOpen[ni].split('-') as [Mode, Lang];
      setCombo(m, l);
    },
    [tabsOpen, activeCombo, setCombo],
  );

  const openNewTab = useCallback(() => {
    const un = ALL_COMBOS.filter((c) => !tabsOpen.includes(c));
    if (un.length) {
      const [m, l] = un[0].split('-') as [Mode, Lang];
      setCombo(m, l);
    }
  }, [tabsOpen, setCombo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing = !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

      if (e.key === 'Escape') {
        if (helpOpen) return setHelpOpen(false);
        if (searchOpen) return setSearchOpen(false);
        if (expandedId !== null) return closeM();
        if (cmdOpen) return setCmdOpen(false);
        if (plusOpen) return setPlusOpen(false);
        return;
      }
      if (e.key === '`' && !human) {
        e.preventDefault();
        setCmdOpen((v) => !v);
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case 'j':
        case 'ArrowDown':
          e.preventDefault();
          goTo(Math.min(active + 1, 4));
          break;
        case 'k':
        case 'ArrowUp':
          e.preventDefault();
          goTo(Math.max(active - 1, 0));
          break;
        case 'g':
          goTo(0);
          break;
        case 'G':
          goTo(4);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          goTo(Number(e.key) - 1);
          break;
        case ']':
          cycleTab(1);
          break;
        case '[':
          cycleTab(-1);
          break;
        case 't':
          openNewTab();
          break;
        case 'w':
          closeTab(activeCombo);
          break;
        case '/':
          e.preventDefault();
          goTo(3);
          setSearchOpen(true);
          break;
        case '?':
          setHelpOpen((v) => !v);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, expandedId, helpOpen, searchOpen, cmdOpen, human, plusOpen, goTo, closeM, cycleTab, openNewTab, closeTab, activeCombo]);

  useEffect(() => {
    const name = s.navNames[active];
    document.title = human ? `portfolio — ${name}` : `~/${name} — zsh`;
  }, [active, human, s]);

  const visible = useMemo(
    () => (cat === 'all' ? portfolio : portfolio.filter((p) => p.category === cat)).slice().sort((a, b) => b.id - a.id),
    [cat],
  );
  const modalP = expandedId !== null ? portfolio.find((p) => p.id === expandedId) ?? null : null;

  return (
    <div className="min-h-screen bg-bg font-mono">
      <TabBar
        tabsOpen={tabsOpen}
        activeCombo={activeCombo}
        onSelect={(t) => setCombo(...(t.split('-') as [Mode, Lang]))}
        onClose={closeTab}
        onMiddleClose={closeTab}
        onDragStart={(t) => (dragTab.current = t)}
        onDragOver={onDragOver}
        onDragEnd={() => (dragTab.current = null)}
        plusOpen={plusOpen}
        setPlusOpen={setPlusOpen}
        plusItems={ALL_COMBOS.filter((c) => !tabsOpen.includes(c))}
        onOpenCombo={(c) => setCombo(...(c.split('-') as [Mode, Lang]))}
        labelFor={(c) => comboLabel(c, false)}
        shortLabelFor={(c) => comboLabel(c, true)}
      />

      <Sidebar navRoot={s.navRoot} names={s.navNames} active={active} onNav={goTo} />

      <div className="fixed inset-x-0 top-[38px] z-[90] flex gap-1 overflow-x-auto border-b border-line-1 bg-bg px-3 py-[6px] md:hidden">
        {s.navNames.map((n, i) => (
          <button
            key={n}
            onClick={() => goTo(i)}
            className="shrink-0 cursor-pointer whitespace-nowrap rounded-btn border-none bg-transparent px-2 py-1 font-mono text-[12px]"
            style={{ color: active === i ? '#f8ad40' : '#8a8a8a' }}
          >
            {n}
          </button>
        ))}
      </div>

      {picker && <ProfilePicker onPickDev={() => setCombo('dev', lang, true)} onPickHuman={() => setCombo('human', lang, true)} />}

      {helpOpen && <HelpOverlay onClose={() => setHelpOpen(false)} />}

      {modalP && <ProjectModal project={modalP} closing={closingM} strings={s} onClose={closeM} />}

      <StatusBar
        activeIdx={active}
        activeName={s.navNames[active]}
        viewValue={s.viewValue(viewHover)}
        viewHover={viewHover}
        onViewEnter={() => setViewHover(true)}
        onViewLeave={() => setViewHover(false)}
        onViewClick={() => setCombo(human ? 'dev' : 'human', lang)}
        langValue={s.langValue(langHover)}
        langHover={langHover}
        onLangEnter={() => setLangHover(true)}
        onLangLeave={() => setLangHover(false)}
        onLangClick={() => setCombo(mode, lang === 'uk' ? 'en' : 'uk')}
      />

      <main className="mt-[76px] ml-0 md:mt-[38px] md:ml-[220px]" style={{ marginBottom: human ? 26 : 52 }}>
        <Intro
          ref={ref0}
          isDev={!human}
          typedCmd={CMD.slice(0, typedN)}
          ghostCmd={heroDone ? '' : CMD.slice(typedN)}
          heroDone={heroDone}
          strings={s}
          onWork={() => goTo(3)}
          onContact={() => goTo(4)}
        />
        <Experience ref={ref1} human={human} strings={s} />
        <Skills ref={ref2} human={human} strings={s} />
        <Projects
          ref={ref3}
          human={human}
          strings={s}
          projects={visible}
          totalCount={portfolio.length}
          cat={cat}
          onCat={(c) => {
            setCat(c);
            setExpandedId(null);
            setHoverId(null);
          }}
          hoverId={hoverId}
          expandedId={expandedId}
          onEnter={onCardEnter}
          onLeave={onCardLeave}
          onClick={onCardClick}
          dashSec={`${EXPAND_DELAY}s`}
          searchOpen={searchOpen}
          onCloseSearch={() => setSearchOpen(false)}
        />
        <Contact ref={ref4} isDev={!human} strings={s} onCopyEmail={() => showToast('copied to clipboard')} />
      </main>

      {toast && (
        <div className="fixed bottom-[60px] left-1/2 z-[650] -translate-x-1/2 rounded-btn border border-line-5 bg-panel-6 px-4 py-2 font-mono text-[12px] text-green shadow-[0_10px_30px_rgba(0,0,0,.6)]" style={{ animation: 'fadeUp .2s ease-out' }}>
          ✓ {toast}
        </div>
      )}

      {!human && (
        <CommandLine
          open={cmdOpen}
          onOpen={() => setCmdOpen(true)}
          onClose={() => setCmdOpen(false)}
          actions={{
            goTo,
            openProject: (id) => setExpandedId(id),
            openUrl: (url) => {
              if (url.startsWith('mailto:')) window.location.href = url;
              else window.open(url, '_blank', 'noopener,noreferrer');
            },
            setCrt: setCrtOn,
          }}
        />
      )}

      {crtOn && <div className="crt-overlay pointer-events-none fixed inset-0 z-[400]" aria-hidden />}
    </div>
  );
}
