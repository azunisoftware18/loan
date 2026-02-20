// hooks/usePermissions.js
import { useState, useCallback, useEffect } from "react";
import api from "../lib/axios.config";
import toast from "react-hot-toast";

export const usePermissions = () => {
  const [loading, setLoading] = useState({
    create: false,
    assign: false,
    getUserPerms: false,
    getAllPerms: false,
    getMyPerms: false,
    getUsers: false
  });
  
  const [error, setError] = useState(null);
  const [myPermissions, setMyPermissions] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [users, setUsers] = useState([]);

  // -----------------------------------
  // Helper: Check if user has permission
  // -----------------------------------
  const hasPermission = useCallback((permissionCode) => {
  if (!myPermissions?.length) return false;
  return myPermissions.some(p => p.code === permissionCode);
}, [myPermissions]);


  // -----------------------------------
  // 1️⃣ Get logged-in user's permissions
  // -----------------------------------
  const getMyPermissions = useCallback(async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.id) return [];

    const res = await api.get(`/permissions/user/${user.id}`);

    if (res.data?.success) {
      setMyPermissions(res.data.data || []);
      return res.data.data;
    }

  } catch (err) {
    console.error("My permissions error:", err);
    setMyPermissions([]);
  }
}, []);




  // -----------------------------------
  // 2️⃣ Get all users
  // -----------------------------------
  const getUsers = useCallback(async () => {
  try {
    setLoading(prev => ({ ...prev, getUsers: true }));

    const res = await api.get("/user/all"); // ← fix URL if needed

    if (res.data?.success) {
      setUsers(res.data.data || []);
      return res.data.data;
    }

  } catch (err) {
    console.error("Users API error:", err);
    setUsers([]); // no dummy
  } finally {
    setLoading(prev => ({ ...prev, getUsers: false }));
  }
}, []);


  // -----------------------------------
  // 3️⃣ Get all permissions
  // -----------------------------------
  const getAllPermissions = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, getAllPerms: true }));
      setError(null);

      const res = await api.get("/permissions/all-permissions");
      
      if (res.data?.success) {
        setAllPermissions(res.data.data || []);
        return res.data.data;
      }
    } catch (err) {
      console.error("Get all permissions failed:", err);
      // Agar 404 aata hai, to dummy permissions set karo
      if (err.response?.status === 404) {
        // Temporary dummy permissions for testing
        const dummyPerms = [
          { id: "1", code: "VIEW_USER_PERMISSIONS", name: "View User Permissions" },
          { id: "2", code: "ASSIGN_PERMISSIONS", name: "Assign Permissions" },
          { id: "3", code: "CREATE_PERMISSIONS", name: "Create Permissions" },
          { id: "4", code: "VIEW_ALL_PERMISSIONS", name: "View All Permissions" },
        ];
        setAllPermissions(dummyPerms);
        setMyPermissions(dummyPerms); // Super admin ke liye sab permissions
        toast.error("Permissions API not found - using dummy data");
      } else {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(prev => ({ ...prev, getAllPerms: false }));
    }
  }, []);

  // -----------------------------------
  // 4️⃣ Get user permissions
  // -----------------------------------
  const getUserPermissions = useCallback(async (userId) => {
    if (!userId) return [];
    
    try {
      setLoading(prev => ({ ...prev, getUserPerms: true }));
      setError(null);

      const res = await api.get(`/permissions/user/${userId}`);
      
      if (res.data?.success) {
        return res.data.data;
      }
    } catch (err) {
      console.error("Get user permissions failed:", err);
      // Agar 404 aata hai, to empty array return karo
      if (err.response?.status === 404) {
        return [];
      }
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, getUserPerms: false }));
    }
  }, []);

  // -----------------------------------
  // 5️⃣ Create permission
  // -----------------------------------
  const createPermission = useCallback(async (payload) => {
    try {
      setLoading(prev => ({ ...prev, create: true }));
      setError(null);

      const res = await api.post("/permissions/create-permissions", payload);
      
      if (res.data?.success) {
        toast.success("Permission created successfully!");
        // Refresh permissions list
        await getAllPermissions();
        return res.data;
      }
    } catch (err) {
      console.error("Create permission failed:", err);
      const errorMsg = err.response?.data?.message || "Failed to create permission";
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, create: false }));
    }
  }, [getAllPermissions]);

  // -----------------------------------
  // 6️⃣ Assign permissions to user
  // -----------------------------------
  const assignPermissions = useCallback(async (userId, permissions) => {
    if (!userId) {
      toast.error("Please select a user");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, assign: true }));
      setError(null);

      const res = await api.post("/permissions/assign", {
        userId,
        permissions
      });
      
      if (res.data?.success) {
        toast.success("Permissions assigned successfully!");
        return res.data;
      }
    } catch (err) {
      console.error("Assign permissions failed:", err);
      const errorMsg = err.response?.data?.message || "Failed to assign permissions";
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, assign: false }));
    }
  }, []);

  // -----------------------------------
  // 7️⃣ Refresh all data
  // -----------------------------------
  const refreshAll = useCallback(async () => {
    await Promise.allSettled([
      getMyPermissions(),
      getAllPermissions(),
      getUsers()
    ]);
  }, [getMyPermissions, getAllPermissions, getUsers]);

  // -----------------------------------
  // Initial load
  // -----------------------------------
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return {
    // Data
    myPermissions,
    allPermissions,
    users,
    
    // Loading states
    loading,
    
    // Error
    error,
    
    // Helper
    hasPermission,
    
    // Actions
    createPermission,
    assignPermissions,
    getUserPermissions,
    getAllPermissions,
    getUsers,
    getMyPermissions,
    refreshAll
  };
};