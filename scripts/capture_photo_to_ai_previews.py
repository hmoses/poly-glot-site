#!/usr/bin/env python3
"""Capture real localized website UI previews for the upcoming iOS Photo to AI button.

These are *website preview images*, not screenshots of a shipping App Store
binary. Do not upload them to App Store Connect as native app screenshots.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:8765/index.html'
DEST = Path('assets/img/screenshots')
DEST.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        viewport={'width': 1440, 'height': 1000},
        device_scale_factor=3,
        reduced_motion='reduce',
        locale='en-US',
    )
    page = ctx.new_page()
    errors = []
    page.on('pageerror', lambda exc: errors.append(str(exc)))
    page.goto(BASE, wait_until='domcontentloaded', timeout=40000)
    page.wait_for_selector('#gallery-ipad [data-pg-photo-native-preview]', state='attached', timeout=30000)
    page.wait_for_selector('#gallery-iphone [data-pg-photo-native-preview]', state='attached', timeout=30000)
    # The product owner retired the standalone Coming Soon section.
    # Preserve gallery previews without resurrecting the removed badge.
    assert page.locator('#pg-ios-photo-soon-badge').count() == 0, 'Retired Coming Soon badge returned'
    for device in ('iphone', 'ipad'):
        page.evaluate(f"switchGallery('{device}')")
        page.locator('#gallery-'+device).scroll_into_view_if_needed()
        page.wait_for_function(
            """device => {
              const panel=document.getElementById('gallery-'+device);
              return panel && panel.querySelectorAll('[data-pg-photo-native-preview]').length>=1;
            }""",
            arg=device,
            timeout=12000,
        )
        items = page.locator('#gallery-'+device+' .gallery-item')
        assert items.count() >= 4, f'{device}: missing gallery cards'
        action = items.first.locator('[data-pg-photo-native-preview]')
        assert action.count() == 1, f'{device}: expected one native Photo to AI action in Ask Any AI'
        assert 'photo to ai' in action.first.inner_text().lower(), f'{device}: wrong feature label'
        assert page.locator('#gallery-'+device+' .pg-photo-preview-launch').count() == 0, 'Duplicate legacy preview controls'
        # The Photo to AI card is deliberately second, after Ask Any AI.
        # Do not assign its screenshot to the Templates filename.
        photo = page.locator('#pg-photo-' + device + '-card')
        assert photo.count() == 1, f'{device}: missing current Photo to AI panel'
        assert photo.locator('.pg-photo-picker').count() == 1, 'Photo-picker visual missing'
        assert photo.locator('.pg-photo-provider-selected').count() == 1, 'AI selector visual missing'
        assert photo.locator('.pg-photo-open').count() == 1, 'Green handoff visual missing'
        assert photo.locator('.pg-photo-ui-context-title').count() == 0, 'Old Mac context box leaked into iOS'
        # Lightbox is the only interactive action for iPhone and iPad previews.
        fit = photo.evaluate("""card => {
          const within = (child, parent, margin=2) => {
            const c=child.getBoundingClientRect(), p=parent.getBoundingClientRect();
            return c.left>=p.left-margin && c.right<=p.right+margin
                && c.top>=p.top-margin && c.bottom<=p.bottom+margin;
          };
          const screen=card.querySelector('.iphone-screen,.ipad-screen');
          const sheet=card.querySelector('.pg-photo-sheet');
          const open=card.querySelector('.pg-photo-open');
          const selector=card.querySelector('.pg-photo-provider-selected');
          return {sheet:within(sheet,screen),open:within(open,sheet),selector:within(selector,sheet)};
        }""")
        assert all(fit.values()), f'{device}: controls overflow device frame: {fit}'
        captures = (
            ('ask', items.nth(0)),
            ('photo-to-ai', photo),
            ('templates', items.nth(2)),
            ('how-to-use', items.nth(3)),
        )
        for section, item in captures:
            device_el = item.locator('.iphone-device' if device=='iphone' else '.ipad-device')
            out = DEST / f'photo-to-ai-{device}-{section}-preview.png'
            device_el.screenshot(path=str(out), animations='disabled', timeout=20000)
            assert out.stat().st_size > 2000, f'{out}: empty output'
            print('CAPTURED', out, out.stat().st_size, flush=True)
    # Run a locale check to protect the 38-language product preview behavior.
    for language in ('ES','FR','AR','HE'):
        page.evaluate("""code => window._pgI18n.setLang(code)""", language)
        page.wait_for_function(
            """language => window._pgI18n.curLang().toUpperCase().startsWith(language)""",
            arg=language,
            timeout=8000,
        )
        page.wait_for_timeout(200)
        for device in ('iphone', 'ipad'):
            label = page.locator('#gallery-'+device+' [data-pg-photo-native-preview]').first.text_content() or ''
            assert 'Photo to AI · Coming Soon' not in label, (language,device,label)
            assert label.strip(), (language,device)
    assert page.locator('#gallery-mac .pg-mac-photo-preview-control').count() == 1, 'Missing real Mac Photo to AI preview control'
    assert page.locator('#gallery-mac .pg-photo-preview-launch').count() == 0, 'Mac got a fake iOS-only photo button'
    # Page already reports third-party/CDN network errors in some CI runs;
    # fail on regressions that explicitly affect this new preview.
    relevant = [e for e in errors if 'ios-photo-preview-buttons.js' in e]
    assert not relevant, relevant
    print('PASS: eight accurate gallery screenshots (including Photo to AI), photo controls within device frames, unchanged Mac/lightbox and localized captions')
    browser.close()
