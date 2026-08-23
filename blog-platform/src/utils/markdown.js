const escapeHtml = (text) => {
  const map = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

const parseInline = (text) => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
};

export function parseMarkdown(markdown) {
  if (!markdown) return '';
  
  const lines = markdown.split('\n');
  const htmlLines = [];
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBuffer = [];
  let inList = false;
  let listType = 'ul';
  let listBuffer = [];

  const flushCodeBlock = () => {
    if (codeBuffer.length > 0) {
      const code = escapeHtml(codeBuffer.join('\n'));
      htmlLines.push(`<pre><code class="language-${codeBlockLanguage}">${code}</code></pre>`);
      codeBuffer = [];
      inCodeBlock = false;
      codeBlockLanguage = '';
    }
  };

  const flushList = () => {
    if (listBuffer.length > 0) {
      const tag = listType === 'ol' ? 'ol' : 'ul';
      htmlLines.push(`<${tag}>${listBuffer.join('')}</${tag}>`);
      listBuffer = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        flushList();
        inCodeBlock = true;
        codeBlockLanguage = trimmed.slice(3).trim() || 'text';
      } else {
        flushCodeBlock();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (trimmed.startsWith('#')) {
      flushList();
      flushCodeBlock();
      const level = trimmed.match(/^#+/)[0].length;
      const content = parseInline(trimmed.slice(level).trim());
      htmlLines.push(`<h${level}>${content}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith('>')) {
      flushList();
      flushCodeBlock();
      const content = parseInline(trimmed.slice(1).trim());
      htmlLines.push(`<blockquote>${content}</blockquote>`);
      continue;
    }

    if (trimmed.match(/^[-*+]\s/)) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      const content = parseInline(trimmed.slice(2).trim());
      listBuffer.push(`<li>${content}</li>`);
      continue;
    }

    if (trimmed.match(/^\d+\.\s/)) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      const content = parseInline(trimmed.replace(/^\d+\.\s/, ''));
      listBuffer.push(`<li>${content}</li>`);
      continue;
    }

    if (trimmed === '---' || trimmed === '***') {
      flushList();
      flushCodeBlock();
      htmlLines.push('<hr>');
      continue;
    }

    if (trimmed === '') {
      flushList();
      if (htmlLines.length > 0 && !htmlLines[htmlLines.length - 1].startsWith('<p>')) {
        htmlLines.push('<p></p>');
      }
      continue;
    }

    flushList();
    const content = parseInline(line);
    if (!content.startsWith('<') || content.startsWith('<p>') || content.startsWith('<h') || content.startsWith('<blockquote') || content.startsWith('<pre') || content.startsWith('<hr') || content.startsWith('<ul') || content.startsWith('<ol')) {
      htmlLines.push(`<p>${content}</p>`);
    } else {
      htmlLines.push(content);
    }
  }

  flushCodeBlock();
  flushList();

  return htmlLines.join('\n');
}

export function extractExcerpt(markdown, maxLength = 160) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~`]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  
  return text.length > maxLength ? text.slice(0, maxLength).trim() + '...' : text;
}

export function extractHeadings(markdown) {
  const headings = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        id: slugify(match[2]),
      });
    }
  }
  
  return headings;
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}