export const adjustImageUrl = (url: string, desiredSize: number) => {
  return url.replace(/=s\d+-c/, `=s${desiredSize}-c`);
};
