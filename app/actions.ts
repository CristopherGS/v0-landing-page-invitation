"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitRSVP(formData: FormData) {
    const supabase = await createClient();

    const attendance = formData.get("attendance") as string;

    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        guests_count: 1, // Defaulting to 1 for individual registration
        attendance: attendance,
        dietary_restrictions: "", // Defaulting empty
        needs_transport: false, // Defaulting to false
        song_suggestions: "", // Defaulting empty
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
