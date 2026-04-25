module.exports = [
"[project]/my-app/app/not-found.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/my-app/app/not-found.js'\n\n'const' declarations must be initialized");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
];