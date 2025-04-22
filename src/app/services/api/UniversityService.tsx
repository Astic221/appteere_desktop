import { API_BASE_URL } from "../ApiConfig";
import { fetchWithTimeout } from './fetchWithTimeOut';

export const UniversityService = {
  // 1. Récupérer toutes les facultés avec leurs niveaux
  async getFaculties() {
    const res = await fetch(`${API_BASE_URL}/faculties`);
    if (!res.ok) throw new Error('Erreur lors de la récupération des facultés');
    return await res.json();
  },

  // 2. Récupérer un niveau avec ses contenus
async getFacultyLevelContents(levelId: number) {
    const res = await fetch(`${API_BASE_URL}/level/${levelId}/contents`);
    if (!res.ok) throw new Error('Erreur lors de la récupération des contenus du niveau');
    const json = await res.json();
    return json; 
  },
  
//   // 3. Récupérer le détail d’un contenu
//   async getContentDetail(contentId: number) {
//     const res = await fetch(`${API_BASE_URL}/content/${contentId}`);
//     if (!res.ok) throw new Error('Erreur lors de la récupération du contenu');
//     return await res.json();
//   },

//   // 4. Récupérer les contenus d’une faculté
//   async getContentsByFaculty(facultyId: number) {
//     const res = await fetch(`${API_BASE_URL}/faculty/${facultyId}/contents`);
//     if (!res.ok) throw new Error('Erreur lors de la récupération des contenus de la faculté');
//     return await res.json();
//   }
};
