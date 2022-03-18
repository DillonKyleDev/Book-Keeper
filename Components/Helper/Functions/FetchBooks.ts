import axios from 'axios';
import { Book } from '../../../store/books/bookSlice';

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
    let tempAuthors: [] = [];
    if(book.volumeInfo.authors) {
      tempAuthors = book.volumeInfo.authors.map((author: string) => {
        return author;
      });
    }
    let tempGenres: [] = [];
    if(book.volumeInfo.categories) {
       tempGenres = book.volumeInfo.categories.map((category: string) => {
        return category;
      }) 
    }
    const singleBook: Book = {
      title: book.volumeInfo.title ? book.volumeInfo.title : '',
      authors: tempAuthors,
      genres: tempGenres,
      description: book.volumeInfo.description ? book.volumeInfo.description : '',
      imageUrl: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : '',
      pagesRead: 0,
      pages: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 0,
      link: book.volumeInfo.previewLink ? book.volumeInfo.previewLink : '',
      rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0,
      finishOn: null,
      readingDays: [],
      goalFinalized: false,
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