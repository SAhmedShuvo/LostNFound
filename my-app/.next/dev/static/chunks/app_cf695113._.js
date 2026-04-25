(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/lostOrfoundButton.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
const LostOrFoundButton = ({ lostOrFound, setLostOrFound })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full bg-[#F9F8F6] h-15 flex justify-center items-center mt-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-70 bg-gray-700 h-8 rounded-4xl px-1.5 flex justify-between items-center",
            children: lostOrFound == "lost" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "px-6 bg-amber-100 rounded-2xl transition-all duration-300 ",
                        onClick: ()=>setLostOrFound("lost"),
                        children: "Lost Items"
                    }, void 0, false, {
                        fileName: "[project]/app/components/lostOrfoundButton.jsx",
                        lineNumber: 10,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "text-white px-6",
                        onClick: ()=>setLostOrFound("found"),
                        children: "Found Items"
                    }, void 0, false, {
                        fileName: "[project]/app/components/lostOrfoundButton.jsx",
                        lineNumber: 16,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: " text-white px-6 ",
                        onClick: ()=>setLostOrFound("lost"),
                        children: "Lost Items"
                    }, void 0, false, {
                        fileName: "[project]/app/components/lostOrfoundButton.jsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "px-6 bg-amber-100 rounded-2xl transition-all duration-300",
                        onClick: ()=>setLostOrFound("found"),
                        children: "Found Items"
                    }, void 0, false, {
                        fileName: "[project]/app/components/lostOrfoundButton.jsx",
                        lineNumber: 31,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/app/components/lostOrfoundButton.jsx",
            lineNumber: 7,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/components/lostOrfoundButton.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = LostOrFoundButton;
const __TURBOPACK__default__export__ = LostOrFoundButton;
var _c;
__turbopack_context__.k.register(_c, "LostOrFoundButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/data/founditem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/data/lostitem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        location: "CSE Building, Room 204",
        description: "A black leather wallet containing multiple cards including a student ID, debit card, and library card. The wallet has slightly worn edges and a stitched pattern on the front.",
        date: "2025-01-12",
        status: "Lost",
        reportedBy: "user_001"
    },
    {
        id: 2,
        name: "Samsung Smartphone",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Main Library 2nd Floor",
        description: "A modern Samsung smartphone with a slim black case. The device has a cracked back glass and contains important saved login credentials.",
        date: "2025-02-04",
        status: "Lost",
        reportedBy: "user_002"
    },
    {
        id: 3,
        name: "Red Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Campus Cafeteria",
        description: "A large red backpack containing notebooks, stationery items, and a calculator. The backpack has a side pocket with a broken zipper.",
        date: "2025-01-29",
        status: "Lost",
        reportedBy: "user_003"
    },
    {
        id: 4,
        name: "Grey Hoodie",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Playground Bench",
        description: "A thick grey hoodie with a small embroidered logo on the front. It has slightly faded sleeves and a loose drawstring.",
        date: "2025-01-20",
        status: "Lost",
        reportedBy: "user_004"
    },
    {
        id: 5,
        name: "Mathematics Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "Old Academic Building",
        description: "A spiral-bound mathematics notebook filled with class notes. The cover is slightly torn and the owner’s name is written on the first page.",
        date: "2025-02-02",
        status: "Lost",
        reportedBy: "user_005"
    },
    {
        id: 6,
        name: "Keychain with Three Keys",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Parking Area",
        description: "A small blue keychain containing three metallic keys for home, locker, and desk. The keychain ring is slightly rusted.",
        date: "2025-01-11",
        status: "Lost",
        reportedBy: "user_006"
    },
    {
        id: 7,
        name: "Casio Scientific Calculator",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612810806563-e95e3b5f051d",
        location: "Room 103",
        description: "A Casio FX series scientific calculator with minor scratches on the display. A small handwritten name label is attached at the back.",
        date: "2025-02-06",
        status: "Lost",
        reportedBy: "user_007"
    },
    {
        id: 8,
        name: "Campus ID Card",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1588776814546-1aedc6c0a086",
        location: "Ground Floor Corridor",
        description: "An official campus identity card containing personal and academic details. The card is inside a transparent plastic holder.",
        date: "2025-02-10",
        status: "Lost",
        reportedBy: "user_008"
    },
    {
        id: 9,
        name: "Wireless Earbuds (White)",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Bus Stand",
        description: "A pair of white wireless earbuds inside a small charging case. The left earbud has a small scratch and the case has a faded logo.",
        date: "2025-02-09",
        status: "Lost",
        reportedBy: "user_009"
    },
    {
        id: 10,
        name: "Brown Leather Wallet",
        category: "Personal Item",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        location: "CSE Garden",
        description: "A brown leather wallet containing student documents, receipts, and some cash. The surface has visible fold marks.",
        date: "2025-01-18",
        status: "Lost",
        reportedBy: "user_010"
    },
    {
        id: 11,
        name: "Laptop HP Pavilion",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Science Building 3rd Floor",
        description: "A silver HP Pavilion laptop with stickers on the back. Contains important project files and coursework data.",
        date: "2025-02-15",
        status: "Lost",
        reportedBy: "user_011"
    },
    {
        id: 12,
        name: "Blue Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Library Lawn",
        description: "A blue backpack containing textbooks and personal stationery. The zipper handle is broken on the top pocket.",
        date: "2025-01-25",
        status: "Lost",
        reportedBy: "user_012"
    },
    {
        id: 13,
        name: "Black Hoodie",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Playground Bench",
        description: "A black hoodie with a white printed logo at the center. The sleeves are slightly stretched due to usage.",
        date: "2025-01-29",
        status: "Lost",
        reportedBy: "user_013"
    },
    {
        id: 14,
        name: "Lab Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "Chemistry Building",
        description: "A thick lab notebook containing experiment results and observations. The pages have marker highlights and annotations.",
        date: "2025-02-05",
        status: "Lost",
        reportedBy: "user_014"
    },
    {
        id: 15,
        name: "Metal Keychain",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Parking Shed",
        description: "A metallic keychain containing two room keys and one drawer key. The metal tag has an engraved letter ‘S’.",
        date: "2025-02-03",
        status: "Lost",
        reportedBy: "user_015"
    },
    {
        id: 16,
        name: "Casio FX-991EX Calculator",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612810806563-e95e3b5f051d",
        location: "Exam Hall A",
        description: "A Casio scientific calculator with a black cover case. The device has a slightly loose battery cover.",
        date: "2025-02-11",
        status: "Lost",
        reportedBy: "user_016"
    },
    {
        id: 17,
        name: "Student ID Card",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1588776814546-1aedc6c0a086",
        location: "Ground Floor Lobby",
        description: "An official ID card with a plastic blue holder. The card includes student details and a barcode at the back.",
        date: "2025-01-16",
        status: "Lost",
        reportedBy: "user_017"
    },
    {
        id: 18,
        name: "Black Earbuds",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Cafeteria Hall",
        description: "Black wireless earbuds inside a compact charging case. One ear tip is missing and the battery level is low.",
        date: "2025-02-14",
        status: "Lost",
        reportedBy: "user_018"
    },
    {
        id: 19,
        name: "Grey Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Main Gate Area",
        description: "A medium-sized grey backpack containing laptop accessories. The front pocket has handwritten initials.",
        date: "2025-02-01",
        status: "Lost",
        reportedBy: "user_019"
    },
    {
        id: 20,
        name: "White Hoodie",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Bus Terminal",
        description: "A white cotton hoodie with a soft interior. The lower hem has a small tear on the left side.",
        date: "2025-01-21",
        status: "Lost",
        reportedBy: "user_020"
    },
    {
        id: 21,
        name: "English Class Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "CSE Seminar Hall",
        description: "A ruled English notebook with lecture notes and summaries. The last few pages contain written assignments.",
        date: "2025-02-07",
        status: "Lost",
        reportedBy: "user_021"
    },
    {
        id: 22,
        name: "Silver Keychain",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Admin Parking",
        description: "A silver metal keychain holding three keys. The chain has a small ornament attached with a red bead.",
        date: "2025-01-19",
        status: "Lost",
        reportedBy: "user_022"
    },
    {
        id: 23,
        name: "Mini Calculator",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612810806563-e95e3b5f051d",
        location: "Math Lab",
        description: "A compact calculator with a slightly faded keypad. The device is stored inside a grey protective pouch.",
        date: "2025-01-28",
        status: "Lost",
        reportedBy: "user_023"
    },
    {
        id: 24,
        name: "Identity Document Folder",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1588776814546-1aedc6c0a086",
        location: "Registrar Office",
        description: "A plastic document folder containing identity papers and photocopies. The folder is blue and partially cracked on the edges.",
        date: "2025-01-23",
        status: "Lost",
        reportedBy: "user_024"
    },
    {
        id: 25,
        name: "Android Smartphone",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Cafeteria Balcony",
        description: "A black Android smartphone with a fingerprint-damaged back cover. The phone contains study PDFs and saved passwords.",
        date: "2025-02-08",
        status: "Lost",
        reportedBy: "user_025"
    },
    {
        id: 26,
        name: "Blue Travel Bag",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Gym Area",
        description: "A large blue travel bag containing clothing, shoes, and a towel. The bag has a slightly torn handle.",
        date: "2025-01-24",
        status: "Lost",
        reportedBy: "user_026"
    },
    {
        id: 27,
        name: "Dark Grey Jacket",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "CSE Corridor",
        description: "A warm dark grey jacket with zip pockets. The left sleeve has a faded patch due to frequent usage.",
        date: "2025-01-30",
        status: "Lost",
        reportedBy: "user_027"
    },
    {
        id: 28,
        name: "Physics Notes Copy",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "Science Building",
        description: "A notes copy containing physics derivations and formulas. Many pages have hand-drawn diagrams.",
        date: "2025-02-12",
        status: "Lost",
        reportedBy: "user_028"
    },
    {
        id: 29,
        name: "Silver Wireless Earbuds",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "CSE Garden",
        description: "A pair of silver wireless earbuds with a compact charging case. The right earbud is slightly scratched, and the case has a small dent.",
        date: "2025-01-14",
        status: "Lost",
        reportedBy: "user_029"
    },
    {
        id: 30,
        name: "Red Travel Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Main Library Entrance",
        description: "A red travel backpack containing books and stationery. The top zipper is partially broken, and the shoulder straps are frayed.",
        date: "2025-01-17",
        status: "Lost",
        reportedBy: "user_030"
    },
    {
        id: 31,
        name: "Black Pullover Hoodie",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Playground Bench",
        description: "A black cotton hoodie with a front pocket and a small logo on the chest. The sleeves are slightly stretched from usage.",
        date: "2025-02-03",
        status: "Lost",
        reportedBy: "user_031"
    },
    {
        id: 32,
        name: "Chemistry Lab Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "Chemistry Lab Room 5",
        description: "A spiral-bound lab notebook with chemistry experiments and observations. Some pages are folded and have handwritten annotations.",
        date: "2025-02-06",
        status: "Lost",
        reportedBy: "user_032"
    },
    {
        id: 33,
        name: "Blue Keychain with Keys",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Parking Lot",
        description: "A blue plastic keychain holding three keys. One key has a small scratch, and the keychain ring is slightly rusted.",
        date: "2025-01-13",
        status: "Lost",
        reportedBy: "user_033"
    },
    {
        id: 34,
        name: "Casio Scientific Calculator",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612810806563-e95e3b5f051d",
        location: "Math Classroom 2",
        description: "A Casio FX-991EX scientific calculator with minor scratches. The device has a small sticker with the owner’s name on the back.",
        date: "2025-01-22",
        status: "Lost",
        reportedBy: "user_034"
    },
    {
        id: 35,
        name: "Campus Student ID",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1588776814546-1aedc6c0a086",
        location: "Registrar Office",
        description: "A blue campus ID card in a plastic holder. The card includes personal details and a barcode for library access.",
        date: "2025-02-02",
        status: "Lost",
        reportedBy: "user_035"
    },
    {
        id: 36,
        name: "Wireless Black Earbuds",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Library 1st Floor",
        description: "A pair of black wireless earbuds in a small white case. One earbud is missing the silicone tip, and the case has minor scratches.",
        date: "2025-01-19",
        status: "Lost",
        reportedBy: "user_036"
    },
    {
        id: 37,
        name: "Grey Shoulder Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Cafeteria Area",
        description: "A medium-sized grey backpack containing a laptop and stationery. The main zipper is slightly stuck, and one strap is loose.",
        date: "2025-01-28",
        status: "Lost",
        reportedBy: "user_037"
    },
    {
        id: 38,
        name: "White Hoodie with Logo",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Bus Stop",
        description: "A white cotton hoodie with a printed logo on the chest. The sleeves are lightly stained and the fabric has small pilling spots.",
        date: "2025-02-01",
        status: "Lost",
        reportedBy: "user_038"
    },
    {
        id: 39,
        name: "Physics Class Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "Science Building Room 12",
        description: "A spiral notebook containing physics formulas and solved examples. Some pages have margin notes in red pen.",
        date: "2025-01-21",
        status: "Lost",
        reportedBy: "user_039"
    },
    {
        id: 40,
        name: "Keychain with Silver Keys",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Dormitory Entrance",
        description: "A silver keychain holding three keys, including dormitory and locker keys. One key has slight rust on the tip.",
        date: "2025-01-27",
        status: "Lost",
        reportedBy: "user_040"
    },
    {
        id: 41,
        name: "Mini Scientific Calculator",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612810806563-e95e3b5f051d",
        location: "Math Lab",
        description: "A compact Casio scientific calculator with worn buttons and a small sticker of the owner’s name at the back.",
        date: "2025-02-05",
        status: "Lost",
        reportedBy: "user_041"
    },
    {
        id: 42,
        name: "Official Campus ID Card",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1588776814546-1aedc6c0a086",
        location: "Administrative Office",
        description: "An official campus ID card with student details and a barcode. The plastic cover is slightly cracked on the edges.",
        date: "2025-01-31",
        status: "Lost",
        reportedBy: "user_042"
    },
    {
        id: 43,
        name: "Wireless Earbuds (Silver)",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "CSE Lawn",
        description: "A silver pair of wireless earbuds with a charging case. The case shows scratches and the right earbud is missing a tip.",
        date: "2025-01-16",
        status: "Lost",
        reportedBy: "user_043"
    },
    {
        id: 44,
        name: "Red Laptop Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Library Entrance",
        description: "A red laptop backpack containing textbooks and stationery. The zippers are slightly stuck and one strap is loose.",
        date: "2025-01-20",
        status: "Lost",
        reportedBy: "user_044"
    },
    {
        id: 45,
        name: "Black Pullover Hoodie",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Bus Station Bench",
        description: "A black hoodie with a front pocket and soft lining. The hood string is slightly frayed and there are minor stains.",
        date: "2025-02-03",
        status: "Lost",
        reportedBy: "user_045"
    },
    {
        id: 46,
        name: "Math Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "CSE Seminar Hall",
        description: "A spiral-bound notebook with mathematics formulas and solved problems. The notebook has folded corners and handwritten notes.",
        date: "2025-02-08",
        status: "Lost",
        reportedBy: "user_046"
    },
    {
        id: 47,
        name: "Blue Keychain",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Parking Lot 3",
        description: "A small blue keychain holding three keys. One key shows light rust, and the keychain ring is slightly bent.",
        date: "2025-01-25",
        status: "Lost",
        reportedBy: "user_047"
    },
    {
        id: 48,
        name: "Scientific Calculator FX-991EX",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612810806563-e95e3b5f051d",
        location: "Math Lab Room 4",
        description: "A Casio FX-991EX scientific calculator with minor scratches on the body. The keys are slightly worn and a small name sticker is on the back.",
        date: "2025-01-29",
        status: "Lost",
        reportedBy: "user_048"
    },
    {
        id: 49,
        name: "Campus ID Card (Plastic Holder)",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1588776814546-1aedc6c0a086",
        location: "Library Lobby",
        description: "An official campus ID card in a blue plastic holder. The card includes personal and academic information, slightly worn edges.",
        date: "2025-02-01",
        status: "Lost",
        reportedBy: "user_049"
    },
    {
        id: 50,
        name: "Black Bluetooth Earbuds",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Cafeteria Hall",
        description: "A pair of black Bluetooth earbuds in a small charging case. One earbud is missing a silicone tip, case has minor scratches.",
        date: "2025-01-15",
        status: "Lost",
        reportedBy: "user_050"
    },
    {
        id: 51,
        name: "Red College Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Main Library Entrance",
        description: "A red backpack containing textbooks, stationery, and notebooks. The zipper is slightly stuck, and one shoulder strap is loose.",
        date: "2025-01-18",
        status: "Lost",
        reportedBy: "user_051"
    },
    {
        id: 52,
        name: "Grey Hoodie with Logo",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Bus Stop",
        description: "A grey hoodie made of cotton blend. The front logo is slightly faded, and sleeves have small signs of wear.",
        date: "2025-01-20",
        status: "Lost",
        reportedBy: "user_052"
    },
    {
        id: 53,
        name: "Physics Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "Science Building Room 11",
        description: "A spiral-bound physics notebook containing solved examples, formulas, and notes. Some pages have diagrams and margin notes.",
        date: "2025-02-03",
        status: "Lost",
        reportedBy: "user_053"
    },
    {
        id: 54,
        name: "Silver Keychain with Keys",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Parking Lot 1",
        description: "A small silver keychain holding three keys, including locker and dormitory keys. Slight rust on one key, keyring slightly bent.",
        date: "2025-01-25",
        status: "Lost",
        reportedBy: "user_054"
    },
    {
        id: 55,
        name: "Casio FX Calculator",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612810806563-e95e3b5f051d",
        location: "Math Lab Room 2",
        description: "A Casio FX-991EX scientific calculator with minor scratches and worn buttons. The back has a small sticker with owner's name.",
        date: "2025-01-27",
        status: "Lost",
        reportedBy: "user_055"
    },
    {
        id: 56,
        name: "Official Campus ID",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1588776814546-1aedc6c0a086",
        location: "Registrar Office",
        description: "A plastic campus ID card with barcode and student details. The edges are slightly worn, and card holder shows small cracks.",
        date: "2025-02-05",
        status: "Lost",
        reportedBy: "user_056"
    },
    {
        id: 57,
        name: "Wireless White Earbuds",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Library Reading Room",
        description: "White wireless earbuds in a charging case. Left earbud missing tip, case scratched, contains saved playlists and settings.",
        date: "2025-01-21",
        status: "Lost",
        reportedBy: "user_057"
    },
    {
        id: 58,
        name: "Blue Travel Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Gym Area",
        description: "A blue backpack containing clothes, gym shoes, and towel. The handle is slightly torn and zippers slightly stuck.",
        date: "2025-01-22",
        status: "Lost",
        reportedBy: "user_058"
    },
    {
        id: 59,
        name: "Black Pullover Hoodie",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Playground Bench",
        description: "A black cotton hoodie with front pocket and hood. Slight stains on sleeves, fabric shows small signs of wear.",
        date: "2025-01-19",
        status: "Lost",
        reportedBy: "user_059"
    },
    {
        id: 60,
        name: "Chemistry Notes Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "Science Lab 3",
        description: "Spiral-bound chemistry notebook with experiment observations. Some pages folded, containing hand-drawn diagrams.",
        date: "2025-02-02",
        status: "Lost",
        reportedBy: "user_060"
    },
    {
        id: 61,
        name: "Keychain with Blue Keys",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Parking Area 2",
        description: "A blue plastic keychain holding three metallic keys. Slight rust on key tips, keyring slightly bent.",
        date: "2025-01-26",
        status: "Lost",
        reportedBy: "user_061"
    },
    {
        id: 62,
        name: "Mini Scientific Calculator FX-991EX",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1612810806563-e95e3b5f051d",
        location: "Math Lab Room 1",
        description: "A small Casio scientific calculator with minor scratches on buttons. Owner's name is on a small back sticker.",
        date: "2025-01-28",
        status: "Lost",
        reportedBy: "user_062"
    },
    {
        id: 63,
        name: "Student ID Card",
        category: "Documents",
        image: "https://images.unsplash.com/photo-1588776814546-1aedc6c0a086",
        location: "Ground Floor Lobby",
        description: "An official student ID card with personal and academic details. Plastic holder slightly cracked on edges.",
        date: "2025-01-30",
        status: "Lost",
        reportedBy: "user_063"
    },
    {
        id: 64,
        name: "Black Wireless Earbuds",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        location: "Bus Stop",
        description: "Black wireless earbuds in a compact white case. Left earbud missing tip, case scratched, contains playlists and saved data.",
        date: "2025-02-03",
        status: "Lost",
        reportedBy: "user_064"
    },
    {
        id: 65,
        name: "Grey Travel Backpack",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1514474959185-147427b96dd9",
        location: "Library Front Lawn",
        description: "Grey backpack containing laptop, books, and stationery. The main zipper is slightly stuck and strap loose.",
        date: "2025-01-16",
        status: "Lost",
        reportedBy: "user_065"
    },
    {
        id: 66,
        name: "White Hoodie",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
        location: "Playground Bench",
        description: "White hoodie with cotton lining and small front logo. Slight stains on sleeves, minor pilling on fabric.",
        date: "2025-01-18",
        status: "Lost",
        reportedBy: "user_066"
    },
    {
        id: 67,
        name: "Math Notebook",
        category: "Stationery",
        image: "https://images.unsplash.com/photo-1585776245991-cd270677f56f",
        location: "CSE Seminar Room",
        description: "A notebook containing mathematics problems, formulas, and notes. Some pages folded, handwritten margin notes present.",
        date: "2025-02-04",
        status: "Lost",
        reportedBy: "user_067"
    },
    {
        id: 68,
        name: "Keychain with Three Silver Keys",
        category: "Keys",
        image: "https://images.unsplash.com/photo-1518558406711-a6a9135a84f2",
        location: "Dormitory Entrance",
        description: "A small keychain with three silver keys. Slight rust on key edges, keyring slightly bent. Keys include room and locker access.",
        date: "2025-01-24",
        status: "Lost",
        reportedBy: "user_068"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/card.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
;
const Card = ({ item })=>{
    console.log(item.name);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white shadow-sm hover:shadow-lg hover:shadow-blue-100 rounded-xl p-4 w-full max-w-sm h-90",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                className: "w-full h-40 object-cover",
                src: item.image,
                alt: item.name
            }, void 0, false, {
                fileName: "[project]/app/components/card.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mt-3 text-lg text-blue-800 font-semibold",
                children: [
                    "Item: ",
                    item.name
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/card.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-800",
                children: [
                    "location: ",
                    item.location
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/card.jsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-800",
                children: [
                    "Date: ",
                    item.date
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/card.jsx",
                lineNumber: 17,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-baseline gap-2 mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "px-4 py-2 bg-orange-400 hover:bg-amber-400 text-black rounded-lg font-medium ",
                        children: "Claim"
                    }, void 0, false, {
                        fileName: "[project]/app/components/card.jsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "px-4 py-2 bg-blue-400 hover:bg-blue-300 border border-gray-400 rounded-lg",
                        children: "Details"
                    }, void 0, false, {
                        fileName: "[project]/app/components/card.jsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/item/${item.id}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "px-4 py-2 bg-[#80D8C3] border border-gray-400 rounded-lg",
                            children: item.status
                        }, void 0, false, {
                            fileName: "[project]/app/components/card.jsx",
                            lineNumber: 26,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/components/card.jsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/card.jsx",
                lineNumber: 18,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/card.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Card;
const __TURBOPACK__default__export__ = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Itemsection.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$founditem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/founditem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$lostitem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/data/lostitem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/card.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const ItemSection = ({ lostOrFound })=>{
    _s();
    const itemToShow = lostOrFound === "lost" ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$lostitem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lostItems"] : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$founditem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["foundItems"];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // show 6 items per page
    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemToShow.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(itemToShow.length / itemsPerPage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#F9F8F6] flex justify-center items-start flex-wrap gap-6 px-6 pt-10",
        children: itemToShow.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$card$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                item: item
            }, item.id, false, {
                fileName: "[project]/app/components/Itemsection.jsx",
                lineNumber: 22,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/app/components/Itemsection.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ItemSection, "6xAUoJ2motYJ38x4zeUWisA+X/4=");
_c = ItemSection;
const __TURBOPACK__default__export__ = ItemSection;
var _c;
__turbopack_context__.k.register(_c, "ItemSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/item/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$lostOrfoundButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/lostOrfoundButton.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Itemsection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Itemsection.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Home() {
    _s();
    const [lostOrFound, setLostOrFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("lost");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$lostOrfoundButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                lostOrFound: lostOrFound,
                setLostOrFound: setLostOrFound
            }, void 0, false, {
                fileName: "[project]/app/item/page.jsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Itemsection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                lostOrFound: lostOrFound
            }, void 0, false, {
                fileName: "[project]/app/item/page.jsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/item/page.jsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(Home, "Km3T1WjpqzoX+iiYS8QFWONLSMs=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_cf695113._.js.map