


import { API_BASE_URL } from "../ApiConfig";
import { fetchWithTimeout } from './fetchWithTimeOut';


const AuthService = {
   
  

        login: async (login:string, password:string) => {
        try {
            const response: any = await fetchWithTimeout(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json'  },
            body: JSON.stringify({  login:login, password:password }),
            });
    
        
            const data = await response.json();
            console.log("DATA FETCHED:", data); // Pour debug

    
    
            return {
                status: response.status,
                ...data,
            };  
        } catch (error) {
            console.error("Erreur dans le service login:", error);

            throw error;

        }
        },

   register: async (name: string, email: string, password: string) => {
    try {
        const response:any = await fetchWithTimeout(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, password }),
        });

        const data = await response.json();

        return {
            status: response.status,
            ...data,
        };
    } catch (error) {
        throw error;
    }
}

    

   
  
  
  }


  export default AuthService;