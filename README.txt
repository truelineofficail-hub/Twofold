TWOFOLD - a hub for four small private apps, fully offline
============================================================
What's inside
  index.html, manifest.json, sw.js, icons/    the Hub (the one thing you install)
  apps/truth-dare/index.html                  Truth × Dare (self-contained)
  apps/memory-jar/index.html                  Memory Jar (self-contained)
  apps/know-me/index.html                     How Well Do You Know Me? (self-contained)
  apps/notes/index.html                       Notes (self-contained)

How it works
  The Hub is the only thing you install and the only thing with an app icon.
  Tapping a tile on the Hub's home screen opens that app in the same window.
  Every app has a small grid icon in its top-left corner that returns to the Hub.
  Each app keeps its own data (IndexedDB / localStorage) on this device, completely
  separate from the others, exactly as before -- the Hub does not share data between them.

Deploy (GitHub Pages)
  1. Unzip and upload ALL files and folders to the root of a GitHub repo, keeping the
     exact folder structure (apps/truth-dare/, apps/memory-jar/, etc. and icons/).
  2. Settings -> Pages -> Deploy from a branch -> main -> / (root).
  3. Open https://YOUR-USERNAME.github.io/REPO-NAME/ once with internet.
     After that the Hub and all four apps work with no connection.
  Install: Android Chrome -> menu -> "Install app"; iPhone Safari -> Share -> "Add to Home Screen".
  Only the Hub needs to be installed -- the four apps open inside it.

Local test (service workers need http, not file://)
  python3 -m http.server 8000     then open http://localhost:8000

Updating: change VERSION at the top of sw.js so phones fetch the new files.
