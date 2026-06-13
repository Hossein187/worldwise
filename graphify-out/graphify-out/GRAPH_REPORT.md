# Graph Report - src  (2026-06-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 54 nodes · 78 edges · 8 communities (7 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]

## God Nodes (most connected - your core abstractions)
1. `PageNav()` - 5 edges
2. `Logo()` - 3 edges
3. `Spinner()` - 3 edges
4. `App()` - 2 edges
5. `AppNav()` - 2 edges
6. `ButtonBack()` - 2 edges
7. `formatDate()` - 2 edges
8. `City()` - 2 edges
9. `CityItem()` - 2 edges
10. `CityList()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.23
Nodes (6): App(), CountriesList(), Form(), root, rootElement, PageNotFound()

### Community 1 - "Community 1"
Cohesion: 0.24
Nodes (6): Logo(), PageNav(), Homepage(), Login(), Pricing(), Product()

### Community 2 - "Community 2"
Cohesion: 0.29
Nodes (5): AppNav(), Footer(), Map(), Sidebar(), AppLayout()

### Community 3 - "Community 3"
Cohesion: 0.36
Nodes (3): CityItem(), CityList(), Spinner()

### Community 4 - "Community 4"
Cohesion: 0.60
Nodes (3): ButtonBack(), City(), formatDate()

## Knowledge Gaps
- **3 isolated node(s):** `FAKE_USER`, `rootElement`, `root`
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Logo()` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `FAKE_USER`, `rootElement`, `root` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._