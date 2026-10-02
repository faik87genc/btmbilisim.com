"""Export the static site's final data for the Next.js app.

The static site (_legacy-static-site/) is the design + content master. Its
build.py holds everything the Next.js app needs to render the same site:
the processed menu, the homepage copy, and every page AFTER its curated
overrides (Hakkımızda, KVKK, Pentest, ...). Instead of re-typing any of it,
this script runs build.py's data section (everything before the Jinja/HTML
writing part, so no file in _legacy-static-site/ is touched) and dumps:

  lib/data/nav.json            header menu (same transforms as build.py)
  lib/data/home.json           homepage sections + FAQ
  lib/data/llms.json           llms.txt + llms-full.txt text (scripts/llms.py)
  scripts/data/legacy-pages.json   every page, input for migrate-legacy-content.mjs

Usage:  npm run content:export   (this script + the fallback JSON refresh)
Re-run whenever the static site's content/menu/homepage copy changes.
"""
import json
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LEGACY = os.path.join(ROOT, "_legacy-static-site")
BUILD_PY = os.path.join(LEGACY, "scripts", "build.py")

src = open(BUILD_PY, encoding="utf-8").read()
data_part = src.split("# ---------- Jinja env ----------")[0]
home_part = src.split("# ---------- homepage ----------")[1].split("home_jsonld =")[0]

# jinja2 / markupsafe / PIL are only used by build.py's HTML-writing half;
# stub them when missing so this data-only export needs no extra installs.
import types
for _mod, _names in (("jinja2", ("Environment", "FileSystemLoader", "select_autoescape")),
                     ("markupsafe", ("Markup",)), ("PIL", ("Image",))):
    try:
        __import__(_mod)
    except ImportError:
        _stub = types.ModuleType(_mod)
        for _n in _names:
            setattr(_stub, _n, None)
        sys.modules[_mod] = _stub

os.chdir(LEGACY)  # build.py opens its content files relative to this dir
sys.path.insert(0, os.path.join(LEGACY, "scripts"))
ns = {"__file__": BUILD_PY, "__name__": "legacy_build"}
exec(compile(data_part, BUILD_PY, "exec"), ns)
exec(compile(home_part, BUILD_PY, "exec"), ns)


def write(rel, obj):
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"wrote {rel}")


write("lib/data/nav.json", ns["NAV"])
write("lib/data/home.json", {
    "pillars": ns["PILLARS"],
    "serviceGroups": ns["SERVICE_GROUPS"],
    "processSteps": ns["PROCESS_STEPS"],
    "isoBasics": ns["ISO_BASICS"],
    "isoRoles": ns["ISO_ROLES"],
    "metaTitle": ns["HOME_META_TITLE"],
    "metaDescription": ns["HOME_META_DESCRIPTION"],
    "testimonials": ns["TESTIMONIALS"],
    "trainings": ns["TRAININGS"],
    "faqs": ns["HOME_FAQ"],
    "ekaControls": ns["EKA_CONTROLS"],
    "platforms": ns["PLATFORMS"],
})

pages = []
for slug, pg in ns["PAGES_BY_SLUG"].items():
    if slug in ("home", "iletisim", "blog"):
        continue  # rendered by dedicated Next.js routes
    pages.append({
        "slug": slug,
        "isPost": pg["is_post"],
        "h1": pg["h1"],
        "metaTitle": pg["meta_title"],
        "metaDescription": pg["meta_description"],
        "excerpt": pg["excerpt"],
        "heroImg": pg["hero_img"],
        "tag": pg["tag"],
        "publishedIso": pg["published_iso"],
        "modifiedIso": pg["modified_iso"],
        "blocks": pg["blocks"],
    })
write("scripts/data/legacy-pages.json", pages)
write("lib/data/iso-service.json", ns["ISO_SERVICE"])
write("lib/data/quote-form.json", ns["QUOTE_FORM"])

# llms.txt / llms-full.txt: same builder the static site uses (scripts/llms.py
# next to build.py), served by app/llms.txt/route.ts and app/llms-full.txt/route.ts.
from llms import build_llms  # noqa: E402  (LEGACY/scripts is on sys.path)
_llms, _llms_full = build_llms(ns["SITE"], ns["PAGES_BY_SLUG"], ns["SERVICE_GROUPS"], ns["ISO_SERVICE"],
                               ns["EKA_CONTROLS"], ns["PLATFORMS"])
write("lib/data/llms.json", {"llms": _llms, "llmsFull": _llms_full})
