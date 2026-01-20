import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios.config";
import { setAuth, logout as logoutAction } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const auth = useSelector((state) => state.auth);

  // 🔐 LOGIN
  const loginMutation = useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
    onSuccess: (res) => {
      dispatch(setAuth(res.data));
      queryClient.invalidateQueries(["me"]);
    },
  });

  // 🚪 LOGOUT
  const logoutMutation = useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => {
      dispatch(logoutAction());
      queryClient.clear();
    },
  });

  // 👤 CURRENT USER
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: () => api.get("/auth/me"),
    enabled: !!auth.token,
  });

  return {
    // state
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,

    // login
    login: loginMutation.mutate,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,

    // logout
    logout: logoutMutation.mutate,

    // me
    me: meQuery.data?.data,
    meLoading: meQuery.isLoading,
  };
};
