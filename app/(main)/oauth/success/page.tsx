"use client";

import { useEffect } from "react";

export default function OAuthSuccessPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (window.opener) {
      window.opener.postMessage(
        {
          type: "oauth-success",
          accessToken,
          refreshToken,
        },
        window.location.origin
      );

      window.close();
    }
  }, []);

  return <div>Login success...</div>;
}