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

export function modifyTransaction(transaction: string) {
  if (transaction === "INCOME") {
    return "수입";
  } else if (transaction === "EXPENSE") {
    return "지출";
  } else if (transaction === "TRANSFER") {
    return "이체";
  }
  return;
}
