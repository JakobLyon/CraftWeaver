# CraftWeaver

## License

This project is **not open-source**.

It is made publicly visible for **portfolio, educational, and evaluation purposes only**.  
You may **not** use, copy, modify, distribute, or incorporate this code into any other work without explicit written permission from the author.

If you notice an issue or would like to contribute, feel free to open a pull request or GitHub issue.  
All contributions are considered under the condition that the author retains full rights to accept, modify, or reject them.

## Description

CraftTree is a TypeScript-based crafting engine designed to analyze crafting systems across multiple games. It dynamically ingests crafting recipes and item price data, builds a dependency graph, and determines the most cost-effective crafting strategies using memoized graph traversal.

The project is architected around:

A universal schema for recipes and items to enable cross-game compatibility

A modular adapter layer for integrating data from different games or formats (JSON, API, CSV)

A core engine that uses tree-based memoization to resolve complex crafting chains and compute total cost, sell value, and margin

A CLI interface for single-item reports, batch profit exports, or integration into build pipelines

The system supports recursive recipes, by-products, time-based calculations, and custom logic for buy-vs-craft optimization via an open-source DAG solver (@gw2efficiency/recipe-calculation).

This project is intended for personal and educational use, and is published publicly for evaluation purposes only.

© 2025 Jakob Lyon. All rights reserved.
