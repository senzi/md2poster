<template>
  <div class="theme-panel-container">
    <div class="theme-selector">
      <h3>主题选择</h3>
      <select v-model="currentTheme">
        <option v-for="theme in themes" :key="theme.id" :value="theme.id">
          {{ theme.name }}
        </option>
      </select>
    </div>

    <div class="theme-controls">
      <div class="control-group">
        <h4>字体设置</h4>
        <div class="control-item">
          <label>标题字体</label>
          <select v-model="themeConfig.titleFont">
            <option value="思源黑体">思源黑体</option>
            <option value="思源宋体">思源宋体</option>
            <option value="霞鹜文楷">霞鹜文楷</option>
          </select>
        </div>
        <div class="control-item">
          <label>正文字体</label>
          <select v-model="themeConfig.bodyFont">
            <option value="思源黑体">思源黑体</option>
            <option value="思源宋体">思源宋体</option>
            <option value="霞鹜文楷">霞鹜文楷</option>
          </select>
        </div>
      </div>

      <div class="control-group">
        <h4>颜色设置</h4>
        <div class="control-item">
          <label>主题色</label>
          <input type="color" v-model="themeConfig.primaryColor">
        </div>
        <div class="control-item">
          <label>背景色</label>
          <input type="color" v-model="themeConfig.backgroundColor">
        </div>
        <div class="control-item">
          <label>文字颜色</label>
          <input type="color" v-model="themeConfig.textColor">
        </div>
      </div>

      <div class="control-group">
        <h4>间距设置</h4>
        <div class="control-item">
          <label>段落间距</label>
          <input type="range" v-model="themeConfig.paragraphSpacing" min="0" max="40" step="4">
          <span>{{ themeConfig.paragraphSpacing }}px</span>
        </div>
        <div class="control-item">
          <label>行高</label>
          <input type="range" v-model="themeConfig.lineHeight" min="1" max="2" step="0.1">
          <span>{{ themeConfig.lineHeight }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store'

const { themeConfig } = useStore()

const themes = [
  { id: 'default', name: '默认主题' },
  { id: 'elegant', name: '优雅主题' },
  { id: 'modern', name: '现代主题' },
]

const currentTheme = ref('default')

// 监听主题变化
const onThemeChange = () => {
  // 这里添加主题切换的处理逻辑
  console.log('theme changed:', currentTheme.value)
}
</script>

<style scoped>
.theme-panel-container {
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  background: #f9f9f9;
}

.theme-selector {
  margin-bottom: 20px;
}

.theme-selector h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.theme-selector select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.control-group {
  margin-bottom: 20px;
}

.control-group h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
}

.control-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.control-item label {
  width: 80px;
  font-size: 14px;
  color: #333;
}

.control-item select,
.control-item input[type="color"] {
  flex: 1;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.control-item input[type="range"] {
  flex: 1;
  margin-right: 8px;
}

.control-item span {
  width: 40px;
  font-size: 12px;
  color: #666;
  text-align: right;
}
</style>
