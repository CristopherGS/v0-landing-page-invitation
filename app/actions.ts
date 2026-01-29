"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitRSVP(formData: FormData) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error("Missing Supabase environment variables");
        return { success: false, error: "Error de configuración en el servidor. Las variables de entorno no están configuradas." };
    }

    const supabase = await createClient();

    const attendance = formData.get("attendance") as string;

    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        guests: 1, // Reverted from guests_count
        attendance: attendance,
        dietary: "", // Reverted from dietary_restrictions
        transport: false, // Reverted from needs_transport
        songs: "", // Reverted from song_suggestions
        message: formData.get("message") as string,
    };

    const { error } = await supabase
        .from("wedding_guests")
        .insert([data]);

    if (error) {
        console.error("Error submitting RSVP:", error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
