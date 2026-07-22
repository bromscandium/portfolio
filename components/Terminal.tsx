'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { portfolio, type Category } from '@/lib/data';
import { comboLabel, getStrings, type Combo, type Lang, type Mode } from '@/lib/i18n';
import { TabBar } from './TabBar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { ProfilePicker } from './ProfilePicker';
import { ProjectModal } from './ProjectModal';
import { Intro } from './sections/Intro';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';
import { Contact } from './sections/Contact';

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
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 38, behavior: 'smooth' });
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
    let typeT: ReturnType<typeof setTimeout>;
    const tick = () => {
      setTypedN((n) => {
        if (n < CMD.length) {
          typeT = setTimeout(tick, 65);
          return n + 1;
        }
        return n;
      });
    };
    typeT = setTimeout(tick, 65);
    const fb = setTimeout(() => setTypedN(CMD.length), 2500);
    return () => {
      clearTimeout(typeT);
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedId !== null) closeM();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expandedId, closeM]);

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

      {picker && <ProfilePicker onPickDev={() => setCombo('dev', lang, true)} onPickHuman={() => setCombo('human', lang, true)} />}

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

      <main className="mt-[38px] mb-[26px] ml-0 md:ml-[220px]">
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
        <Work
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
        />
        <Contact ref={ref4} isDev={!human} strings={s} />
      </main>
    </div>
  );
}
