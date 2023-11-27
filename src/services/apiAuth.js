import supabase, { supabaseUrl } from "./supabaseClient";

export async function signupUser({ fullName, email, password }) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (data) {
    throw new Error("Email exists");
  }

  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // sessionStorage.setItem("user", data.session);

  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ avatar, fullName, password }) {
  let updatedData;

  if (fullName) {
    updatedData = { data: { fullName } };
  }

  if (password) {
    updatedData = { password };
  }

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) {
    return data;
  }

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: fileError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (fileError) {
    throw new Error(fileError.message);
  }

  const { data: user, error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return user;
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://127.0.0.1:5173/reset",
  });

  if (error) {
    throw new Error(error.message);
  }
}
