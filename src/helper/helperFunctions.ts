export const closeDropdown = () => {
  const elem = document.activeElement as HTMLElement;
  elem?.blur();
};

export const adjustImageUrl = (url: string, desiredSize: number) => {
  return url.replace(/=s\d+-c/, `=s${desiredSize}-c`);
};

export const isPronounsEmpty = ([first, second]: [string, string]) => {
  return !first && !second;
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

export const ensureHttpsLink = (link: string): string => {
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    return `https://${link}`;
  }
  return link;
};
