/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/stats/route";
exports.ids = ["app/api/stats/route"];
exports.modules = {

/***/ "(rsc)/./app/api/stats/route.ts":
/*!********************************!*\
  !*** ./app/api/stats/route.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n\n\nconst dbConfig = {\n    host: process.env.DB_HOST || \"mysql8.srkhost.eu\",\n    user: process.env.DB_USER || \"u80988_sSTWSbKDoQ\",\n    password: process.env.DB_PASSWORD || \"lg!iyKzsB2.NjmqnKmLe9xGc\",\n    database: process.env.DB_NAME || \"s80988_asd\",\n    port: Number.parseInt(process.env.DB_PORT || \"3306\")\n};\nasync function GET() {\n    try {\n        let connection;\n        try {\n            connection = await mysql2_promise__WEBPACK_IMPORTED_MODULE_1__.createConnection(dbConfig);\n            await connection.ping();\n        } catch (dbError) {\n            console.error(\"Database connection error:\", dbError);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                count: \"N/A\"\n            });\n        }\n        try {\n            const [rows] = await connection.execute(\"SELECT COUNT(*) as count FROM registrations\");\n            const count = rows.length > 0 ? rows[0].count : 0;\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                count\n            });\n        } finally{\n            if (connection) {\n                await connection.end();\n            }\n        }\n    } catch (error) {\n        console.error(\"Stats error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            count: \"N/A\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N0YXRzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEwQztBQUNXO0FBRXJELE1BQU1FLFdBQVc7SUFDZkMsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxPQUFPLElBQUk7SUFDN0JDLE1BQU1ILFFBQVFDLEdBQUcsQ0FBQ0csT0FBTyxJQUFJO0lBQzdCQyxVQUFVTCxRQUFRQyxHQUFHLENBQUNLLFdBQVcsSUFBSTtJQUNyQ0MsVUFBVVAsUUFBUUMsR0FBRyxDQUFDTyxPQUFPLElBQUk7SUFDakNDLE1BQU1DLE9BQU9DLFFBQVEsQ0FBQ1gsUUFBUUMsR0FBRyxDQUFDVyxPQUFPLElBQUk7QUFDL0M7QUFNTyxlQUFlQztJQUNwQixJQUFJO1FBQ0YsSUFBSUM7UUFDSixJQUFJO1lBQ0ZBLGFBQWEsTUFBTWpCLDREQUFzQixDQUFDQztZQUMxQyxNQUFNZ0IsV0FBV0UsSUFBSTtRQUN2QixFQUFFLE9BQU9DLFNBQWM7WUFDckJDLFFBQVFDLEtBQUssQ0FBQyw4QkFBOEJGO1lBQzVDLE9BQU9yQixxREFBWUEsQ0FBQ3dCLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFNO1FBQzFDO1FBRUEsSUFBSTtZQUNGLE1BQU0sQ0FBQ0MsS0FBSyxHQUFHLE1BQU1SLFdBQVdTLE9BQU8sQ0FBYTtZQUVwRCxNQUFNRixRQUFRQyxLQUFLRSxNQUFNLEdBQUcsSUFBSUYsSUFBSSxDQUFDLEVBQUUsQ0FBQ0QsS0FBSyxHQUFHO1lBRWhELE9BQU96QixxREFBWUEsQ0FBQ3dCLElBQUksQ0FBQztnQkFBRUM7WUFBTTtRQUNuQyxTQUFVO1lBQ1IsSUFBSVAsWUFBWTtnQkFDZCxNQUFNQSxXQUFXVyxHQUFHO1lBQ3RCO1FBQ0Y7SUFDRixFQUFFLE9BQU9OLE9BQU87UUFDZEQsUUFBUUMsS0FBSyxDQUFDLGdCQUFnQkE7UUFDOUIsT0FBT3ZCLHFEQUFZQSxDQUFDd0IsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBTTtJQUMxQztBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGliZW5lXFxEZXNrdG9wXFxEZXZlbG9wbWVudFxcYXBwXFxhcGlcXHN0YXRzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxuaW1wb3J0IG15c3FsLCB7IFJvd0RhdGFQYWNrZXQgfSBmcm9tIFwibXlzcWwyL3Byb21pc2VcIlxuXG5jb25zdCBkYkNvbmZpZyA9IHtcbiAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCB8fCBcIm15c3FsOC5zcmtob3N0LmV1XCIsXG4gIHVzZXI6IHByb2Nlc3MuZW52LkRCX1VTRVIgfHwgXCJ1ODA5ODhfc1NUV1NiS0RvUVwiLFxuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQgfHwgXCJsZyFpeUt6c0IyLk5qbXFuS21MZTl4R2NcIixcbiAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRCX05BTUUgfHwgXCJzODA5ODhfYXNkXCIsXG4gIHBvcnQ6IE51bWJlci5wYXJzZUludChwcm9jZXNzLmVudi5EQl9QT1JUIHx8IFwiMzMwNlwiKSxcbn1cblxuaW50ZXJmYWNlIENvdW50Um93IGV4dGVuZHMgUm93RGF0YVBhY2tldCB7XG4gIGNvdW50OiBudW1iZXJcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBsZXQgY29ubmVjdGlvblxuICAgIHRyeSB7XG4gICAgICBjb25uZWN0aW9uID0gYXdhaXQgbXlzcWwuY3JlYXRlQ29ubmVjdGlvbihkYkNvbmZpZylcbiAgICAgIGF3YWl0IGNvbm5lY3Rpb24ucGluZygpXG4gICAgfSBjYXRjaCAoZGJFcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRGF0YWJhc2UgY29ubmVjdGlvbiBlcnJvcjpcIiwgZGJFcnJvcilcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGNvdW50OiBcIk4vQVwiIH0pXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IFtyb3dzXSA9IGF3YWl0IGNvbm5lY3Rpb24uZXhlY3V0ZTxDb3VudFJvd1tdPihcIlNFTEVDVCBDT1VOVCgqKSBhcyBjb3VudCBGUk9NIHJlZ2lzdHJhdGlvbnNcIilcblxuICAgICAgY29uc3QgY291bnQgPSByb3dzLmxlbmd0aCA+IDAgPyByb3dzWzBdLmNvdW50IDogMFxuXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBjb3VudCB9KVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoY29ubmVjdGlvbikge1xuICAgICAgICBhd2FpdCBjb25uZWN0aW9uLmVuZCgpXG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTdGF0cyBlcnJvcjpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgY291bnQ6IFwiTi9BXCIgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIm15c3FsIiwiZGJDb25maWciLCJob3N0IiwicHJvY2VzcyIsImVudiIsIkRCX0hPU1QiLCJ1c2VyIiwiREJfVVNFUiIsInBhc3N3b3JkIiwiREJfUEFTU1dPUkQiLCJkYXRhYmFzZSIsIkRCX05BTUUiLCJwb3J0IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJEQl9QT1JUIiwiR0VUIiwiY29ubmVjdGlvbiIsImNyZWF0ZUNvbm5lY3Rpb24iLCJwaW5nIiwiZGJFcnJvciIsImNvbnNvbGUiLCJlcnJvciIsImpzb24iLCJjb3VudCIsInJvd3MiLCJleGVjdXRlIiwibGVuZ3RoIiwiZW5kIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/stats/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$":
/*!****************************************************!*\
  !*** ./node_modules/mysql2/lib/ sync ^cardinal.*$ ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstats%2Froute&page=%2Fapi%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstats%2Froute.ts&appDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstats%2Froute&page=%2Fapi%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstats%2Froute.ts&appDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ibene_Desktop_Development_app_api_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/stats/route.ts */ \"(rsc)/./app/api/stats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/stats/route\",\n        pathname: \"/api/stats\",\n        filename: \"route\",\n        bundlePath: \"app/api/stats/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ibene\\\\Desktop\\\\Development\\\\app\\\\api\\\\stats\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ibene_Desktop_Development_app_api_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdGF0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc3RhdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzdGF0cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNpYmVuZSU1Q0Rlc2t0b3AlNUNEZXZlbG9wbWVudCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDaWJlbmUlNUNEZXNrdG9wJTVDRGV2ZWxvcG1lbnQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2lCO0FBQzlGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxpYmVuZVxcXFxEZXNrdG9wXFxcXERldmVsb3BtZW50XFxcXGFwcFxcXFxhcGlcXFxcc3RhdHNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3N0YXRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc3RhdHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3N0YXRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcaWJlbmVcXFxcRGVza3RvcFxcXFxEZXZlbG9wbWVudFxcXFxhcHBcXFxcYXBpXFxcXHN0YXRzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstats%2Froute&page=%2Fapi%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstats%2Froute.ts&appDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstats%2Froute&page=%2Fapi%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstats%2Froute.ts&appDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();