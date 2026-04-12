import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';

export function remarkTocMarker() {
  return (tree) => {
    const slugger = new GithubSlugger();
    const headings = [];

    visit(tree, 'heading', (node) => {
      const text = collectText(node);
      headings.push({
        depth: node.depth,
        text,
        slug: slugger.slug(text),
      });
    });

    if (headings.length === 0) return;

    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || index === undefined) return;
      if (!isTocMarker(node)) return;

      parent.children[index] = {
        type: 'html',
        value: buildTocHtml(headings),
      };
    });
  };
}

function isTocMarker(node) {
  if (node.children.length !== 1) return false;
  const child = node.children[0];

  if (child.type === 'linkReference' && child.identifier === 'toc') return true;
  if (child.type === 'text' && child.value.trim() === '[TOC]') return true;

  return false;
}

function collectText(node) {
  let result = '';
  visit(node, 'text', (t) => { result += t.value; });
  return result;
}

function buildTocHtml(headings) {
  const items = headings
    .map((h) => `<li class="toc-depth-${h.depth}"><a href="#${escapeAttr(h.slug)}">${escapeHtml(h.text)}</a></li>`)
    .join('\n');

  return `<nav class="md-toc inline-toc">\n<ul class="toc-list">\n${items}\n</ul>\n</nav>`;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
