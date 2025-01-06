<template>
  <div class="markdown-editor-container" ref="editorContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { EditorState, EditorStateConfig } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { useStore } from '../store'

const { markdown: markdownContent, updateMarkdown } = useStore()
const editorContainer = ref<HTMLElement | null>(null)
let view: EditorView | null = null

onMounted(() => {
  if (!editorContainer.value) return

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      updateMarkdown(update.state.doc.toString())
    }
  })

  const state = EditorState.create({
    doc: markdownContent.value,
    extensions: [
      keymap.of(defaultKeymap),
      markdown(),
      EditorView.lineWrapping,
      updateListener,
      EditorView.theme({
        "&": {
          height: "100%",
          fontSize: "14px"
        },
        ".cm-content": {
          fontFamily: "'Fira Code', monospace",
          padding: "10px"
        },
        ".cm-line": {
          padding: "0 4px",
          lineHeight: "1.6",
          fontFamily: "'Fira Code', monospace"
        }
      })
    ]
  })

  view = new EditorView({
    state,
    parent: editorContainer.value
  })
})

onUnmounted(() => {
  if (view) {
    view.destroy()
  }
})
</script>

<style scoped>
.markdown-editor-container {
  height: 100%;
  overflow: hidden;
}
</style>
