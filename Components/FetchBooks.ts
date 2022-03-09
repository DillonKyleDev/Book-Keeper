import axios from 'axios';

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
  return data.map((book: any) => {
    const tempAuthors: [] = book.volumeInfo.authors.map((author: string) => {
      return author;
    });
    const tempGenres: [] = book.volumeInfo.categories.map((category: string) => {
      return category;
    }) 
    return({
      title: book.volumeInfo.title,
      authors: tempAuthors,
      genres: tempGenres,
      description: book.volumeInfo.description,
      imageUrl: book.volumeInfo.imageLinks.thumbnail,
      pages: book.volumeInfo.pageCount,
      link: book.volumeInfo.previewLink,
      rating: book.volumeInfo.averageRating,
    })
  })
}

export const FetchIsbn = async ({isbnData}: {isbnData: ISBN}) => {
  if(isbnData !== undefined) {
    return await axios.post(`https://book-keeper-server.herokuapp.com/${isbnData.path}`, {
      "isbn": `${isbnData.isbn}`
    })
    .then(response => {
      if(response.data.Response) {
        console.log(response.data.Response);
        return response.data.Response;
      }
      if(response.data && response.data.length > 0) {
        console.log(response.data)
        return mapData(response.data);
      }
    })
    .catch(err => {console.log(err)})
  }
}

export const FetchAuthor = async ({authorData}: {authorData: Author}) => {
  if(authorData) {
    axios.post(`https://book-keeper-server.herokuapp.com/${authorData.path}`, {
      "author": `${authorData.author}`
    })
    .then(response => {
      if(response.data.Response) {
        console.log(response.data.Response);
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
  if(titleData) {
    axios.post(`https://book-keeper-server.herokuapp.com/${titleData.path}`, {
      "title": `${titleData.title}`
    })
    .then(response => {
      if(response.data.Response) {
        console.log(response.data.Response);
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
  if(titleAuthorData) {
    axios.post(`https://book-keeper-server.herokuapp.com/${titleAuthorData.path}`, {
      "title": `${titleAuthorData.title}`,
      "author": `${titleAuthorData.author}`
    })
    .then(response => {
      if(response.data.Response) {
        console.log(response.data.Response);
        return(response.data.Response);
      }
      if(response.data && response.data.length > 0) {
        return mapData(response.data);
      }
    })
    .catch(err => {console.log(err)})
  }
}