"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie, USER_ID_COOKIE } from "@/lib/auth/token";
import "./styles.css";

const NavegadorPags = () => {
  const [profileHref, setProfileHref] = useState("/profile/me");

  useEffect(() => {
    const uid = getCookie(USER_ID_COOKIE);
    setProfileHref(uid ? `/profile/${uid}` : "/profile/me");
  }, []);

  return (
    <div className="NavigatorContainer">
      <Link className="NavigatorLink" href="/">
        Home
      </Link>
      <Link className="NavigatorLink" href={profileHref}>
        Perfil
      </Link>
      <Link
        className="NavigatorLink"
        href="/login"
        onClick={() => {
          deleteCookie("token");
          deleteCookie(USER_ID_COOKIE);
        }}
      >
        Desconectar
      </Link>
    </div>
  );
};

export default NavegadorPags;