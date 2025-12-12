export const validateStudentForm = ({ full_name, email, password, university, city }) => {
  const messages = [];
  const isEmail = (email) => /^([a-zA-Z0-9_.\-]+)@([a-zA-Z0-9_.\-]+)\.([a-zA-Z]{2,})$/.test(email);

  if (!full_name) messages.push("Full name cannot be blank.");
  if (!email) messages.push("Email cannot be blank.");
  else if (!isEmail(email)) messages.push("Email format is invalid.");
  if (!password) messages.push("Password cannot be blank.");
  else if (password.length < 6) messages.push("Password must be at least 6 characters.");
  if (!university) messages.push("University cannot be blank.");
  if (!city) messages.push("City must be selected.");

  return messages;
};

export const validateStudentProfileForm = (form) => {
  const errors = [];
  const isEmail = (email) => /^([a-zA-Z0-9_.\-]+)@([a-zA-Z0-9_.\-]+)\.([a-zA-Z]{2,})$/.test(email);

  if (!form.full_name?.trim()) errors.push("Full name cannot be empty.");
  if (!form.email?.trim()) errors.push("Email cannot be empty.");
  else if (!isEmail(form.email)) errors.push("Email format is invalid.");
  if (!form.phone?.trim()) errors.push("Phone number cannot be empty.");
  if (!form.location?.trim()) errors.push("Location cannot be empty.");
  if (!form.university?.trim()) errors.push("University cannot be empty.");
  if (!form.major?.trim()) errors.push("Major cannot be empty.");
  if (!form.year_of_study?.trim()) errors.push("Year of study cannot be empty.");
  if (!form.bio?.trim()) errors.push("Bio cannot be empty.");

  return errors;
};
export function validateEmployerForm({ full_name, email, password, company, city }) {
  const errors = [];

  if (!full_name?.trim() && full_name !== "dummy") errors.push("Full Name is required.");
  if (!email?.trim()) errors.push("Email is required.");
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.push("Email format is invalid.");
  if (!password?.trim()) errors.push("Password is required.");
  else if (password.length < 6) errors.push("Password must be at least 6 characters.");
  if (!company?.trim() && company !== "dummy") errors.push("Company/Organization is required.");
  if (!city?.trim() && city !== "dummy") errors.push("City is required.");

  return errors;
}


export function validateEmployerProfileForm({ full_name, email, company, city }) {
  const errors = [];

  if (!full_name.trim()) errors.push("Full Name is required.");
  if (!email.trim()) errors.push("Email is required.");
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.push("Email format is invalid.");
  if (!company.trim()) errors.push("Company is required.");
  if (!city.trim()) errors.push("City is required.");

  return errors;
};

