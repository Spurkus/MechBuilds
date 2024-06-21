export const adjustImageUrl = (url: string, desiredSize: number) => {
  return url.replace(/=s\d+-c/, `=s${desiredSize}-c`);
};

export const isPronounsEmpty = (pronouns: [string, string]) => {
  return pronouns.every((pronoun) => pronoun === "");
};

export const formatPronouns = (
  pronouns: [string, string] | null,
  includeParentheses: boolean = false,
) => {
  if (!pronouns || isPronounsEmpty(pronouns)) return "";
  const formattedPronouns = pronouns.join("/");
  return includeParentheses ? `(${formattedPronouns})` : formattedPronouns;
};

export const formatSocialLink = (link: string) => {
  return link.replace(/^(https?:\/\/)?(www\.)?/, "");
};
