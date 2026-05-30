# Web ŠERM Havlíčkův Brod

Webové stránky šermířského oddílu **ŠERM Havlíčkův Brod**. Postaveno na
[Astro](https://astro.build) (rychlý statický web) + administrace
[Decap CMS](https://decapcms.org), aby mohl trenér přidávat **aktuality,
fotky, výsledky a dokumenty bez programování**.

Hosting zdarma na [Netlify](https://netlify.com).

> **Tato složka je samostatný projekt.** Je připravená k přesunu do
> vlastního repozitáře – stačí zkopírovat celý obsah složky `web/` do
> kořene nového repozitáře (web očekává, že je v kořeni repozitáře, viz
> `netlify.toml` a `public/admin/config.yml`).

---

## Co web umí

- **Úvod** s nejnovějšími aktualitami a výzvou k náboru
- **O klubu**, **Tréninky** (rozpis), **Nábor**, **Kontakt** (s mapou) – editovatelné texty
- **Trenéři** – profily trenérů
- **Aktuality** – novinky/příspěvky (vč. RSS kanálu)
- **Výsledky a závody** – záznamy z turnajů
- **Fotogalerie** – alba s fotkami
- **Dokumenty a příspěvky** – soubory ke stažení + členské příspěvky
- **/admin** – administrace pro trenéra (přihlášení e-mailem a heslem)
- Responzivní design (mobil i počítač), SEO, sitemap, OpenGraph náhledy

---

## Struktura

```
web/
├─ public/
│  ├─ admin/            # administrace (Decap CMS) – index.html + config.yml
│  ├─ images/           # logo.svg, logo-white.svg (vektorové logo)
│  ├─ uploads/          # sem CMS ukládá nahrané fotky a dokumenty
│  └─ favicon.svg
├─ src/
│  ├─ content/          # OBSAH webu (markdown) – upravuje se přes /admin
│  │  ├─ aktuality/     # příspěvky
│  │  ├─ vysledky/      # výsledky závodů
│  │  ├─ galerie/       # fotoalba
│  │  ├─ treneri/       # trenéři
│  │  ├─ dokumenty/     # dokumenty ke stažení
│  │  └─ stranky/       # texty stránek (O klubu, Tréninky, Nábor, Kontakt, Příspěvky)
│  ├─ components/       # Header, Footer, NewsCard …
│  ├─ layouts/Base.astro
│  └─ pages/            # jednotlivé stránky webu
├─ astro.config.mjs
├─ netlify.toml         # konfigurace nasazení na Netlify
└─ package.json
```

---

## Spuštění lokálně (pro vývojáře)

Potřebujete [Node.js](https://nodejs.org) verze 20+.

```bash
cd web        # (nebo kořen repozitáře, pokud jste složku přesunuli)
npm install
npm run dev      # vývojový server na http://localhost:4321
npm run build    # produkční build do složky dist/
npm run preview  # náhled produkčního buildu
```

---

## Nasazení na Netlify (jednorázové nastavení)

1. **Nahrajte projekt na GitHub** (ideálně jako samostatný repozitář –
   obsah složky `web/` v kořeni).
2. Na [netlify.com](https://app.netlify.com) → **Add new site → Import an existing project** → vyberte GitHub repozitář.
3. Netlify načte nastavení z `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Po prvním nasazení nastavte vlastní adresu přes proměnnou prostředí
   `SITE_URL` v Netlify (nebo v `astro.config.mjs`).

### Zapnutí administrace (aby mohl trenér přidávat obsah)

Administrace na `/admin` používá **Netlify Identity + Git Gateway**:

1. V Netlify: **Site configuration → Identity → Enable Identity**.
2. **Identity → Registration**: nastavte na **Invite only**.
3. **Identity → Services → Git Gateway → Enable Git Gateway**.
4. **Identity → Invite users** → pozvěte e-mail trenéra. Trenér si nastaví
   heslo a přihlásí se na `https://vase-adresa/admin/`.
5. V `public/admin/config.yml` musí `backend.branch` odpovídat větvi,
   ze které Netlify publikuje (obvykle `main`).

Po uložení změny v administraci se obsah uloží do GitHubu a Netlify web
během chvíle znovu sestaví a zveřejní.

---

## Jak trenér přidává obsah (bez programování)

1. Otevře `https://vase-adresa/admin/` a přihlásí se e-mailem a heslem.
2. Vybere sekci (Aktuality, Fotogalerie, Výsledky, Dokumenty, Trenéři,
   nebo Stránky) a klikne na **New / Nový** nebo upraví existující.
3. Vyplní text, nahraje fotky/soubory a klikne **Publish / Publikovat**.
4. Hotovo – změna se za chvíli objeví na webu.

---

## Logo

Logo bylo z fotografie nášivky překresleno do **vektorové podoby (SVG)**,
takže je ostré v jakékoli velikosti:

- `public/images/logo.svg` – tmavá varianta (na světlém pozadí)
- `public/images/logo-white.svg` – bílá varianta (do patičky)
- `public/favicon.svg` – ikona webu

Jde o čistou rekonstrukci motivu šermíře s fleretem a nápisu
„ŠERM HAVLÍČKŮV BROD". Pokud máte originální vektorové logo (od grafika),
stačí těmito soubory nahradit.

---

## Co je potřeba ještě doplnit (reálné údaje)

Ukázkové texty obsahují placeholdery `(doplňte …)`. Před spuštěním
doplňte (ideálně přes `/admin`):

- adresu tělocvičny, e-mail a telefon (sekce **Kontakt**, patička),
- skutečný rozpis tréninků (**Tréninky**),
- výši a údaje o **členských příspěvcích**,
- profily **trenérů**,
- odkazy na **Facebook/Instagram** (v `src/components/Footer.astro`),
- konkrétní umístění z MČR Praha U11 (sekce **Výsledky** / **Aktuality**).
