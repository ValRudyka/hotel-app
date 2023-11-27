import supabase from "./supabaseClient";

export async function getGuests() {
  const { data: guests, error } = await supabase.from("Guests").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return guests;
}
