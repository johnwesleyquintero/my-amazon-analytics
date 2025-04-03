
/**
 * MDX Utilities
 * Helper functions for processing and rendering MDX content
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';

/**
 * Convert Markdown to HTML
 * @param markdown Markdown content
 * @returns HTML string
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkToc, { tight: true })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutoLinkHeadings)
    .use(rehypeStringify)
    .process(markdown);
  
  return result.toString();
}

/**
 * Extract and parse frontmatter from Markdown content
 * @param markdown Markdown content with frontmatter
 * @returns Object with frontmatter and content
 */
export function extractFrontmatter(markdown: string): {
  frontmatter: Record<string, any>;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: markdown };
  }
  
  const frontmatterStr = match[1];
  const content = markdown.replace(frontmatterRegex, '');
  
  // Parse frontmatter (simple key-value pairs)
  const frontmatter: Record<string, any> = {};
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      frontmatter[key.trim()] = value;
    }
  });
  
  return { frontmatter, content };
}

/**
 * Extract and parse a specific section from Markdown content
 * @param markdown Markdown content
 * @param sectionHeading Heading of the section to extract
 * @returns Section content as string
 */
export function extractSection(markdown: string, sectionHeading: string): string {
  const headingRegex = new RegExp(`## ${sectionHeading}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`, 'i');
  const match = markdown.match(headingRegex);
  
  if (!match) {
    return '';
  }
  
  return match[1].trim();
}

/**
 * Extract all headings from Markdown content
 * @param markdown Markdown content
 * @returns Array of heading objects with level and text
 */
export function extractHeadings(markdown: string): Array<{ level: number; text: string; slug: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; slug: string }> = [];
  
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ level, text, slug });
  }
  
  return headings;
}

/**
 * Generate a table of contents from Markdown content
 * @param markdown Markdown content
 * @returns Table of contents as HTML
 */
export function generateTOC(markdown: string): string {
  const headings = extractHeadings(markdown);
  
  if (headings.length === 0) {
    return '';
  }
  
  let toc = '<ul>';
  let previousLevel = 0;
  
  headings.forEach(({ level, text, slug }) => {
    if (level > previousLevel) {
      toc += '<ul>'.repeat(level - previousLevel);
    } else if (level < previousLevel) {
      toc += '</ul>'.repeat(previousLevel - level);
    }
    
    toc += `<li><a href="#${slug}">${text}</a></li>`;
    previousLevel = level;
  });
  
  toc += '</ul>'.repeat(previousLevel);
  toc += '</ul>';
  
  return toc;
}

/**
 * Syntax highlight code blocks in HTML content
 * @param html HTML content with code blocks
 * @returns HTML with highlighted code blocks
 */
export function highlightCodeBlocks(html: string): string {
  // This is a placeholder - in a real implementation,
  // you would integrate with a syntax highlighting library
  return html.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, language, code) => {
      return `<pre class="language-${language}"><code class="language-${language}">${code}</code></pre>`;
    }
  );
}
