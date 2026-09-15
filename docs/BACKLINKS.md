# Backlinks: solar-nusantara.id

Audited 2026-09-15. Everything in section 1 was measured by fetching the pages,
not assumed. Sections 2 and 3 are a plan, and are labelled as such.

**No Ahrefs or Semrush data was available for this audit.** The site has no
Search Console property with history either (`sc-domain:solar-nusantara.id` was
added 2026-09-15 and is still unverified). So this covers the links that can be
verified from the open web plus the owned network. A real backlink profile needs
either GSC Links data after verification, or a paid tool.

---

## 1. Owned network: what is measurably wrong today

The cheapest links in existence are the ones from sites the company already
controls. Four were checked. Three have a defect.

| Site | Links to solar-nusantara.id | Problem |
|---|---|---|
| `sonushub.id` | 2, both to `/berita` | **No trailing slash.** GitHub Pages 301s `/berita` to `/berita/`, so both links pass through a redirect. |
| `sonus-epc.id` | **0 actual `<a>` links** | The string `solar-nusantara.id` appears on the page but not inside an anchor. Zero equity. |
| `indonesia-terang.id` | **0 actual `<a>` links** | Same: mentioned, not linked. |
| `sonus-hub.id` | 3, correct | `/berita/` and `/kontak/`, both with the trailing slash. Nothing to fix. |
| `gh.indonesia-terang.id` | 0 | No mention at all. Green Harvest is agriculture; a link is only worth adding if there is a real topical reason. |

### Fix order

1. **`sonus-epc.id` and `indonesia-terang.id`: turn the mention into a link.**
   Two sites in the same group, both about energy, neither passing anything.
   This is the single highest-value change in this document and it costs two
   lines of HTML.
2. **`sonushub.id`: add the trailing slash.** `https://solar-nusantara.id/berita/`.
   A 301 is followed and mostly credited, but a direct link is strictly better
   and the fix is one character.
3. Use **descriptive anchor text**, not "klik di sini" or a bare URL. "Berita
   dan panduan teknis energi surya" tells Google what the target is about.

### Brand collision, flagged not fixed

`sonushub.id` and `sonus-hub.id` are **two different live sites both branded
SonusHUB**, with different titles:

- `sonushub.id` - "SonusHUB - B2B & B2G Energy Marketplace"
- `sonus-hub.id` - "SonusHUB | B2B Material Kelistrikan & Energi Terbarukan"

Two domains competing for one brand name split the brand's search signal and
give Google two candidate entities for one company. One of them should
301-redirect to the other. Which one survives is a business decision, not a
technical one, so nothing was changed.

`/tentang/tentang-website/` on this site lists both as separate products, which
is what made the collision visible.

---

## 2. Link targets worth pursuing (plan)

Ranked by realistic probability, not by domain authority. An Indonesian solar
EPC company competes for Indonesian queries; a link from an Indonesian energy
body is worth more here than a generic international directory.

### Tier 1 - industry bodies and associations

These are the highest-value and the most reachable, because membership is a
normal business activity rather than a link-building campaign.

- **AESI** (Asosiasi Energi Surya Indonesia) - member directory listing
- **METI** (Masyarakat Energi Terbarukan Indonesia) - member listing
- **IESR** (Institute for Essential Services Reform) - already cited *from* this
  site in an article; a relationship exists to build on
- **APAMSI** / regional solar installer associations
- **Kadin** regional chapter directory

The ask is a company profile page with a link, which is what these directories
exist to provide.

### Tier 2 - supplier and partner pages

Every manufacturer whose panels and inverters the company resells usually
maintains a "authorized distributor" or "partner" page. The company already has
supplier relationships (see `/tentang/kolaborasi/mitra-suplier/`). Ask each to
list the company with a link.

This is the most underused source for a distributor business, and the
conversation is easy because the supplier benefits from it too.

### Tier 3 - project and tender records

EPC work generates public records: LKPP / LPSE tender awards, government
project announcements, and client press releases. These are frequently linked
and rarely claimed. Any completed PLTS project worth a case study is also worth
a link request to the client's own site.

### Tier 4 - technical content that earns links

The existing articles are already strong enough for this: the NREL efficiency
article, the full-sun-hours sizing calculation, and the Indonesian insolation
data piece are reference material, not marketing copy.

What makes them linkable is **original Indonesian data**. Nobody links to
another explanation of how a solar cell works. People do link to:

- Insolation figures per Indonesian province, with the source and the year
- Real installed cost per Wp in Indonesia, tracked over time
- A TKDN comparison table across available panels (the site already has TKDN
  43.50% data on `/produk/.../panel-tkdn/`)
- PLN net-metering rules explained with current tariffs

One genuinely cited data page outperforms fifty explainers.

### Tier 5 - academic and vocational

The stakeholder articles already describe the research and training layer of
the PV sector. Universities and SMK with renewable-energy programmes link to
industry partners for internships and guest lectures.

---

## 3. What not to do

- **No paid link networks, PBNs, or "jasa backlink" packages.** These are the
  dominant offer in the Indonesian SEO market and they are the exact pattern
  Google's link spam systems neutralise. At best the links are ignored; the
  money is gone either way.
- **No reciprocal link pages.** "Tukar link" blocks were downweighted long ago.
- **No mass directory submissions.** A listing in a real industry association is
  worth having. A listing in a generic 10,000-entry link directory is not.
- **Do not disavow anything without data.** The disavow file is for a manual
  action or a known negative-SEO attack. Without GSC Links data there is nothing
  to judge, and a careless disavow removes links that were helping.

---

## 4. Prerequisites that are now done

Links only count if the page they point at is crawlable and canonical. Before
this audit:

- 387 internal links across the site pointed at three URLs that returned 404
  (`/tentang`, `/produk`, `/tentang/tentang-website`), so PageRank flowing into
  the site hit dead ends on every page
- `/berita/1/` duplicated `/berita/`, splitting any signal to the listing
- 50 of 70 pages shared one meta description
- Three article URLs carried an en dash or a " copy" suffix
- No article had any Article structured data at all

All fixed. `npm run audit` reports the current state; it went from 586 findings
to 1.

---

## 5. Measurement

Nothing here is measurable until Search Console is verified.

1. Verify `sc-domain:solar-nusantara.id` with the DNS TXT record Google issues
   (Cloudflare hosts the DNS for this domain).
2. Submit `https://solar-nusantara.id/sitemap-index.xml`.
3. After 4-6 weeks there will be Links data: top linking sites, top linked
   pages, and top anchor text. That is the first real backlink baseline.

Until then, any claim about this site's backlink profile is a guess.
