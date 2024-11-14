import axiosInstance from "@/utils/axiosConfig";

export const fetchStats = async () => {
    try {
    const response = await axiosInstance.get('/stats');
      return response.data
    } catch (error) {
      console.error("Error al obtener los stats:", error);
      return undefined;
    }
    
  };