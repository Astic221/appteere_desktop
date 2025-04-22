import { API_BASE_URL } from "../ApiConfig";
import { fetchWithTimeout } from "./fetchWithTimeOut";


const BooksService = {


    getHomeContents: async () => {
        try {
            const response:any = await fetchWithTimeout(`${API_BASE_URL}/home/contents`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data; // Assurez-vous que le format correspond à la réponse de votre API
          } catch (error) {
            console.error('Error fetching contents:', error);
            throw error;
          }
      },
    getSimilarBooksAndTags: async (book_id:any) => {
      try {
          const response = await fetch(`${API_BASE_URL}/books/get-similars-books/?book_id=${book_id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data; // Assurez-vous que le format correspond à la réponse de votre API
        } catch (error) {
          console.error('Error fetching contents:', error);
          throw error;
        }
    },
    getBooksByCategory: async (category:any, page = 1) => {
      try {
        const response:any = await fetchWithTimeout(`${API_BASE_URL}/books/get-books-by-category/${category}/?page=${page}`);
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Lancer une erreur si la réponse n'est pas OK
        }
    
        const data = await response.json();
        return data; // Assurez-vous que le format correspond à la réponse de votre API
      } catch (error) {
        console.error('Error fetching contents:', error);
        throw error; // Relancer l'erreur pour qu'elle soit capturée dans le `fetchData`
      }
    },
    
  
  
    getBooksByAuthor: async (author:string, page=1) => {
      try {
          const response = await fetch(`${API_BASE_URL}/books/get-books-by-author/${author}/?page=${page}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data; // Assurez-vous que le format correspond à la réponse de votre API
        } catch (error) {
          console.error('Error fetching contents:', error);
          throw error;
        }
    },
    searchBooks : async (query:string, page = 1) => {

    },

    getAuthors : async () => {
      try {
          const response:any = await fetchWithTimeout(`${API_BASE_URL}/get-authors`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data; // Assurez-vous que le format correspond à la réponse de votre API
        } catch (error) {
          console.error('Error fetching contents:', error);
          throw error;
        }
    },


    getPublishers : async () => {
      try {
          const response:any = await fetchWithTimeout(`${API_BASE_URL}/get-publishers`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data; // Assurez-vous que le format correspond à la réponse de votre API
        } catch (error) {
          console.error('Error fetching contents:', error);
          throw error;
        }
    },

    getAuthorById : async (id:string, page = 1) => {
      try {
          const response:any = await fetchWithTimeout(`${API_BASE_URL}/get-author/${id}/?page=${page}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data; // Assurez-vous que le format correspond à la réponse de votre API
        } catch (error) {
          console.error('Error fetching contents:', error);
          throw error;
        }
    },

    getPublisherById : async (id:string, page = 1) => {
      try {
          const response:any = await fetchWithTimeout(`${API_BASE_URL}/get-publisher/${id}/?page=${page}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data; // Assurez-vous que le format correspond à la réponse de votre API
        } catch (error) {
          console.error('Error fetching contents:', error);
          throw error;
        }
    },

    getContentChidren : async () => {
      try {
          const response:any = await fetchWithTimeout(`${API_BASE_URL}/get-contents-children`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data; // Assurez-vous que le format correspond à la réponse de votre API
        } catch (error) {
          console.error('Error fetching contents:', error);
          throw error;
        }
    }
   
  };
  
  export default BooksService;
