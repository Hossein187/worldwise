# Graph Report - WorlldWise  (2026-06-29)

## Corpus Check
- 39 files · ~31,778 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 160 nodes · 213 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `542ef6e9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Pages and App|Pages and App]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Package Config|Package Config]]
- [[_COMMUNITY_Navigation Layout|Navigation Layout]]
- [[_COMMUNITY_Build Scripts|Build Scripts]]
- [[_COMMUNITY_City List Components|City List Components]]
- [[_COMMUNITY_City Detail|City Detail]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Kilo Config|Kilo Config]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]

## God Nodes (most connected - your core abstractions)
1. `useCities()` - 12 edges
2. `scripts` - 10 edges
3. `🌍 WorldWise` - 8 edges
4. `compilerOptions` - 8 edges
5. `🚀 Getting Started` - 5 edges
6. `Map()` - 5 edges
7. `PageNav()` - 5 edges
8. `useAuth()` - 4 edges
9. `CityItem()` - 4 edges
10. `Form()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Map()` --calls--> `useUrlPosition()`  [INFERRED]
  src/components/Map.jsx → src/hooks/useUrlPosition.js
- `Form()` --calls--> `useCities()`  [INFERRED]
  src/components/Form.jsx → src/context/CitiesContext.jsx
- `Map()` --calls--> `useCities()`  [EXTRACTED]
  src/components/Map.jsx → src/context/CitiesContext.jsx
- `City()` --calls--> `useCities()`  [EXTRACTED]
  src/components/City.jsx → src/context/CitiesContext.jsx
- `User()` --calls--> `useAuth()`  [INFERRED]
  src/components/User.jsx → src/context/FakeAuthContext.jsx

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "Pages and App"
Cohesion: 0.11
Nodes (18): PageNav(), User(), useAuth(), Homepage(), Login(), PageNotFound(), Pricing(), Product() (+10 more)

### Community 1 - "Dev Dependencies"
Cohesion: 0.12
Nodes (16): devDependencies, babel-plugin-react-compiler, cross-env, eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+8 more)

### Community 2 - "Package Config"
Cohesion: 0.11
Nodes (17): author, dependencies, json-server, leaflet, react, react-datepicker, react-dom, react-leaflet (+9 more)

### Community 3 - "Navigation Layout"
Cohesion: 0.29
Nodes (5): AppNav(), Footer(), Logo(), Sidebar(), AppLayout()

### Community 4 - "Build Scripts"
Cohesion: 0.20
Nodes (10): scripts, build, dev, format, lint, preview, server, start (+2 more)

### Community 5 - "City List Components"
Cohesion: 0.20
Nodes (9): CityItem(), formatDate(), CityList(), CountriesList(), Spinner(), CitiesContext, CitiesProviders(), initialState (+1 more)

### Community 6 - "City Detail"
Cohesion: 0.39
Nodes (5): ButtonBack(), City(), formatDate(), convertToEmoji(), Form()

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (12): 🛠️ Built With, ✨ Features, 🚀 Getting Started, Installation, 📄 License, 🔗 Live Demo, Other scripts, Prerequisites (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, jsx, module, moduleResolution, paths, target (+3 more)

### Community 13 - "Community 13"
Cohesion: 0.27
Nodes (4): Button(), Map(), useGeolocation(), useUrlPosition()

### Community 14 - "Community 14"
Cohesion: 0.33
Nodes (4): AuthContext, AuthProviders(), FAKE_USER, initialState

## Knowledge Gaps
- **76 isolated node(s):** `✨ Features`, `🛠️ Built With`, `Prerequisites`, `Installation`, `Running locally` (+71 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies` to `Package Config`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `scripts` connect `Build Scripts` to `Package Config`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `✨ Features`, `🛠️ Built With`, `Prerequisites` to the rest of the system?**
  _76 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pages and App` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._