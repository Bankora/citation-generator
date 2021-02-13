/*
  {
    txt: "mentalion-jean.txt"
    jpg: "mentalion-jean.jpg"
  }
*/
function formatTitle(character, author, ext) {
  const trimTitle = (string) => string.trim().replace(' ', '-');

  const formatedCharacter = trimTitle(character);
  const formatedAuthor = trimTitle(author);

  return {
    title: `${formatedCharacter}-${formatedAuthor}.${ext}`.toLowerCase(),
  };
}

/*
generateTextFile (
  'mentalion',
  'je suis oui',
  'jean',
)
*/
export function generateTextFile(character, quote, author) {
  return {
    ...formatTitle(character, author, 'txt'),
    content: new Blob(
      [`${quote}\n${author}\n${character}`],
      { type: 'text/plain;charset=utf-8' },
    ),
  };
}

export function generateJpgFile(character, author, canvas) {
  return {
    ...formatTitle(character, author, 'jpg'),
    content: canvas.toDataURL(), // canvas to jpg
  };
}
