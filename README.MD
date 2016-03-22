# SurviveJS Kanban

A Kanban app built by following the instructions in the [SurviveJS book](https://survivejs.com/)

## Changelog

0.9
  * For production build:
    * Uglify JavaScript
    * Separate bundles for app and vendor JavaScript
    * Separate CSS file
    * Cache invalidation using hashes as part of JS / CSS filenames
    * Auto-generate index.html

0.8
  * Reorder notes within a lane or move notes between lanes via drag-and-drop

0.7
  * Edit lane name
  * Delete lanes

0.6
  * Associate note with lanes
  * Add lanes

0.5
  * Data persistence via localStorage

0.4
  * Use Alt to manage state and handle actions
  * No declarations file readily available for Alt
  * Converting from TypeScript definitions is infeasible at this time

0.3
  * Transition from PropTypes to Flow annotations
  * Issue encountered in annotating return type of functional components and render() method of ES6 class components

0.2
  * Add / remove / edit notes
  * Custom propTypes (ran into some [limitations](https://github.com/facebook/react/issues/4811))

0.1
  * Basic app with Webpack configured with HMR for JavaScript (including React components) and CSS
  * Displays a fixed list of notes
  * My favorite ESlint configuration is included
