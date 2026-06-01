// Load the dlite token CSS variables at the document level so components'
// `var(--tk-dlite-*)` references resolve during tests, exactly as consumers
// load them in a real app.
import 'style-dictionary-dlite-tokens/web/puente/default/variables.css';
