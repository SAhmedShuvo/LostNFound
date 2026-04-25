(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Mock Data
const statsData = {
    totalLost: 42,
    totalFound: 58,
    totalClaims: 23,
    itemsReturned: 35,
    pendingVerification: 8,
    activeClaims: 12
};
const recentClaims = [
    {
        id: 1,
        itemName: "Black Backpack",
        claimer: "John Doe",
        claimerEmail: "john@example.com",
        status: "pending",
        date: "2024-12-05",
        location: "Library"
    },
    {
        id: 2,
        itemName: "iPhone 13",
        claimer: "Jane Smith",
        claimerEmail: "jane@example.com",
        status: "approved",
        date: "2024-12-04",
        location: "Cafeteria"
    },
    {
        id: 3,
        itemName: "Student ID Card",
        claimer: "Mike Johnson",
        claimerEmail: "mike@example.com",
        status: "pending",
        date: "2024-12-04",
        location: "Gym"
    }
];
const recentActivities = [
    {
        id: 1,
        action: "New claim submitted",
        item: "Black Backpack",
        time: "5 mins ago",
        type: "claim"
    },
    {
        id: 2,
        action: "Item verified",
        item: "iPhone 13",
        time: "1 hour ago",
        type: "verify"
    },
    {
        id: 3,
        action: "Claim approved",
        item: "Student ID Card",
        time: "2 hours ago",
        type: "approve"
    }
];
function AdminDashboardPage() {
    _s();
    const [claims, setClaims] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(recentClaims);
    const handleApproveClaim = (id)=>setClaims(claims.map((c)=>c.id === id ? {
                ...c,
                status: "approved"
            } : c));
    const handleRejectClaim = (id)=>setClaims(claims.map((c)=>c.id === id ? {
                ...c,
                status: "rejected"
            } : c));
    const getStatusBadge = (status)=>{
        const styles = {
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            approved: "bg-green-100 text-green-800 border-green-200",
            rejected: "bg-red-100 text-red-800 border-red-200"
        };
        return styles[status] || "";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-xl font-bold mb-4",
            children: "Dashboard Overview"
        }, void 0, false, {
            fileName: "[project]/app/admin/dashboard/page.jsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/dashboard/page.jsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(AdminDashboardPage, "HfkmP88neRelqHmNDoT2z2SZlps=");
_c = AdminDashboardPage;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_dashboard_page_jsx_8a94c766._.js.map