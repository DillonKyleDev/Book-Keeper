import axios from 'axios';
import { Book, emptyBook } from '../../../store/books/bookSlice';

export type ISBN = {
  path: string;
  isbn: string;
}

export type Author = {
  path: string;
  author: string;
}

export type Title = {
  path: string;
  title: string;
}

export type TitleAuthor = {
  path: string;
  title: string;
  author: string;
}

const mapData = (data: []) => {
  const bookData: Book[] = data.map((book: any) => {
    const singleBook: Book = {
      ...emptyBook,
      title: book.volumeInfo.title ? book.volumeInfo.title : '',
      author: book.volumeInfo.authors[0],
      genre: book.volumeInfo.categories[0],
      description: book.volumeInfo.description ? book.volumeInfo.description : '',
      imageUrl: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : '',
      pages: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 0,
      link: book.volumeInfo.previewLink ? book.volumeInfo.previewLink : '',
      rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0,
    }
    return(singleBook)
  })
  return(bookData);
}

export const FetchIsbn = async ({isbnData}: {isbnData: ISBN}) => {
  if(isbnData !== undefined) {
    return await axios.post(`https://book-keeper-server.herokuapp.com/${isbnData.path}`, {
      "isbn": `${isbnData.isbn}`
    })
    .then(response => {
      if(response.data.Response) {
        return response.data.Response;
      }
      if(response.data && response.data.length > 0) {
        return mapData(response.data);
      }
    })
    .catch(err => {console.log(err)})
  }
}

export const FetchAuthor = async ({authorData}: {authorData: Author}) => {
  if(authorData !== undefined) {
    return await axios.post(`https://book-keeper-server.herokuapp.com/${authorData.path}`, {
      "author": `${authorData.author}`
    })
    .then(response => {
      if(response.data.Response) {
        return(response.data.Response);
      }
      if(response.data && response.data.length > 0) {
        return mapData(response.data);
      }
    })
    .catch(err => {console.log(err)})
  }
}

export const FetchTitle = async ({titleData}: {titleData: Title}) => {
  if(titleData !== undefined) {
    return await axios.post(`https://book-keeper-server.herokuapp.com/${titleData.path}`, {
      "title": `${titleData.title}`
    })
    .then(response => {
      if(response.data.Response) {
        return(response.data.Response);
      }
      if(response.data && response.data.length > 0) {
        return mapData(response.data);
      }
    })
    .catch(err => {console.log(err)})
  }
}

export const FetchTitleAuthor = async ({titleAuthorData}: {titleAuthorData: TitleAuthor}) => {
  if(titleAuthorData !== undefined) {
    return await axios.post(`https://book-keeper-server.herokuapp.com/${titleAuthorData.path}`, {
      "title": `${titleAuthorData.title}`,
      "author": `${titleAuthorData.author}`
    })
    .then(response => {
      if(response.data.Response) {
        return(response.data.Response);
      }
      if(response.data && response.data.length > 0) {
        return mapData(response.data);
      }
    })
    .catch(err => console.log(err))
  }
}