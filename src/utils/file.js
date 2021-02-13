/*
generateTextFile (
  'mentalion',
  'je suis oui',
  'jean',
)

// title: 'mentalion-jean.txt
*/
export function generateTextFile(character, quote, author) {
  const formatTitle = (string) => string.trim().replace(' ', '-');

  const formatedCharacter = formatTitle(character);
  const formatedAuthor = formatTitle(author);

  return {
    titleTxt: `${formatedCharacter}-${formatedAuthor}.txt`.toLowerCase(),
    titleJpg: `${formatedCharacter}-${formatedAuthor}.jpg`.toLowerCase(),
    content: new Blob(
      [`${quote}\n${author}\n${character}`],
      { type: 'text/plain;charset=utf-8' },
    ),
  };
}
