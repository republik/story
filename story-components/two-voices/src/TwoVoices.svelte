<script lang="ts">
  import type {InputData} from "./types.d.ts";
  import {css} from "@story/theme/css";
  import ChapterHeader from "./ChapterHeader.svelte";
  import ChapterPages from "./ChapterPages.svelte";

  interface Props {
    componentData?: InputData;
  }

  let {componentData}: Props = $props();
  let voices = $derived(componentData ? componentData.voices : []);
</script>

<div class={css({
    textStyle: "reading",
  })}
>
    {#if componentData}
        {#each componentData.chapters as chapter}
            <div>
                <ChapterHeader
                        title={chapter.title}
                        time={chapter.time}
                        coverUrl={chapter.coverUrl}
                />

                <ChapterPages pages={chapter.pages} voices={voices}/>
            </div>
        {/each}
    {/if}
</div>

