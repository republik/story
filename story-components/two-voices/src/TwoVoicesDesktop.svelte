<script lang="ts">
  import type {InputData} from "./types.d.ts";
  import ChapterPageDesktop from "./ChapterPageDesktop.svelte";
  import ChapterHeader from "./ChapterHeader.svelte";
  import {css} from "@story/theme/css";

  interface Props {
    componentData: InputData;
  }

  let {componentData}: Props = $props();
  let voices = $derived(componentData ? componentData.voices : []);
</script>

<div class={css({ maxWidth: '900px', mx: 'auto', px: '4' })}>
    {#each componentData.chapters as chapter, chIdx}
        <div data-chapter class={css({ display: 'flex', flexDirection: 'column', pb: '80px' })}>
            <ChapterHeader title={chapter.title} time={chapter.time} coverUrl={chapter.coverUrl}/>
            {#each chapter.pages as page, i}
                {@const speakerIndex = voices.findIndex((v) => v.key === page.speaker)}
                {@const speaker = voices[speakerIndex]}
                <div style:margin-left={speakerIndex % 2 ? 'auto' : '0'}>
                    <ChapterPageDesktop
                            page={page}
                            speaker={speaker}
                            showFullName={chIdx === 0 && i < voices.length}
                    />
                </div>
            {/each}
        </div>
    {/each}
</div>