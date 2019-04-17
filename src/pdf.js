const fs = require('fs');
const toPdf = require('pdf-from-html');
const hljs = require('highlight.js');
const emoji = require('markdown-it-emoji');
const md = require('markdown-it')({
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${
                    hljs.highlight(lang, str, true).value
                }</code></pre>`;
                // eslint-disable-next-line no-empty
            } catch (__) { }
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
    linkify: true,
    typographer: true,
});

// use emoji plugin
md.use(emoji);
// set emoji rules
md.renderer.rules.emoji = (token, idx) => `<i class="em em-${token[idx].markup}"></i>`;


exports.generatePDF = (filePathInput) => {
    // read file
    const content = fs.readFileSync(filePathInput);
    // render it, from markdown to html
    const result = md.render(String(content));
    //
    toPdf.generatePDF(result);
};