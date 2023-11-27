import supabase, { supabaseUrl } from "./supabaseClient";

export async function createUpdateCabin(newCabin, id) {
  //create an image url
  const existedFile = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = existedFile
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("Cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cannot create a cabin");
  }

  if (existedFile) {
    return data;
  }

  //update image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", id);

    throw new Error("Image could not be added, therefore cabin removed");
  }

  return data;
}

export async function getCabins() {
  let { data: Cabins, error } = await supabase.from("Cabins").select("*");

  if (error) {
    throw new Error("Cannot get cabins data");
  }
  return Cabins;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Data could not be deleted");
  }

  return data;
}
