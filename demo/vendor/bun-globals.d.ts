// Ambient Bun global for typechecking the demo bundle.
// qxchat.ts references `Bun` behind `typeof` guards (DNS prefetch only);
// the browser bundle never executes those paths. This keeps `tsc` quiet
// without pulling @types/bun into the demo.
declare var Bun: any;
