import { perPage } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabaseClient";

export async function createBooking(newBooking) {
  const { data: createdBooking, error } = await supabase
    .from("Bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return createdBooking;
}

export async function getBookings({ filter, sort, page }) {
  let query = supabase
    .from("Bookings")
    .select("*, Cabins(name), Guests(fullName, email)", { count: "exact" });

  if (filter !== null) {
    query = query.eq(filter.fieldName, filter.value);
  }

  if (sort.field) {
    query = query.order(sort.field, { ascending: sort.direction === "asc" });
  }

  if (page) {
    const start = (page - 1) * perPage;
    const end = start + perPage - 1;

    query = query.range(start, end);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Could not read all the bookings");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Cabins(*), Guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, totalPrice, extra  Price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    // .select('*')
    .select("*, Guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, Guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
