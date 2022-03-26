//Redux
import { useReduxSelector } from '../../../store';

function FavGenre() {
  const books = useReduxSelector(state => state.books);
  let genreArray:string[] = [];

  if(books.length > 0) {
    books.forEach(book => {
      genreArray.push(book.genre);
    })

    return genreArray.sort((a,b) =>
          genreArray.filter(v => v===a).length
        - genreArray.filter(v => v===b).length
    ).pop();
  } else return "?"

}

export default FavGenre