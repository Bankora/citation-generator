export function generateTextFile(character, quote, author) {
  const formatTitle = (string) => string.trim().replace(' ', '-');

  const formatedCharacter = formatTitle(character);
  const formatedAuthor = formatTitle(author);

  return {
    title: `${formatedCharacter}-${formatedAuthor}.txt`.toLowerCase(),
    content: new Blob(
      [`${quote}\n${author}\n${character}`],
      { type: 'text/plain;charset=utf-8' },
    ),
  };
}
