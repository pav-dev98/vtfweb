// ...código existente...
export class ApiClient {
    private static token: string | null = null;
    private static readonly API_URL = 'http://www.visitasfiis.admincursos-udemy.site/api';
  
    static async getToken() {
      if (this.token) return this.token;
  
      // Autenticación y obtención del token
      const res = await fetch(`${this.API_URL}/representative/login`, {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@admin.com', password: '123' }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      this.token = data.access_token;
      return this.token;
      
    }
  
    static async getResource(recurso: string,method: string, body: any) {
      const token = await this.getToken();
      let options = {} 
      let baseOtions = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      if(body){
        options = {
          ...baseOtions,
          body: JSON.stringify({...body})
        }
      }

      const res = await fetch(`${this.API_URL + recurso}`, options);
      let data = await res.json();
      return data;
    }
  }