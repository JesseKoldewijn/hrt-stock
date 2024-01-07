export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const unslugify = (text: string) => {
  return text.replace(/-/g, " ");
};
