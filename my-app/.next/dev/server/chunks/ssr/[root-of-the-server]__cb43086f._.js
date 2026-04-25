module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.js [app-rsc] (ecmascript)"));
}),
"[project]/app/data/lostitem.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lostItems",
    ()=>lostItems
]);
const lostItems = [
    {
        id: 1,
        name: "Black Leather Wallet",
        category: "Personal Item",
        image: "https://i.imgur.com/8D1Zb2z.jpeg",
        location: "CSE Building, Room 204",
        description: "Contains ID card, debit card, and some cash.",
        date: "2025-02-12",
        status: "Lost",
        reportedBy: "user_001"
    },
    {
        id: 2,
        name: "Samsung Galaxy A52",
        category: "Electronics",
        image: "https://i.imgur.com/nRZ8pQJ.jpeg",
        location: "Library 2nd Floor",
        description: "Blue case, minor scratches.",
        date: "2025-02-10",
        status: "Lost",
        reportedBy: "user_002"
    },
    {
        id: 3,
        name: "Red Backpack",
        category: "Bags",
        image: "https://i.imgur.com/5X7pZmF.jpeg",
        location: "Cafeteria",
        description: "Has notebooks and calculator inside.",
        date: "2025-02-08",
        status: "Lost",
        reportedBy: "user_003"
    },
    {
        id: 4,
        name: "Laptop (HP Pavilion)",
        category: "Electronics",
        image: "https://i.imgur.com/7f0vH1O.jpeg",
        location: "Science Building 3rd Floor",
        description: "Sticker on back: 'Code Sleep Repeat'.",
        date: "2025-02-17",
        status: "Lost",
        reportedBy: "user_004"
    },
    {
        id: 5,
        name: "Campus ID Card",
        category: "Documents",
        image: "https://i.imgur.com/EGQVOgF.jpeg",
        location: "Ground Floor Corridor",
        description: "Student: Arif Hassan",
        date: "2025-02-16",
        status: "Lost",
        reportedBy: "user_005"
    },
    {
        id: 6,
        name: "Keychain with 3 Keys",
        category: "Keys",
        image: "https://i.imgur.com/5g7IhSt.jpeg",
        location: "Parking Area",
        description: "Blue keychain.",
        date: "2025-01-30",
        status: "Lost",
        reportedBy: "user_006"
    },
    {
        id: 7,
        name: "Scientific Calculator (Casio FX-991EX)",
        category: "Accessories",
        image: "https://i.imgur.com/LG1Z9U4.jpeg",
        location: "Room 103",
        description: "Has name 'Siam' written at back.",
        date: "2025-02-05",
        status: "Lost",
        reportedBy: "user_007"
    },
    {
        id: 8,
        name: "Black Hoodie",
        category: "Clothing",
        image: "https://i.imgur.com/3kLzDpM.jpeg",
        location: "Playground Bench",
        description: "Nike logo on front.",
        date: "2025-02-01",
        status: "Lost",
        reportedBy: "user_008"
    },
    {
        id: 9,
        name: "Notebook (Math)",
        category: "Stationery",
        image: "https://i.imgur.com/QAaZ0d8.jpeg",
        location: "CSE Garden",
        description: "Name: Rafi Islam",
        date: "2025-02-11",
        status: "Lost",
        reportedBy: "user_009"
    },
    {
        id: 10,
        name: "Earbuds (JBL White)",
        category: "Electronics",
        image: "https://i.imgur.com/Bu9lFfL.jpeg",
        location: "Bus Stand",
        description: "Left earbud missing.",
        date: "2025-02-09",
        status: "Lost",
        reportedBy: "user_010"
    }
];
}),
"[project]/app/data/founditem.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "foundItems",
    ()=>foundItems
]);
const foundItems = [
    {
        id: 101,
        name: "Blue Backpack",
        category: "Bags",
        image: "https://i.imgur.com/t7FQKkC.jpeg",
        location: "Science Building Lobby",
        description: "Contains papers and pen.",
        date: "2025-02-18",
        status: "Found",
        reportedBy: "user_021"
    },
    {
        id: 102,
        name: "iPhone 12 (Black)",
        category: "Electronics",
        image: "https://i.imgur.com/m2y9yTy.jpeg",
        location: "Library Stairs",
        description: "Black silicon case.",
        date: "2025-02-19",
        status: "Found",
        reportedBy: "user_022"
    },
    {
        id: 103,
        name: "Silver Bracelet",
        category: "Jewelry",
        image: "https://i.imgur.com/z9wHMaQ.jpeg",
        location: "Cafeteria Table",
        description: "Simple design.",
        date: "2025-02-12",
        status: "Found",
        reportedBy: "user_023"
    },
    {
        id: 104,
        name: "Notebook (Blue Cover)",
        category: "Stationery",
        image: "https://i.imgur.com/6PZ8tgS.jpeg",
        location: "Room 102",
        description: "Has chemical equations.",
        date: "2025-02-14",
        status: "Found",
        reportedBy: "user_024"
    },
    {
        id: 105,
        name: "Water Bottle (Red)",
        category: "Accessories",
        image: "https://i.imgur.com/ftlB8Np.jpeg",
        location: "Playground",
        description: "Sports bottle.",
        date: "2025-02-11",
        status: "Found",
        reportedBy: "user_025"
    },
    {
        id: 106,
        name: "Wrist Watch (Fastrack)",
        category: "Accessories",
        image: "https://i.imgur.com/K5n1oDR.jpeg",
        location: "Washroom Sink Area",
        description: "Brown strap.",
        date: "2025-02-13",
        status: "Found",
        reportedBy: "user_026"
    },
    {
        id: 107,
        name: "Campus ID Card",
        category: "Documents",
        image: "https://i.imgur.com/t1tRkgi.jpeg",
        location: "Admin Office Gate",
        description: "Owner: Rimi Akter",
        date: "2025-02-10",
        status: "Found",
        reportedBy: "user_027"
    },
    {
        id: 108,
        name: "Keychain with Cartoon",
        category: "Keys",
        image: "https://i.imgur.com/T38wnDz.jpeg",
        location: "Parking Area",
        description: "One car key and one room key.",
        date: "2025-02-07",
        status: "Found",
        reportedBy: "user_028"
    },
    {
        id: 109,
        name: "Calculator (Casio FX-82MS)",
        category: "Electronics",
        image: "https://i.imgur.com/wvfvUzJ.jpeg",
        location: "Exam Hall",
        description: "Name: Rahat",
        date: "2025-02-06",
        status: "Found",
        reportedBy: "user_029"
    },
    {
        id: 110,
        name: "Headphones (Sony Black)",
        category: "Electronics",
        image: "https://i.imgur.com/J6fIEe7.jpeg",
        location: "CSE Ground",
        description: "Small scratch on left cup.",
        date: "2025-02-15",
        status: "Found",
        reportedBy: "user_030"
    }
];
}),
"[project]/app/item/[id]/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$lostitem$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/lostitem.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$founditem$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/founditem.js [app-rsc] (ecmascript)");
;
;
;
;
const ItemDetails = ({ params })=>{
    const { id } = params;
    //console.log("hello");
    //console.log(params);
    //console.log(id);
    const item = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$lostitem$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["lostItems"].find((it)=>it.id == id) || __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$founditem$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["foundItems"].find((it)=>it.id == id);
    if (!item) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-10 text-center",
        children: "Item not found."
    }, void 0, false, {
        fileName: "[project]/app/item/[id]/page.jsx",
        lineNumber: 15,
        columnNumber: 23
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-4",
                children: item.title
            }, void 0, false, {
                fileName: "[project]/app/item/[id]/page.jsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: item.image,
                        width: 500,
                        height: 500,
                        alt: item.title,
                        className: "rounded-xl shadow"
                    }, void 0, false, {
                        fileName: "[project]/app/item/[id]/page.jsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-700 mb-3",
                                children: item.description
                            }, void 0, false, {
                                fileName: "[project]/app/item/[id]/page.jsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Status:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/item/[id]/page.jsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ",
                                    item.status
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/item/[id]/page.jsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `/claim/${item.id}`,
                                className: "bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500",
                                children: "Claim This Item"
                            }, void 0, false, {
                                fileName: "[project]/app/item/[id]/page.jsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/item/[id]/page.jsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/item/[id]/page.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/item/[id]/page.jsx",
        lineNumber: 18,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ItemDetails;
}),
"[project]/app/item/[id]/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/item/[id]/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cb43086f._.js.map