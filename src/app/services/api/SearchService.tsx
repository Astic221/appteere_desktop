import { API_BASE_URL } from "../ApiConfig";
import { fetchWithTimeout } from "./fetchWithTimeOut";


const SearchService = {



    getSearchContents: async (query: string, page:number = 1) => {
        try {
          const response:any = await fetchWithTimeout(`${API_BASE_URL}/search/?query=${query}&page=${page}`);
        
          const data = await response.json();
          return data; 
        } catch (error) {
          console.error('Error fetchWithTimeouting contents:', error);
          throw error;
        }
      },
    
  
   
  };
  
  export default SearchService;
