  import { useState } from "react";
  import axios from "axios";
  import toast from "react-hot-toast";

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });

  export const useBranchAdmin = () => {
    const [branchAdmins, setBranchAdmins] = useState([]);
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState({
      list: false,
      create: false,
      update: false,
    });

    // ==============================
    // GET ALL BRANCH ADMINS
    // ==============================
    const getAllBranchAdmins = async () => {
      try {
        setLoading(prev => ({ ...prev, list: true }));

        const res = await api.get("/branch-admins/all-admins");

        if (res.data?.success) {
          setBranchAdmins(res.data.data || []);
        }

        return res.data;
      } catch (error) {
        toast.error("Failed to load branch admins");
        throw error;
      } finally {
        setLoading(prev => ({ ...prev, list: false }));
      }
    };

    // ==============================
    // GET ALL BRANCHES
    // ==============================
    const getAllBranches = async () => {
      try {
        const res = await api.get("/branches");

        if (res.data?.success) {
          setBranches(res.data.data || []);
        }

        return res.data;
      } catch (error) {
        toast.error("Failed to load branches");
        throw error;
      }
    };

    // ==============================
    // CREATE
    // ==============================
    const createBranchAdmin = async (data) => {
      try {
        setLoading(prev => ({ ...prev, create: true }));

        const res = await api.post(
          "/branch-admins/create-admin",
          data
        );

        toast.success(res.data.message);

        await getAllBranchAdmins(); // refresh list

        return { success: true };
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to create branch admin"
        );
        return { success: false };
      } finally {
        setLoading(prev => ({ ...prev, create: false }));
      }
    };

    // ==============================
    // UPDATE
    // ==============================
    const updateBranchAdmin = async (id, data) => {
      try {
        setLoading(prev => ({ ...prev, update: true }));

        const res = await api.put(
          `/branch-admins/update-admin/${id}`,
          data
        );

        toast.success(res.data.message);

        await getAllBranchAdmins(); // refresh list

        return { success: true };
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to update branch admin"
        );
        return { success: false };
      } finally {
        setLoading(prev => ({ ...prev, update: false }));
      }
    };

    return {
      branchAdmins,
      branches,
      loading,
      getAllBranchAdmins,
      getAllBranches,
      createBranchAdmin,
      updateBranchAdmin,
    };
  };