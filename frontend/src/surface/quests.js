import { surfaces } from '../content/surfaces.js'
import { worlds } from '../content/worlds.js'
import { getState, setState, pushToast, openWorld } from '../space/store.js'
import { sound, playNarration } from '../audio/engine.js'
import { walker } from './walker.js'

const questOf = (id) => getState().quests[id] || { started: false, found: [], done: false }
const setQuest = (id, patch) => setState((s) => ({ quests: { ...s.quests, [id]: { ...questOf(id), ...patch } } }))

export function say(speaker, lines, opts = {}) {
  sound.talk()
  walker.target = null
  walker.onArrive = null
  setState({ dialogue: { speaker, lines, i: 0, tone: opts.tone || 'npc', onDone: opts.onDone || null, actions: opts.actions || null } })
}

export function advanceDialogue() {
  const d = getState().dialogue
  if (!d) return
  sound.blip()
  if (d.i < d.lines.length - 1) return setState({ dialogue: { ...d, i: d.i + 1 } })
  if (d.actions) return
  setState({ dialogue: null })
  d.onDone?.()
}

const finaleActions = (id) => [
  { label: 'Hear the AI narration', testid: 'dialogue-action-narration', run: () => { setState({ dialogue: null }); playNarration(id) } },
  { label: 'Open the field log', testid: 'dialogue-action-log', run: () => { setState({ dialogue: null }); openWorld(id) } },
  { label: 'Keep exploring', testid: 'dialogue-action-close', run: () => setState({ dialogue: null }) },
]

export function talkToNpc(id) {
  const s = surfaces[id]
  const q = questOf(id)
  const npc = s.npc
  if (!q.started) {
    return say(npc.name, npc.intro, {
      onDone: () => {
        setQuest(id, { started: true })
        pushToast({ tone: 'quest', title: `New story · ${s.story}`, body: `Find ${s.relics.length} relics, then return to ${npc.name}.` }, 6000)
      },
    })
  }
  if (q.done) return say(npc.name, ['Welcome back, pilot. This story is complete.', worlds.find((w) => w.id === id).lesson], { actions: finaleActions(id) })
  const left = s.relics.length - q.found.length
  if (left > 0) return say(npc.name, [npc.hint.replace('{left}', left)])
  say(npc.name, npc.finale, { actions: finaleActions(id) })
  setQuest(id, { done: true })
  sound.chime()
  pushToast({ tone: 'quest', title: `Story complete · ${s.story}`, body: 'Lesson logged. The field log for this world is open in your star map.' }, 7000)
  if (Object.values(getState().quests).filter((x) => x.done).length === worlds.length) setTimeout(() => setState({ ending: true }), 2500)
}

export function readRelic(id, relic) {
  const q = questOf(id)
  if (q.found.includes(relic.id)) return say(relic.name, relic.lines, { tone: 'relic' })
  say(relic.name, relic.lines, {
    tone: 'relic',
    onDone: () => {
      const found = [...questOf(id).found, relic.id]
      setQuest(id, { found })
      sound.pickup()
      const s = surfaces[id]
      if (found.length === s.relics.length) pushToast({ tone: 'quest', title: 'All relics found', body: `Return to ${s.npc.name} to finish the story.` }, 6000)
    },
  })
}

export function meet(name, lines) {
  setState((s) => ({ met: s.met.includes(name) ? s.met : [...s.met, name] }))
  say(name, [lines[Math.floor(Math.random() * lines.length)]], { tone: 'creature' })
}
