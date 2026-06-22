# Graph Report - WorlldWise  (2026-06-21)

## Corpus Check
- 39 files · ~31,428 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 128 nodes · 175 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1ee701f8`
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
- [[_COMMUNITY_User Component|User Component]]
- [[_COMMUNITY_Kilo Config|Kilo Config]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_Community 13|Community 13]]

## God Nodes (most connected - your core abstractions)
1. `useCities()` - 11 edges
2. `scripts` - 10 edges
3. `compilerOptions` - 8 edges
4. `Map()` - 5 edges
5. `PageNav()` - 5 edges
6. `Button()` - 4 edges
7. `City()` - 4 edges
8. `CityItem()` - 4 edges
9. `ButtonBack()` - 3 edges
10. `CityList()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Map()` --calls--> `useUrlPosition()`  [INFERRED]
  src/components/Map.jsx → src/hooks/useUrlPosition.js
- `Map()` --calls--> `useCities()`  [EXTRACTED]
  src/components/Map.jsx → src/context/CitiesContext.jsx
- `City()` --calls--> `useCities()`  [EXTRACTED]
  src/components/City.jsx → src/context/CitiesContext.jsx
- `Map()` --calls--> `useGeolocation()`  [EXTRACTED]
  src/components/Map.jsx → src/hooks/useGeolocation.js
- `CityItem()` --calls--> `useCities()`  [EXTRACTED]
  src/components/CityItem.jsx → src/context/CitiesContext.jsx

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "Pages and App"
Cohesion: 0.19
Nodes (10): Logo(), PageNav(), Homepage(), Login(), PageNotFound(), Pricing(), Product(), App() (+2 more)

### Community 1 - "Dev Dependencies"
Cohesion: 0.12
Nodes (16): devDependencies, babel-plugin-react-compiler, cross-env, eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+8 more)

### Community 2 - "Package Config"
Cohesion: 0.12
Nodes (16): author, dependencies, json-server, leaflet, react, react-dom, react-leaflet, react-router-dom (+8 more)

### Community 3 - "Navigation Layout"
Cohesion: 0.36
Nodes (4): AppNav(), Footer(), Sidebar(), AppLayout()

### Community 4 - "Build Scripts"
Cohesion: 0.20
Nodes (10): scripts, build, dev, format, lint, preview, server, start (+2 more)

### Community 5 - "City List Components"
Cohesion: 0.24
Nodes (8): CityItem(), formatDate(), CityList(), CountriesList(), Spinner(), CitiesContext, CitiesProviders(), useCities()

### Community 6 - "City Detail"
Cohesion: 0.36
Nodes (4): ButtonBack(), City(), formatDate(), Form()

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (11): compilerOptions, allowJs, checkJs, jsx, module, moduleResolution, paths, target (+3 more)

### Community 13 - "Community 13"
Cohesion: 0.27
Nodes (4): Button(), Map(), useGeolocation(), useUrlPosition()

## Knowledge Gaps
- **54 isolated node(s):** `target`, `module`, `moduleResolution`, `jsx`, `allowJs` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies` to `Package Config`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `scripts` connect `Build Scripts` to `Package Config`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `target`, `module`, `moduleResolution` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._