import axios from "axios";

export async function loginUser(loginElements) {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/authenticate', {
        email: loginElements.email,
        password: loginElements.password
      });
      
      return response;
      
      
    } 
    catch (error) {
      return null;
    }
  } 






export const registerUser = async (userData) => {
 
    try {
        const response = await axios.post('http://localhost:8081/api/v1/auth/register',userData);
        return response.data;  
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
export const addJob = async (job) => {
 
  try {
      const response = await axios.post('http://localhost:8081/api/v1/vacancy/add',job);
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};
export const addCat = async (job) => {
 
  try {
      const response = await axios.post('http://localhost:8081/api/v1/category/create',job);
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};
export const allCat = async () => {
 
  try {
      const response = await axios.get('http://localhost:8081/api/v1/category/all');
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};
    
export const allVacan = async () => {
 
  try {
      const response = await axios.get('http://localhost:8081/api/v1/vacancy/all');
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};

export const allVacanForEmployee = async (id) => {
 
  try {
      const response = await axios.get('http://localhost:8081/api/v1/vacancy/allVacan/'+id);
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};


export const candidateVacancy = async (id) => {
 
  try {
      const response = await axios.get('http://localhost:8081/api/v1/candidate/vacancies/'+id);
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};

export const oneVac = async (id) => {
 
  try {
      const response = await axios.get('http://localhost:8081/api/v1/vacancy/'+id);
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};

export const deleteVac= async (id) => {
 
  try {
      const response = await axios.delete('http://localhost:8081/api/v1/vacancy/'+id);
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};


export const allCompanies = async () => {
 
  try {
      const response = await axios.get('http://localhost:8081/users/companies');
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};



export const candidate = async (candidate) => {
 
  try {
      const response = await axios.post('http://localhost:8081/api/v1/candidate/create',candidate);
      return response.data;  
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};
