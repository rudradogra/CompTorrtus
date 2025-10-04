/* eslint-disable prefer-rest-params */
// components/Clarity.tsx
"use client";

import { useEffect } from "react";

export default function Clarity() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (function (c, l, a, r, i) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        const t = l.createElement(r) as HTMLScriptElement;
        t.async = true;
        t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        }
      })(window, document, "clarity", "script", "ry79jzojw3");
    }
  }, []);

  return null;
}
