export function buildApiUrl(path: string): string {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXTAUTH_URL
      : process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  return `${baseUrl}${path}`;
}

export function isMatch(pathname: string, urls: string[]): boolean {
  return urls.some((url) => {
    const pattern = new RegExp(`^${url.replace(/\*$/, ".*")}$`);
    return pattern.test(pathname);
  });
}
