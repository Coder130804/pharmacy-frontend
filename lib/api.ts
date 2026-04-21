import axios from "axios";

// ✅ Render backend base URL
const API_BASE_URL = "https://pharmacy-backend-q2x4.onrender.com/api";

export interface Medicine {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  quantity: number;
}

export type MedicineInput = Omit<Medicine, "id">;

export const api = {
  getMedicines: async (): Promise<Medicine[]> => {
    const response = await axios.get<Medicine[]>(`${API_BASE_URL}/medicines`);
    return response.data;
  },

  getMedicine: async (id: number): Promise<Medicine> => {
    const response = await axios.get<Medicine>(`${API_BASE_URL}/medicines/${id}`);
    return response.data;
  },

  addMedicine: async (medicine: MedicineInput): Promise<Medicine> => {
    const response = await axios.post<Medicine>(`${API_BASE_URL}/medicines`, medicine);
    return response.data;
  },

  updateMedicine: async (id: number, medicine: MedicineInput): Promise<Medicine> => {
    const response = await axios.put<Medicine>(`${API_BASE_URL}/medicines/${id}`, medicine);
    return response.data;
  },

  deleteMedicine: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/medicines/${id}`);
  },

  getReportsSummary: async () => {
    const res = await fetch(`${API_BASE_URL}/reports/summary`);
    if (!res.ok) throw new Error("Failed to fetch reports");
    return res.json();
  },
};