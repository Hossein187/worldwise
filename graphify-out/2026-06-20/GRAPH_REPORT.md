# Graph Report - WorlldWise  (2026-06-15)

## Corpus Check
- 34 files · ~29,924 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 100 nodes · 124 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e8efe3c7`
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

## God Nodes (most connected - your core abstractions)
1. `scripts` - 10 edges
2. `PageNav()` - 5 edges
3. `City()` - 3 edges
4. `CityItem()` - 3 edges
5. `Logo()` - 3 edges
6. `Spinner()` - 3 edges
7. `App()` - 2 edges
8. `ButtonBack()` - 2 edges
9. `formatDate()` - 2 edges
10. `formatDate()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (12 total, 2 thin omitted)

### Community 0 - "Pages and App"
Cohesion: 0.14
Nodes (12): CountriesList(), Form(), Logo(), PageNav(), Homepage(), Login(), PageNotFound(), Pricing() (+4 more)

### Community 1 - "Dev Dependencies"
Cohesion: 0.12
Nodes (16): devDependencies, babel-plugin-react-compiler, cross-env, eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+8 more)

### Community 2 - "Package Config"
Cohesion: 0.13
Nodes (14): author, dependencies, json-server, react, react-dom, react-router-dom, description, keywords (+6 more)

### Community 3 - "Navigation Layout"
Cohesion: 0.29
Nodes (5): AppNav(), Footer(), Map(), Sidebar(), AppLayout()

### Community 4 - "Build Scripts"
Cohesion: 0.20
Nodes (10): scripts, build, dev, format, lint, preview, server, start (+2 more)

### Community 5 - "City List Components"
Cohesion: 0.33
Nodes (4): CityItem(), formatDate(), CityList(), Spinner()

### Community 6 - "City Detail"
Cohesion: 0.60
Nodes (3): ButtonBack(), City(), formatDate()

## Knowledge Gaps
- **41 isolated node(s):** `@kilocode/plugin`, `name`, `version`, `description`, `main` (+36 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies` to `Package Config`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `scripts` connect `Build Scripts` to `Package Config`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `@kilocode/plugin`, `name`, `version` to the rest of the system?**
  _41 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pages and App` be split into smaller, more focused modules?**
  _Cohesion score 0.14130434782608695 - nodes in this community are weakly interconnected._
- **Should `Dev Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Package Config` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._