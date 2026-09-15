# drafts/

Work in progress that is not part of the site.

Nothing here is read by Astro. Files in this folder used to live under
`src/content/draft/`, where Astro auto-generated an undeclared `draft`
collection from them and printed a deprecation warning on every build.

To hold back a real article instead, leave it in `src/content/berita/` and set
`draft: true` in its frontmatter. `getPublishedArticles()` filters those out, so
they stay off the listings, the sitemap, the footer and the search index while
still being type-checked against the collection schema.
