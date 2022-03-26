export default function middleNameMatches(name: string, searchValue: string) {
  return (
    name.includes(" ") &&
    name
      .split(" ")
      .slice(1)
      .some((middleName) => middleName.startsWith(searchValue))
  );
}
