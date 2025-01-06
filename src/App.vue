<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import ThemePanel from './components/ThemePanel.vue'
import PosterPreview from './components/PosterPreview.vue'

const isDragging = ref(false)
const leftPanelWidth = ref(50)
const startX = ref(0)
const startWidth = ref(0)

const onMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  startX.value = e.clientX
  startWidth.value = leftPanelWidth.value
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  
  const dx = e.clientX - startX.value
  const containerWidth = document.querySelector('.main-content')?.clientWidth || 0
  const newWidth = (startWidth.value * containerWidth / 100 + dx) / containerWidth * 100
  
  leftPanelWidth.value = Math.max(20, Math.min(80, newWidth))
}

const onMouseUp = () => {
  isDragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <div class="app-container">
    <!-- AppBar -->
    <div class="app-bar">
      <div class="app-bar-left">
        <button class="app-bar-btn">新建</button>
        <button class="app-bar-btn">导入</button>
        <button class="app-bar-btn">导出</button>
        <button class="app-bar-btn">主题导出</button>
      </div>
      <div class="app-bar-title">Markdown to Poster</div>
      <div class="app-bar-right">
        <a href="https://github.com/your-repo" target="_blank" class="github-link">
          <i class="github-icon"></i>
          源码
        </a>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="left-panel" :style="{ width: leftPanelWidth + '%' }">
        <div class="markdown-editor">
          <MarkdownEditor />
        </div>
        <div class="theme-panel">
          <ThemePanel />
        </div>
      </div>
      <div class="resizer" @mousedown="onMouseDown"></div>
      <div class="right-panel">
        <PosterPreview />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-bar {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.app-bar-left {
  display: flex;
  gap: 8px;
}

.app-bar-title {
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
}

.app-bar-btn {
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

.app-bar-btn:hover {
  background: #f5f5f5;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
}

.left-panel {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  transition: width 0.1s ease;
}

.markdown-editor {
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.theme-panel {
  height: 50%;
}

.resizer {
  width: 4px;
  background: #f0f0f0;
  cursor: col-resize;
  position: relative;
  z-index: 1;
}

.resizer:hover,
.resizer:active {
  background: #007AFF;
}

.right-panel {
  flex: 1;
  background: repeating-conic-gradient(#f5f5f5 0% 25%, #ffffff 0% 50%) 
              50% / 20px 20px;
  overflow: auto;
}

.github-link {
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
