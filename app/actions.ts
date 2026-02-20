"use server";

import { addRSVP } from "@/lib/rsvp-store";

export async function submitRSVP(formData: FormData) {
  const data = {
    name: (formData.get("name") as string)?.trim(),
    phone: (formData.get("phone") as string)?.trim(),
    attendance: formData.get("attendance") as string,
    family: formData.get("family") as string,
    message: ((formData.get("message") as string) || "").trim(),
  };

  if (!data.name || !data.phone || !data.attendance || !data.family) {
    return { success: false, error: "Faltan campos obligatorios." };
  }

  try {
    await addRSVP(data);
    return { success: true };
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return { success: false, error: "No se pudo guardar la confirmacion." };
  }
}
