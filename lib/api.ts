import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/medicines";

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
    const response = await axios.get<Medicine[]>(API_BASE_URL);
    return response.data;
  },

  getMedicine: async (id: number): Promise<Medicine> => {
    const response = await axios.get<Medicine>(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  addMedicine: async (medicine: MedicineInput): Promise<Medicine> => {
    const response = await axios.post<Medicine>(API_BASE_URL, medicine);
    return response.data;
  },

  updateMedicine: async (id: number, medicine: MedicineInput): Promise<Medicine> => {
    const response = await axios.put<Medicine>(`${API_BASE_URL}/${id}`, medicine);
    return response.data;
  },

  deleteMedicine: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },

  getReportsSummary: async () => {
    const res = await fetch("http://localhost:8080/api/reports/summary");
    if (!res.ok) throw new Error("Failed to fetch reports");
    return res.json();
  },
};
