<template>
  <div ref="contentRef" class="markdown-content"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const contentRef = ref(null);

function renderMarkdown() {
  if (!contentRef.value || !props.content) return;

  // Convert markdown to HTML
  const htmlContent = marked(props.content);

  // Sanitize the HTML content with iframe support
  const sanitizedContent = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'strong', 'em', 'br', 'iframe'],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 
      'src', 'width', 'height', 'frameborder', 'allowfullscreen', 'allow',
      'title', 'referrerpolicy'
    ],
  });

  contentRef.value.innerHTML = sanitizedContent;
}

watch(() => props.content, renderMarkdown);
onMounted(renderMarkdown);
</script>

<style lang="scss" scoped>
.markdown-content {
  line-height: 1.6;
  color: #333;

  :deep(p) {
    margin: 0 0 1em;
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-weight: 600;
  }

  :deep(ul),
  :deep(ol) {
    margin: 1em 0;
    padding-left: 1.5em;
  }

  :deep(li) {
    margin: 0.5em 0;
  }

  :deep(a) {
    color: #1976d2;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  :deep(blockquote) {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid #ddd;
    color: #666;
  }

  :deep(code) {
    background: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
  }

  :deep(iframe) {
    max-width: 100%;
    height: auto;
    aspect-ratio: 16/9;
    border-radius: 8px;
    margin: 1rem 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: block;
  }
}
</style>
