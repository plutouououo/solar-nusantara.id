#!/usr/bin/env node
/**
 * Scaffold one article directory with frontmatter that already passes the gate.
 *
 *   npm run new-article -- "Cara Memilih Inverter Hybrid untuk PLTS Rumah"
 *   npm run new-article -- "Judul Artikel" --slug cara-memilih-inverter-hybrid
 *
 * Why this exists: the article slug is the DIRECTORY NAME. Three live URLs
 * already carried an en dash or a " copy" suffix because somebody named a
 * folder by hand. At 1000 articles, hand-naming folders guarantees more of it.
 * This script derives the slug from the title, strips anything that is not
 * URL-safe, and refuses to overwrite an existing article.
 */
import { mkdirSync, writeFileSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT_DIR = 'src/content/berita';
const SLUG_MAX = 75;

const argv = process.argv.slice(2);
const title = argv.find((a) => !a.startsWith('--'));
if (!title) {
	console.error('usage: npm run new-article -- "Judul Artikel" [--slug custom-slug]');
	process.exit(1);
}
const slugFlagIndex = argv.indexOf('--slug');
const customSlug = slugFlagIndex !== -1 ? argv[slugFlagIndex + 1] : null;

/**
 * Title -> URL-safe slug.
 *
 * NFD + stripping combining marks folds accented characters to ASCII, and the
 * dash class covers the en dash, em dash and non-breaking hyphen that word
 * processors substitute for a plain "-" without anyone noticing.
 */
function slugify(input) {
	return input
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[‐-―−]/g, '-')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, SLUG_MAX)
		.replace(/-+$/g, '');
}

const slug = customSlug ? slugify(customSlug) : slugify(title);
if (!slug) {
	console.error(`Could not derive a slug from "${title}". Pass --slug explicitly.`);
	process.exit(1);
}

const dir = join(CONTENT_DIR, slug);
if (existsSync(dir)) {
	console.error(`${dir} already exists. Pick a different title or --slug.`);
	process.exit(1);
}

// Warn about an existing focus keyphrase collision before the file is written,
// because two articles chasing one query is the definition of cannibalisation.
const existingKeyphrases = new Set();
for (const d of readdirSync(CONTENT_DIR)) {
	try {
		const raw = readFileSync(join(CONTENT_DIR, d, 'index.md'), 'utf8');
		const m = raw.match(/^focusKeyphrase\s*:\s*["']?([^"'\n]+)/m);
		if (m) existingKeyphrases.add(m[1].trim().toLowerCase());
	} catch {
		/* not an article directory */
	}
}

const today = new Date().toISOString().slice(0, 10);

const frontmatter = `---
title: "${title.replace(/"/g, "'")}"
# seoTitle is what the SERP shows. Set it whenever the title above runs past
# 60 characters; the <h1> can and should stay longer and more descriptive.
# seoTitle: ""
description: ""
# One query this article targets, and no other article does. check-content.mjs
# fails the build on a duplicate.
# focusKeyphrase: ""
pubDate: "${today}"
# updatedDate: "${today}"
# author: ""
# authorUrl: ""
# Drop the hero image into this directory, then point at it here.
# heroImage: "./hero.jpg"
# Describe what the image SHOWS, not what the article is about.
# heroImageAlt: ""
tags: []
draft: true
---

## Pendahuluan

Tulis isi artikel di sini.

Aturan yang dijaga oleh \`npm run check\`:

- description wajib 70-160 karakter
- setiap gambar wajib punya alt yang deskriptif
- gunakan \`##\` ke bawah; \`#\` sudah dipakai layout untuk judul halaman
- tulis harga dolar dengan backslash di depannya (\\$100), bukan polos -
  remark-math membaca dua tanda dolar sebagai rumus dan menelan teks di antaranya
- focusKeyphrase harus unik terhadap seluruh artikel lain

Hapus \`draft: true\` ketika artikel siap terbit.
`;

mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'index.md'), frontmatter, 'utf8');

console.log(`\ncreated ${join(dir, 'index.md')}`);
console.log(`  url        /berita/${slug}/`);
console.log(`  slug       ${slug} (${slug.length} chars)`);
console.log(`  hero image drop it in as ${join(dir, 'hero.jpg')}`);
console.log(`\n  ${existingKeyphrases.size} focus keyphrases already taken; pick one that is not among them.`);
console.log(`  Run "npm run check" before committing.\n`);
