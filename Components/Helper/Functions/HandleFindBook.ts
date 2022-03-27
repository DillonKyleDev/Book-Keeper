import { Book } from '../../../store/books/bookSlice';
import { TitleAuthor, FetchTitleAuthor, FetchTitle, Title, FetchAuthor, Author } from './FetchBooks';

export const HandleFindBook = async ({title, author, setIsLoading, setSearchResults, setPlaceHolder}: {
  title: string;
  author: string;
  setIsLoading: (loading:boolean) => void;
  setSearchResults: (books:Book[]) => void;
  setPlaceHolder: (placeholder:string) => void;
}) => {
  //Author and title
  if(author !== '' && title !== '') {
    setIsLoading(true);
    const titleAuthorData:TitleAuthor = {
      path: 'AuthorAndTitle',
      author: author,
      title: title
    }
    await FetchTitleAuthor({titleAuthorData: titleAuthorData})
    .then((books:Book[]) => {
      setIsLoading(false);
      setSearchResults(books);
    })
    .catch(err => {
      setIsLoading(false);
      console.log(`Error: ${err}`);
    })
  } else

  //Just title
  if(author === '' && title !== '') {
    setIsLoading(true);
    const titleData:Title = {
      path: 'Title',
      title: title
    }
    await FetchTitle({titleData: titleData})
    .then(books => {
      setIsLoading(false);
      if(books !== undefined) {
        setSearchResults(books);
      }
    })
    .catch(err => {
      setIsLoading(false);
      console.log(`Error: ${err}`)
    })
  } else

  //Just author
  if(author !== '' && title === '') {
      setIsLoading(true);
      const authorData:Author = {
        path: 'Author',
        author: author
      }
      await FetchAuthor({authorData: authorData})
      .then(books => {
        setIsLoading(false);
        setSearchResults(books);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(`Error: ${err}`)
      })
  } else {
    setPlaceHolder('Must enter title and/or author');
  }
}
