<template>
  <div class="poster-preview-container">
    <div class="poster-preview-toolbar">
      <div class="zoom-controls">
        <button @click="zoomOut" :disabled="scale <= 0.25">-</button>
        <span>{{ Math.round(scale * 100) }}%</span>
        <button @click="zoomIn" :disabled="scale >= 2">+</button>
      </div>
      <select v-model="posterWidth">
        <option value="640">窄屏 (640px)</option>
        <option value="800">标准 (800px)</option>
        <option value="1080">宽屏 (1080px)</option>
      </select>
    </div>
    
    <div class="poster-preview-content" :style="previewStyle">
      <div class="poster" :style="posterStyle">
        <div class="poster-content" v-html="renderedContent" :style="contentStyle"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { useStore } from '../store'

const { markdown, themeConfig } = useStore()

const scale = ref(1)
const posterWidth = ref('800')

const zoomIn = () => {
  scale.value = Math.min(2, scale.value + 0.25)
}

const zoomOut = () => {
  scale.value = Math.max(0.25, scale.value - 0.25)
}

const posterStyle = computed(() => ({
  width: `${posterWidth.value}px`,
  minHeight: '200px',
  backgroundColor: themeConfig.backgroundColor,
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative' as const,
  transform: `scale(${scale.value})`,
  transformOrigin: 'top center',
  transition: 'all 0.3s ease'
}))

const contentStyle = computed(() => ({
  '--primary-color': themeConfig.primaryColor,
  '--text-color': themeConfig.textColor,
  '--title-font': themeConfig.titleFont,
  '--body-font': themeConfig.bodyFont,
  '--paragraph-spacing': `${themeConfig.paragraphSpacing}px`,
  '--line-height': themeConfig.lineHeight
}))

const previewStyle = computed(() => ({
  padding: '40px',
  minHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start'
}))

const renderedContent = computed(() => marked(markdown.value))
</script>

<style scoped>
.poster-preview-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.poster-preview-toolbar {
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.zoom-controls button {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  padding: 0;
}

.zoom-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.zoom-controls span {
  min-width: 60px;
  text-align: center;
}

.poster-preview-toolbar select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.poster-preview-content {
  flex: 1;
  overflow: auto;
  background: repeating-conic-gradient(#f5f5f5 0% 25%, #ffffff 0% 50%) 
              50% / 20px 20px;
}

.poster {
  margin: 0 auto;
  background: var(--background-color);
}

.poster-content {
  padding: 40px;
  color: var(--text-color);
}

:deep(.poster-content h1),
:deep(.poster-content h2),
:deep(.poster-content h3),
:deep(.poster-content h4),
:deep(.poster-content h5),
:deep(.poster-content h6) {
  font-family: var(--title-font);
  color: var(--text-color);
  margin-bottom: var(--paragraph-spacing);
  line-height: var(--line-height);
}

:deep(.poster-content h1) {
  font-size: 2.5em;
  color: var(--primary-color);
  margin-top: 0;
}

:deep(.poster-content h2) {
  font-size: 2em;
}

:deep(.poster-content h3) {
  font-size: 1.75em;
}

:deep(.poster-content p) {
  font-family: var(--body-font);
  margin-bottom: var(--paragraph-spacing);
  line-height: var(--line-height);
}

:deep(.poster-content ul),
:deep(.poster-content ol) {
  margin-bottom: var(--paragraph-spacing);
  padding-left: 2em;
}

:deep(.poster-content li) {
  font-family: var(--body-font);
  margin-bottom: calc(var(--paragraph-spacing) * 0.5);
  line-height: var(--line-height);
}

:deep(.poster-content blockquote) {
  margin: var(--paragraph-spacing) 0;
  padding: 1em;
  border-left: 4px solid var(--primary-color);
  background: rgba(0, 0, 0, 0.05);
}

:deep(.poster-content blockquote p) {
  margin: 0;
  font-style: italic;
}

:deep(.poster-content *:last-child) {
  margin-bottom: 0;
}
</style>
