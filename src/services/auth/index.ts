/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// REGISTER USER
export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    console.log({ data });

    if (data?.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// LOGIN USER
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (data?.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// GET ME
export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/get-me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// LOGOUT USER
export const logOutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

// GET CURRENT USER (DECODED)
export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    try {
      return jwtDecode(accessToken);
    } catch {
      return null;
    }
  }

  return null;
};

// REFRESH ACCESS TOKEN
export const getAccessToken = async () => {
  const cookieStore = await cookies();
  try {
    const refreshToken = cookieStore.get("refreshToken")?.value || "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/generate-access-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: refreshToken,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// CHANGE PASSWORD
export const changePassword = async (userData: FieldValues) => {
  try {
    const cookieStore = await cookies(); 
    const accessToken = cookieStore.get("accessToken")?.value || "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// FORGOT PASSWORD
export const forgetPassword = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// RESET PASSWORD
export const resetPassword = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
