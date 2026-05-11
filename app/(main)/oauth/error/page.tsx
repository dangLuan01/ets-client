"use client";

import { useEffect } from "react";

export default function OAuthErrorPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const message = params.get("message");

    if (window.opener) {
      window.opener.postMessage(
        {
          type: "oauth-error",
          message,
        },
        window.location.origin
      );

      window.close();
    }
  }, []);

  return <div>Login failed...</div>;
}