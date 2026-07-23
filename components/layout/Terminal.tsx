'use client';

import { useEffect, useMemo } from 'react';
import { portfolio } from '@/lib/data';
import { comboLabel, getStrings, type Combo, type Lang, type Mode } from '@/lib/i18n';
import { CMD, EXPAND_DELAY, setSectionEl, useTerminal } from '@/store/terminal';
import { useTerminalEffects } from '@/hooks/useTerminalEffects';
import { TabBar } from './TabBar';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { CommandLine } from './CommandLine';
import { ProfilePicker } from './windows/ProfilePicker';
import { HelpOverlay } from './windows/HelpOverlay';
import { ProjectModal } from './windows/ProjectModal';
import { CommandPalette } from './windows/CommandPalette';
import { Intro } from '@/components/sections/Intro/Intro';
import { Experience } from '@/components/sections/Experience/Experience';
import { Skills } from '@/components/sections/Skills/Skills';
import { Projects } from '@/components/sections/Projects/Projects';
import { Contact } from '@/components/sections/Contact/Contact';

const split = (c: Combo) => c.split('-') as [Mode, Lang];

export const Terminal = () => {
  useTerminalEffects();
  const t = useTerminal();

  const human = t.mode === 'human';
  const s = useMemo(() => getStrings(t.mode, t.lang), [t.mode, t.lang]);
  const activeCombo = `${t.mode}-${t.lang}` as Combo;
  const heroDone = human || t.typedN >= CMD.length;

  const visible = useMemo(
    () => (t.cat === 'all' ? portfolio : portfolio.filter((p) => p.category === t.cat)).slice().sort((a, b) => b.id - a.id),
    [t.cat],
  );
  const modalP = t.expandedId !== null ? portfolio.find((p) => p.id === t.expandedId) ?? null : null;

  useEffect(() => {
    const name = s.navNames[t.active];
    document.title = human ? `portfolio — ${name}` : `~/${name} — zsh`;
  }, [t.active, human, s]);

  return (
    <div className="min-h-screen bg-bg font-mono">
      <TabBar
        tabsOpen={t.tabsOpen}
        activeCombo={activeCombo}
        onSelect={(c) => t.setCombo(...split(c))}
        onClose={t.closeTab}
        onMiddleClose={t.closeTab}
        onDragStart={t.startDrag}
        onDragOver={t.dragOver}
        onDragEnd={t.endDrag}
        plusOpen={t.plusOpen}
        setPlusOpen={t.setPlusOpen}
        plusItems={t.unopenedCombos()}
        onOpenCombo={(c) => t.setCombo(...split(c))}
        labelFor={(c) => comboLabel(c, false)}
        shortLabelFor={(c) => comboLabel(c, false).replace('zsh', 'dev')}
        onOpenPalette={t.openPalette}
      />

      <Sidebar navRoot={s.navRoot} names={s.navNames} active={t.active} onNav={t.goTo} />

      <div className="fixed inset-x-0 top-9.5 z-[90] flex gap-1 overflow-x-auto border-b border-line-1 bg-bg px-3 py-1.5 md:hidden">
        {s.navNames.map((n, i) => (
          <button
            key={n}
            onClick={() => t.goTo(i)}
            className="shrink-0 cursor-pointer whitespace-nowrap rounded-btn border-none bg-transparent px-2 py-1 font-mono text-[12px]"
            style={{ color: t.active === i ? '#f8ad40' : '#8a8a8a' }}
          >
            {n}
          </button>
        ))}
      </div>

      {t.picker && <ProfilePicker onPickDev={() => t.setCombo('dev', t.lang, true)} onPickHuman={() => t.setCombo('human', t.lang, true)} />}

      {t.helpOpen && <HelpOverlay onClose={t.closeHelp} />}

      {t.paletteOpen && <CommandPalette />}

      {modalP && <ProjectModal project={modalP} closing={t.closingM} strings={s} onClose={t.closeModal} />}

      <StatusBar
        activeIdx={t.active}
        activeName={s.navNames[t.active]}
        viewValue={s.viewValue(t.viewHover)}
        viewHover={t.viewHover}
        onViewEnter={() => t.setViewHover(true)}
        onViewLeave={() => t.setViewHover(false)}
        onViewClick={() => t.setCombo(human ? 'dev' : 'human', t.lang)}
        langValue={s.langValue(t.langHover)}
        langHover={t.langHover}
        onLangEnter={() => t.setLangHover(true)}
        onLangLeave={() => t.setLangHover(false)}
        onLangClick={() => t.setCombo(t.mode, t.lang === 'uk' ? 'en' : 'uk')}
      />

      <main className="mt-19 ml-0 md:mt-9.5 md:ml-55" style={{ marginBottom: human ? 26 : 52 }}>
        <Intro
          ref={(el) => setSectionEl(0, el)}
          isDev={!human}
          typedCmd={CMD.slice(0, t.typedN)}
          ghostCmd={heroDone ? '' : CMD.slice(t.typedN)}
          heroDone={heroDone}
          strings={s}
          onWork={() => t.goTo(3)}
          onContact={() => t.goTo(4)}
        />
        <Experience ref={(el) => setSectionEl(1, el)} human={human} strings={s} />
        <Skills ref={(el) => setSectionEl(2, el)} human={human} strings={s} />
        <Projects
          ref={(el) => setSectionEl(3, el)}
          human={human}
          strings={s}
          projects={visible}
          totalCount={portfolio.length}
          cat={t.cat}
          onCat={t.setCat}
          hoverId={t.hoverId}
          expandedId={t.expandedId}
          onEnter={t.cardEnter}
          onLeave={t.cardLeave}
          onClick={t.cardClick}
          dashSec={`${EXPAND_DELAY}s`}
          searchOpen={t.searchOpen}
          onCloseSearch={t.closeSearch}
        />
        <Contact ref={(el) => setSectionEl(4, el)} isDev={!human} strings={s} onCopyEmail={() => t.showToast('copied to clipboard')} />
      </main>

      {t.toast && (
        <div className="fixed bottom-15 left-1/2 z-[650] -translate-x-1/2 rounded-btn border border-line-5 bg-panel-6 px-4 py-2 font-mono text-[12px] text-green shadow-[0_10px_30px_rgba(0,0,0,.6)]" style={{ animation: 'fadeUp .2s ease-out' }}>
          ✓ {t.toast}
        </div>
      )}

      {!human && (
        <CommandLine
          open={t.cmdOpen}
          onOpen={t.openCmd}
          onClose={t.closeCmd}
          actions={{
            goTo: t.goTo,
            openProject: t.openProject,
            openUrl: (url) => {
              if (url.startsWith('mailto:')) window.location.href = url;
              else window.open(url, '_blank', 'noopener,noreferrer');
            },
            setCrt: t.setCrt,
          }}
        />
      )}

      {t.crtOn && <div className="crt-overlay pointer-events-none fixed inset-0 z-[400]" aria-hidden />}
    </div>
  );
}
