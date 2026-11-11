import narration from './narration.json'

export const voiceNotes = Object.fromEntries(
  Object.entries(narration).map(([id, n]) => [
    id,
    {
      title: n.title,
      audioSrc: `/media/narration-${id}.mp3`,
      transcript: n.text,
      label: 'AI narrator',
    },
  ]),
)
