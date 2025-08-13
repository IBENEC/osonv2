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
exports.id = "app/api/register/route";
exports.ids = ["app/api/register/route"];
exports.modules = {

/***/ "(rsc)/./app/api/register/route.ts":
/*!***********************************!*\
  !*** ./app/api/register/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nodemailer */ \"(rsc)/./node_modules/nodemailer/lib/nodemailer.js\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n// MySQL config\nconst dbConfig = {\n    host: process.env.DB_HOST || \"localhost\",\n    user: process.env.DB_USER || \"root\",\n    password: process.env.DB_PASSWORD || \"\",\n    database: process.env.DB_NAME || \"oson_dev\",\n    port: Number.parseInt(process.env.DB_PORT || \"3306\")\n};\n// SMTP Transport with Resend\nconst transporter = nodemailer__WEBPACK_IMPORTED_MODULE_3__.createTransport({\n    host: \"smtp.resend.com\",\n    port: 587,\n    secure: false,\n    auth: {\n        user: \"resend\",\n        pass: process.env.RESEND_API_KEY\n    }\n});\n// Regisztráció POST handler\nasync function POST(request) {\n    try {\n        const { email, password } = await request.json();\n        if (!email || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Email and password are required\"\n            }, {\n                status: 400\n            });\n        }\n        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n        if (!emailRegex.test(email)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid email format\"\n            }, {\n                status: 400\n            });\n        }\n        if (password.length < 6) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Password must be at least 6 characters long\"\n            }, {\n                status: 400\n            });\n        }\n        const connection = await mysql2_promise__WEBPACK_IMPORTED_MODULE_1__.createConnection(dbConfig);\n        const [existing] = await connection.execute(\"SELECT id FROM registrations WHERE email = ?\", [\n            email\n        ]);\n        if (existing.length > 0) {\n            await connection.end();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"This email address is already registered\"\n            }, {\n                status: 409\n            });\n        }\n        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hash(password, 12);\n        const confirmationToken = crypto__WEBPACK_IMPORTED_MODULE_4___default().randomBytes(32).toString(\"hex\");\n        // FIX: fix domain https://oson.dev\n        const confirmUrl = `https://oson.dev/confirm?token=${confirmationToken}`;\n        await connection.execute(`INSERT INTO registrations (email, password_hash, confirmation_token, confirmed, created_at)\n       VALUES (?, ?, ?, 0, NOW())`, [\n            email,\n            hashedPassword,\n            confirmationToken\n        ]);\n        await connection.end();\n        // Email küldés\n        const mailOptions = {\n            from: \"noreply@oson.dev\",\n            to: email,\n            subject: \"Email Confirmation – OSON AI\",\n            html: `\n        <div style=\"background-color: #0f0f0f; color: #e5e5e5; font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; padding: 48px 24px; text-align: center;\">\n          <div style=\"max-width: 480px; margin: auto; background-color: #1a1a1a; padding: 40px 32px; border-radius: 16px; box-shadow: 0 0 20px rgba(0,0,0,0.5);\">\n            <h1 style=\"color: #29c7b4; font-size: 32px; margin-bottom: 16px;\">OSON AI</h1>\n            <p style=\"font-size: 16px; color: #d4d4d4; line-height: 1.6;\">\n              Thank you for registering!<br>\n              Please confirm your email by clicking the button below:\n            </p>\n            <a href=\"${confirmUrl}\" style=\"\n              display: inline-block;\n              margin-top: 28px;\n              padding: 14px 32px;\n              background-color: #29c7b4;\n              color: white;\n              text-decoration: none;\n              border-radius: 10px;\n              font-size: 16px;\n              font-weight: 600;\n              transition: background-color 0.3s ease;\n            \" target=\"_blank\" rel=\"noopener noreferrer\">\n              Confirm Email Address\n            </a>\n            <p style=\"font-size: 13px; color: #888888; margin-top: 36px; line-height: 1.6;\">\n              If you did not register at <strong>oson.dev</strong>, please disregard this message.\n            </p>\n            <p style=\"font-size: 12px; color: #444444; margin-top: 32px;\">\n              &copy; ${new Date().getFullYear()} OSON AI. All rights reserved.\n            </p>\n          </div>\n        </div>\n      `\n        };\n        try {\n            await transporter.sendMail(mailOptions);\n        } catch (err) {\n            console.error(\"Email sending error:\", err);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to send confirmation email\"\n            }, {\n                status: 500\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Registration successful! Please check your email to confirm.\"\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Registration error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Server error occurred\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Email megerősítés GET handler\nasync function GET(request) {\n    try {\n        const token = request.nextUrl.searchParams.get(\"token\");\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Token hiányzik\"\n            }, {\n                status: 400\n            });\n        }\n        const connection = await mysql2_promise__WEBPACK_IMPORTED_MODULE_1__.createConnection(dbConfig);\n        // Lekérdezzük a tokenhez tartozó usert\n        const [rows] = await connection.execute(\"SELECT id, email, confirmed FROM registrations WHERE confirmation_token = ?\", [\n            token\n        ]);\n        if (rows.length === 0) {\n            await connection.end();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Érvénytelen vagy lejárt token\"\n            }, {\n                status: 400\n            });\n        }\n        const user = rows[0];\n        if (user.confirmed === 1) {\n            await connection.end();\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Az email már megerősítésre került\"\n            }, {\n                status: 200\n            });\n        }\n        // Frissítjük a megerősítés státuszát\n        await connection.execute(\"UPDATE registrations SET confirmed = 1, confirmed_at = NOW() WHERE id = ?\", [\n            user.id\n        ]);\n        await connection.end();\n        // Discord webhook értesítés csak megerősítéskor\n        const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;\n        if (DISCORD_WEBHOOK_URL) {\n            await fetch(DISCORD_WEBHOOK_URL, {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    content: `📢 Új hitelesített felhasználó: ${user.email}`\n                })\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Email sikeresen megerősítve!\"\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Confirm error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Szerver hiba történt\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlZ2lzdGVyL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTZEO0FBQzFCO0FBQ0w7QUFDTTtBQUNSO0FBRTVCLGVBQWU7QUFDZixNQUFNSyxXQUFXO0lBQ2ZDLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQ0MsT0FBTyxJQUFJO0lBQzdCQyxNQUFNSCxRQUFRQyxHQUFHLENBQUNHLE9BQU8sSUFBSTtJQUM3QkMsVUFBVUwsUUFBUUMsR0FBRyxDQUFDSyxXQUFXLElBQUk7SUFDckNDLFVBQVVQLFFBQVFDLEdBQUcsQ0FBQ08sT0FBTyxJQUFJO0lBQ2pDQyxNQUFNQyxPQUFPQyxRQUFRLENBQUNYLFFBQVFDLEdBQUcsQ0FBQ1csT0FBTyxJQUFJO0FBQy9DO0FBRUEsNkJBQTZCO0FBQzdCLE1BQU1DLGNBQWNqQix1REFBMEIsQ0FBQztJQUM3Q0csTUFBTTtJQUNOVSxNQUFNO0lBQ05NLFFBQVE7SUFDUkMsTUFBTTtRQUNKYixNQUFNO1FBQ05jLE1BQU1qQixRQUFRQyxHQUFHLENBQUNpQixjQUFjO0lBQ2xDO0FBQ0Y7QUFFQSw0QkFBNEI7QUFDckIsZUFBZUMsS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU0sRUFBRUMsS0FBSyxFQUFFaEIsUUFBUSxFQUFFLEdBQUcsTUFBTWUsUUFBUUUsSUFBSTtRQUU5QyxJQUFJLENBQUNELFNBQVMsQ0FBQ2hCLFVBQVU7WUFDdkIsT0FBT1oscURBQVlBLENBQUM2QixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBa0MsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3ZGO1FBRUEsTUFBTUMsYUFBYTtRQUNuQixJQUFJLENBQUNBLFdBQVdDLElBQUksQ0FBQ0wsUUFBUTtZQUMzQixPQUFPNUIscURBQVlBLENBQUM2QixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBdUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzVFO1FBRUEsSUFBSW5CLFNBQVNzQixNQUFNLEdBQUcsR0FBRztZQUN2QixPQUFPbEMscURBQVlBLENBQUM2QixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBOEMsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ25HO1FBRUEsTUFBTUksYUFBYSxNQUFNbEMsNERBQXNCLENBQUNJO1FBRWhELE1BQU0sQ0FBQ2dDLFNBQVMsR0FBRyxNQUFNRixXQUFXRyxPQUFPLENBQ3pDLGdEQUNBO1lBQUNWO1NBQU07UUFFVCxJQUFJLFNBQW9CTSxNQUFNLEdBQUcsR0FBRztZQUNsQyxNQUFNQyxXQUFXSSxHQUFHO1lBQ3BCLE9BQU92QyxxREFBWUEsQ0FBQzZCLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUEyQyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDaEc7UUFFQSxNQUFNUyxpQkFBaUIsTUFBTXRDLHFEQUFXLENBQUNVLFVBQVU7UUFDbkQsTUFBTThCLG9CQUFvQnRDLHlEQUFrQixDQUFDLElBQUl3QyxRQUFRLENBQUM7UUFDMUQsbUNBQW1DO1FBQ25DLE1BQU1DLGFBQWEsQ0FBQywrQkFBK0IsRUFBRUgsbUJBQW1CO1FBRXhFLE1BQU1QLFdBQVdHLE9BQU8sQ0FDdEIsQ0FBQztpQ0FDMEIsQ0FBQyxFQUM1QjtZQUFDVjtZQUFPWTtZQUFnQkU7U0FBa0I7UUFHNUMsTUFBTVAsV0FBV0ksR0FBRztRQUVwQixlQUFlO1FBQ2YsTUFBTU8sY0FBYztZQUNsQkMsTUFBTTtZQUNOQyxJQUFJcEI7WUFDSnFCLFNBQVM7WUFDVEMsTUFBTSxDQUFDOzs7Ozs7OztxQkFRUSxFQUFFTCxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBa0JiLEVBQUUsSUFBSU0sT0FBT0MsV0FBVyxHQUFHOzs7O01BSTFDLENBQUM7UUFDSDtRQUVBLElBQUk7WUFDRixNQUFNaEMsWUFBWWlDLFFBQVEsQ0FBQ1A7UUFDN0IsRUFBRSxPQUFPUSxLQUFVO1lBQ2pCQyxRQUFRekIsS0FBSyxDQUFDLHdCQUF3QndCO1lBQ3RDLE9BQU90RCxxREFBWUEsQ0FBQzZCLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFvQyxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDekY7UUFFQSxPQUFPL0IscURBQVlBLENBQUM2QixJQUFJLENBQUM7WUFBRTJCLFNBQVM7UUFBK0QsR0FBRztZQUFFekIsUUFBUTtRQUFJO0lBQ3RILEVBQUUsT0FBT0QsT0FBWTtRQUNuQnlCLFFBQVF6QixLQUFLLENBQUMsdUJBQXVCQTtRQUNyQyxPQUFPOUIscURBQVlBLENBQUM2QixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtBQUNGO0FBRUEsZ0NBQWdDO0FBQ3pCLGVBQWUwQixJQUFJOUIsT0FBb0I7SUFDNUMsSUFBSTtRQUNGLE1BQU0rQixRQUFRL0IsUUFBUWdDLE9BQU8sQ0FBQ0MsWUFBWSxDQUFDQyxHQUFHLENBQUM7UUFDL0MsSUFBSSxDQUFDSCxPQUFPO1lBQ1YsT0FBTzFELHFEQUFZQSxDQUFDNkIsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWlCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN0RTtRQUVBLE1BQU1JLGFBQWEsTUFBTWxDLDREQUFzQixDQUFDSTtRQUVoRCx1Q0FBdUM7UUFDdkMsTUFBTSxDQUFDeUQsS0FBSyxHQUFHLE1BQU0zQixXQUFXRyxPQUFPLENBQ3JDLCtFQUNBO1lBQUNvQjtTQUFNO1FBR1QsSUFBSSxLQUFnQnhCLE1BQU0sS0FBSyxHQUFHO1lBQ2hDLE1BQU1DLFdBQVdJLEdBQUc7WUFDcEIsT0FBT3ZDLHFEQUFZQSxDQUFDNkIsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWdDLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNyRjtRQUVBLE1BQU1yQixPQUFPLElBQWEsQ0FBQyxFQUFFO1FBRTdCLElBQUlBLEtBQUtxRCxTQUFTLEtBQUssR0FBRztZQUN4QixNQUFNNUIsV0FBV0ksR0FBRztZQUNwQixPQUFPdkMscURBQVlBLENBQUM2QixJQUFJLENBQUM7Z0JBQUUyQixTQUFTO1lBQW9DLEdBQUc7Z0JBQUV6QixRQUFRO1lBQUk7UUFDM0Y7UUFFQSxxQ0FBcUM7UUFDckMsTUFBTUksV0FBV0csT0FBTyxDQUN0Qiw2RUFDQTtZQUFDNUIsS0FBS3NELEVBQUU7U0FBQztRQUdYLE1BQU03QixXQUFXSSxHQUFHO1FBRXBCLGdEQUFnRDtRQUNoRCxNQUFNMEIsc0JBQXNCMUQsUUFBUUMsR0FBRyxDQUFDeUQsbUJBQW1CO1FBQzNELElBQUlBLHFCQUFxQjtZQUN2QixNQUFNQyxNQUFNRCxxQkFBcUI7Z0JBQy9CRSxRQUFRO2dCQUNSQyxTQUFTO29CQUFFLGdCQUFnQjtnQkFBbUI7Z0JBQzlDQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7b0JBQ25CQyxTQUFTLENBQUMsZ0NBQWdDLEVBQUU5RCxLQUFLa0IsS0FBSyxFQUFFO2dCQUMxRDtZQUNGO1FBQ0Y7UUFFQSxPQUFPNUIscURBQVlBLENBQUM2QixJQUFJLENBQUM7WUFBRTJCLFNBQVM7UUFBK0IsR0FBRztZQUFFekIsUUFBUTtRQUFJO0lBRXRGLEVBQUUsT0FBT0QsT0FBTztRQUNkeUIsUUFBUXpCLEtBQUssQ0FBQyxrQkFBa0JBO1FBQ2hDLE9BQU85QixxREFBWUEsQ0FBQzZCLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXVCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzVFO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcaWJlbmVcXERlc2t0b3BcXERldmVsb3BtZW50XFxhcHBcXGFwaVxccmVnaXN0ZXJcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IG15c3FsIGZyb20gXCJteXNxbDIvcHJvbWlzZVwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcbmltcG9ydCBub2RlbWFpbGVyIGZyb20gXCJub2RlbWFpbGVyXCI7XG5pbXBvcnQgY3J5cHRvIGZyb20gXCJjcnlwdG9cIjtcblxuLy8gTXlTUUwgY29uZmlnXG5jb25zdCBkYkNvbmZpZyA9IHtcbiAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCB8fCBcImxvY2FsaG9zdFwiLFxuICB1c2VyOiBwcm9jZXNzLmVudi5EQl9VU0VSIHx8IFwicm9vdFwiLFxuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQgfHwgXCJcIixcbiAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRCX05BTUUgfHwgXCJvc29uX2RldlwiLFxuICBwb3J0OiBOdW1iZXIucGFyc2VJbnQocHJvY2Vzcy5lbnYuREJfUE9SVCB8fCBcIjMzMDZcIiksXG59O1xuXG4vLyBTTVRQIFRyYW5zcG9ydCB3aXRoIFJlc2VuZFxuY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XG4gIGhvc3Q6IFwic210cC5yZXNlbmQuY29tXCIsXG4gIHBvcnQ6IDU4NyxcbiAgc2VjdXJlOiBmYWxzZSxcbiAgYXV0aDoge1xuICAgIHVzZXI6IFwicmVzZW5kXCIsXG4gICAgcGFzczogcHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVksXG4gIH0sXG59KTtcblxuLy8gUmVnaXN6dHLDoWNpw7MgUE9TVCBoYW5kbGVyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcblxuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJFbWFpbCBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XG4gICAgaWYgKCFlbWFpbFJlZ2V4LnRlc3QoZW1haWwpKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIGVtYWlsIGZvcm1hdFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDYpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzIGxvbmdcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBteXNxbC5jcmVhdGVDb25uZWN0aW9uKGRiQ29uZmlnKTtcblxuICAgIGNvbnN0IFtleGlzdGluZ10gPSBhd2FpdCBjb25uZWN0aW9uLmV4ZWN1dGUoXG4gICAgICBcIlNFTEVDVCBpZCBGUk9NIHJlZ2lzdHJhdGlvbnMgV0hFUkUgZW1haWwgPSA/XCIsXG4gICAgICBbZW1haWxdXG4gICAgKTtcbiAgICBpZiAoKGV4aXN0aW5nIGFzIGFueVtdKS5sZW5ndGggPiAwKSB7XG4gICAgICBhd2FpdCBjb25uZWN0aW9uLmVuZCgpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVGhpcyBlbWFpbCBhZGRyZXNzIGlzIGFscmVhZHkgcmVnaXN0ZXJlZFwiIH0sIHsgc3RhdHVzOiA0MDkgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTIpO1xuICAgIGNvbnN0IGNvbmZpcm1hdGlvblRva2VuID0gY3J5cHRvLnJhbmRvbUJ5dGVzKDMyKS50b1N0cmluZyhcImhleFwiKTtcbiAgICAvLyBGSVg6IGZpeCBkb21haW4gaHR0cHM6Ly9vc29uLmRldlxuICAgIGNvbnN0IGNvbmZpcm1VcmwgPSBgaHR0cHM6Ly9vc29uLmRldi9jb25maXJtP3Rva2VuPSR7Y29uZmlybWF0aW9uVG9rZW59YDtcblxuICAgIGF3YWl0IGNvbm5lY3Rpb24uZXhlY3V0ZShcbiAgICAgIGBJTlNFUlQgSU5UTyByZWdpc3RyYXRpb25zIChlbWFpbCwgcGFzc3dvcmRfaGFzaCwgY29uZmlybWF0aW9uX3Rva2VuLCBjb25maXJtZWQsIGNyZWF0ZWRfYXQpXG4gICAgICAgVkFMVUVTICg/LCA/LCA/LCAwLCBOT1coKSlgLFxuICAgICAgW2VtYWlsLCBoYXNoZWRQYXNzd29yZCwgY29uZmlybWF0aW9uVG9rZW5dXG4gICAgKTtcblxuICAgIGF3YWl0IGNvbm5lY3Rpb24uZW5kKCk7XG5cbiAgICAvLyBFbWFpbCBrw7xsZMOpc1xuICAgIGNvbnN0IG1haWxPcHRpb25zID0ge1xuICAgICAgZnJvbTogXCJub3JlcGx5QG9zb24uZGV2XCIsXG4gICAgICB0bzogZW1haWwsXG4gICAgICBzdWJqZWN0OiBcIkVtYWlsIENvbmZpcm1hdGlvbiDigJMgT1NPTiBBSVwiLFxuICAgICAgaHRtbDogYFxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzBmMGYwZjsgY29sb3I6ICNlNWU1ZTU7IGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCAnSGVsdmV0aWNhIE5ldWUnLCBzYW5zLXNlcmlmOyBwYWRkaW5nOiA0OHB4IDI0cHg7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwibWF4LXdpZHRoOiA0ODBweDsgbWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExYTFhOyBwYWRkaW5nOiA0MHB4IDMycHg7IGJvcmRlci1yYWRpdXM6IDE2cHg7IGJveC1zaGFkb3c6IDAgMCAyMHB4IHJnYmEoMCwwLDAsMC41KTtcIj5cbiAgICAgICAgICAgIDxoMSBzdHlsZT1cImNvbG9yOiAjMjljN2I0OyBmb250LXNpemU6IDMycHg7IG1hcmdpbi1ib3R0b206IDE2cHg7XCI+T1NPTiBBSTwvaDE+XG4gICAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDsgY29sb3I6ICNkNGQ0ZDQ7IGxpbmUtaGVpZ2h0OiAxLjY7XCI+XG4gICAgICAgICAgICAgIFRoYW5rIHlvdSBmb3IgcmVnaXN0ZXJpbmchPGJyPlxuICAgICAgICAgICAgICBQbGVhc2UgY29uZmlybSB5b3VyIGVtYWlsIGJ5IGNsaWNraW5nIHRoZSBidXR0b24gYmVsb3c6XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtjb25maXJtVXJsfVwiIHN0eWxlPVwiXG4gICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMjhweDtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTRweCAzMnB4O1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjljN2I0O1xuICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcbiAgICAgICAgICAgIFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj5cbiAgICAgICAgICAgICAgQ29uZmlybSBFbWFpbCBBZGRyZXNzXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZTogMTNweDsgY29sb3I6ICM4ODg4ODg7IG1hcmdpbi10b3A6IDM2cHg7IGxpbmUtaGVpZ2h0OiAxLjY7XCI+XG4gICAgICAgICAgICAgIElmIHlvdSBkaWQgbm90IHJlZ2lzdGVyIGF0IDxzdHJvbmc+b3Nvbi5kZXY8L3N0cm9uZz4sIHBsZWFzZSBkaXNyZWdhcmQgdGhpcyBtZXNzYWdlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPHAgc3R5bGU9XCJmb250LXNpemU6IDEycHg7IGNvbG9yOiAjNDQ0NDQ0OyBtYXJnaW4tdG9wOiAzMnB4O1wiPlxuICAgICAgICAgICAgICAmY29weTsgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IE9TT04gQUkuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYCxcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVtYWlsIHNlbmRpbmcgZXJyb3I6XCIsIGVycik7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gc2VuZCBjb25maXJtYXRpb24gZW1haWxcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwhIFBsZWFzZSBjaGVjayB5b3VyIGVtYWlsIHRvIGNvbmZpcm0uXCIgfSwgeyBzdGF0dXM6IDIwMSB9KTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJSZWdpc3RyYXRpb24gZXJyb3I6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJTZXJ2ZXIgZXJyb3Igb2NjdXJyZWRcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbi8vIEVtYWlsIG1lZ2VyxZFzw610w6lzIEdFVCBoYW5kbGVyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW4gPSByZXF1ZXN0Lm5leHRVcmwuc2VhcmNoUGFyYW1zLmdldChcInRva2VuXCIpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlRva2VuIGhpw6FueXppa1wiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY29ubmVjdGlvbiA9IGF3YWl0IG15c3FsLmNyZWF0ZUNvbm5lY3Rpb24oZGJDb25maWcpO1xuXG4gICAgLy8gTGVrw6lyZGV6esO8ayBhIHRva2VuaGV6IHRhcnRvesOzIHVzZXJ0XG4gICAgY29uc3QgW3Jvd3NdID0gYXdhaXQgY29ubmVjdGlvbi5leGVjdXRlKFxuICAgICAgXCJTRUxFQ1QgaWQsIGVtYWlsLCBjb25maXJtZWQgRlJPTSByZWdpc3RyYXRpb25zIFdIRVJFIGNvbmZpcm1hdGlvbl90b2tlbiA9ID9cIixcbiAgICAgIFt0b2tlbl1cbiAgICApO1xuXG4gICAgaWYgKChyb3dzIGFzIGFueVtdKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGF3YWl0IGNvbm5lY3Rpb24uZW5kKCk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLDiXJ2w6lueXRlbGVuIHZhZ3kgbGVqw6FydCB0b2tlblwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IChyb3dzIGFzIGFueSlbMF07XG5cbiAgICBpZiAodXNlci5jb25maXJtZWQgPT09IDEpIHtcbiAgICAgIGF3YWl0IGNvbm5lY3Rpb24uZW5kKCk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkF6IGVtYWlsIG3DoXIgbWVnZXLFkXPDrXTDqXNyZSBrZXLDvGx0XCIgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgICB9XG5cbiAgICAvLyBGcmlzc8OtdGrDvGsgYSBtZWdlcsWRc8OtdMOpcyBzdMOhdHVzesOhdFxuICAgIGF3YWl0IGNvbm5lY3Rpb24uZXhlY3V0ZShcbiAgICAgIFwiVVBEQVRFIHJlZ2lzdHJhdGlvbnMgU0VUIGNvbmZpcm1lZCA9IDEsIGNvbmZpcm1lZF9hdCA9IE5PVygpIFdIRVJFIGlkID0gP1wiLFxuICAgICAgW3VzZXIuaWRdXG4gICAgKTtcblxuICAgIGF3YWl0IGNvbm5lY3Rpb24uZW5kKCk7XG5cbiAgICAvLyBEaXNjb3JkIHdlYmhvb2sgw6lydGVzw610w6lzIGNzYWsgbWVnZXLFkXPDrXTDqXNrb3JcbiAgICBjb25zdCBESVNDT1JEX1dFQkhPT0tfVVJMID0gcHJvY2Vzcy5lbnYuRElTQ09SRF9XRUJIT09LX1VSTDtcbiAgICBpZiAoRElTQ09SRF9XRUJIT09LX1VSTCkge1xuICAgICAgYXdhaXQgZmV0Y2goRElTQ09SRF9XRUJIT09LX1VSTCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjb250ZW50OiBg8J+ToiDDmmogaGl0ZWxlc8OtdGV0dCBmZWxoYXN6bsOhbMOzOiAke3VzZXIuZW1haWx9YCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkVtYWlsIHNpa2VyZXNlbiBtZWdlcsWRc8OtdHZlIVwiIH0sIHsgc3RhdHVzOiAyMDAgfSk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiQ29uZmlybSBlcnJvcjpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlN6ZXJ2ZXIgaGliYSB0w7ZydMOpbnRcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibXlzcWwiLCJiY3J5cHQiLCJub2RlbWFpbGVyIiwiY3J5cHRvIiwiZGJDb25maWciLCJob3N0IiwicHJvY2VzcyIsImVudiIsIkRCX0hPU1QiLCJ1c2VyIiwiREJfVVNFUiIsInBhc3N3b3JkIiwiREJfUEFTU1dPUkQiLCJkYXRhYmFzZSIsIkRCX05BTUUiLCJwb3J0IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJEQl9QT1JUIiwidHJhbnNwb3J0ZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZWN1cmUiLCJhdXRoIiwicGFzcyIsIlJFU0VORF9BUElfS0VZIiwiUE9TVCIsInJlcXVlc3QiLCJlbWFpbCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImVtYWlsUmVnZXgiLCJ0ZXN0IiwibGVuZ3RoIiwiY29ubmVjdGlvbiIsImNyZWF0ZUNvbm5lY3Rpb24iLCJleGlzdGluZyIsImV4ZWN1dGUiLCJlbmQiLCJoYXNoZWRQYXNzd29yZCIsImhhc2giLCJjb25maXJtYXRpb25Ub2tlbiIsInJhbmRvbUJ5dGVzIiwidG9TdHJpbmciLCJjb25maXJtVXJsIiwibWFpbE9wdGlvbnMiLCJmcm9tIiwidG8iLCJzdWJqZWN0IiwiaHRtbCIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInNlbmRNYWlsIiwiZXJyIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJHRVQiLCJ0b2tlbiIsIm5leHRVcmwiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJyb3dzIiwiY29uZmlybWVkIiwiaWQiLCJESVNDT1JEX1dFQkhPT0tfVVJMIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/register/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fregister%2Froute&page=%2Fapi%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fregister%2Froute&page=%2Fapi%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ibene_Desktop_Development_app_api_register_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/register/route.ts */ \"(rsc)/./app/api/register/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/register/route\",\n        pathname: \"/api/register\",\n        filename: \"route\",\n        bundlePath: \"app/api/register/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ibene\\\\Desktop\\\\Development\\\\app\\\\api\\\\register\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ibene_Desktop_Development_app_api_register_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZWdpc3RlciUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcmVnaXN0ZXIlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZyZWdpc3RlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNpYmVuZSU1Q0Rlc2t0b3AlNUNEZXZlbG9wbWVudCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDaWJlbmUlNUNEZXNrdG9wJTVDRGV2ZWxvcG1lbnQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ29CO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxpYmVuZVxcXFxEZXNrdG9wXFxcXERldmVsb3BtZW50XFxcXGFwcFxcXFxhcGlcXFxccmVnaXN0ZXJcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3JlZ2lzdGVyL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcmVnaXN0ZXJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3JlZ2lzdGVyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcaWJlbmVcXFxcRGVza3RvcFxcXFxEZXZlbG9wbWVudFxcXFxhcHBcXFxcYXBpXFxcXHJlZ2lzdGVyXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fregister%2Froute&page=%2Fapi%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

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

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/aws-ssl-profiles","vendor-chunks/iconv-lite","vendor-chunks/long","vendor-chunks/lru-cache","vendor-chunks/denque","vendor-chunks/is-property","vendor-chunks/lru.min","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/named-placeholders","vendor-chunks/generate-function","vendor-chunks/safer-buffer","vendor-chunks/nodemailer","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fregister%2Froute&page=%2Fapi%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fregister%2Froute.ts&appDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cibene%5CDesktop%5CDevelopment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();