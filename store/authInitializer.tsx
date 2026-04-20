"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { hydrateAuthFromStorage } from "./features/auth/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(hydrateAuthFromStorage());
  }, [dispatch]);

  return null;
}