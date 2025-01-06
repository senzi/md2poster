import { ref, reactive } from 'vue'

export interface ThemeConfig {
  titleFont: string
  bodyFont: string
  primaryColor: string
  backgroundColor: string
  textColor: string
  paragraphSpacing: number
  lineHeight: number
}

const markdown = ref(`# 欢迎使用 Markdown to Poster

这是一个示例文档，您可以在这里编辑Markdown内容。

## 支持的功能

- 标准Markdown语法
- 实时预览
- 主题定制
- 导出为海报

> 开始编辑吧！`)

const themeConfig = reactive<ThemeConfig>({
  titleFont: '思源黑体',
  bodyFont: '思源黑体',
  primaryColor: '#007AFF',
  backgroundColor: '#FFFFFF',
  textColor: '#333333',
  paragraphSpacing: 16,
  lineHeight: 1.5,
})

export const useStore = () => {
  const updateMarkdown = (content: string) => {
    markdown.value = content
  }

  const updateTheme = (config: Partial<ThemeConfig>) => {
    Object.assign(themeConfig, config)
  }

  return {
    markdown,
    themeConfig,
    updateMarkdown,
    updateTheme,
  }
}
