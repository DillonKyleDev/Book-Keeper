//Redux
import { useReduxSelector } from '../../../store';

function FavGenre() {
  const books = useReduxSelector(state => state.books);
  let genreArray:string[] = [];

  if(books.length > 0) {
    books.forEach(book => {
      genreArray.push(book.genre);
    })
    let sortedArray:string[];
    sortedArray = genreArray.sort((a,b) =>
          genreArray.filter(v => v===a).length
        - genreArray.filter(v => v===b).length
    );
    if(sortedArray[0] !== '' && sortedArray[0] !== undefined) {
      return sortedArray[0]
    } else if(sortedArray[0] !== undefined) {
      return sortedArray[sortedArray.length - 1]
    }
    return "?"


  } else return "?"

}

export default FavGenre