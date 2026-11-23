import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Notifikasi Web dan Mobile
  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Proses Login dan Register
  const handleAuth = async () => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;

    if (!cleanEmail || !cleanPassword) {
      showMessage("Peringatan", "Email dan Password harus diisi!");
      return;
    }

    if (!cleanEmail.includes("@")) {
      showMessage("Peringatan", "Format email tidak valid.");
      return;
    }

    if (!isLogin && cleanPassword.length < 6) {
      showMessage("Peringatan", "Password minimal harus 6 karakter.");
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // LOGIN SUPABASE
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (error) throw error;

        if (!data.session) {
          throw new Error("Sesi login tidak berhasil dibuat.");
        }

        router.replace("/");

        // AuthContext dan AuthGuard menangani navigasi
      } else {
        // REGISTER SUPABASE
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
          options: {
            data: {
              role: "user",
            },
          },
        });

        if (error) throw error;

        if (data.session) {
          // Registrasi berhasil dan sesi langsung aktif
          showMessage(
            "Berhasil",
            "Registrasi berhasil! Selamat datang di FitMatch.",
          );

          router.replace("/");
        } else {
          // Jika konfirmasi email diwajibkan
          showMessage(
            "Registrasi Berhasil",
            "Silakan periksa email kamu untuk melakukan konfirmasi akun, kemudian login.",
          );

          setIsLogin(true);
          setPassword("");
        }
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat autentikasi.";

      showMessage("Gagal", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="shirt" size={60} color="#1E3A8A" />
          </View>

          <Text style={styles.title}>
            {isLogin ? "Welcome Back!" : "Create Account"}
          </Text>

          <Text style={styles.subtitle}>
            {isLogin
              ? "Masuk untuk melanjutkan gayamu."
              : "Daftar untuk mulai mencocokkan outfit."}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password (min. 6 karakter)"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.authBtn, isLoading && { opacity: 0.7 }]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.authBtnText}>
                {isLogin ? "Login" : "Register"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => {
              setIsLogin(!isLogin);
              setPassword("");
            }}
            disabled={isLoading}
          >
            <Text style={styles.toggleText}>
              {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}

              <Text
                style={{
                  fontWeight: "800",
                  color: "#1E3A8A",
                }}
              >
                {isLogin ? "Daftar di sini" : "Masuk di sini"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  keyboardView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 30,
    elevation: 5,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#E0EFFE",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
  },

  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#1E293B",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  authBtn: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  authBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  toggleBtn: {
    marginTop: 20,
    alignItems: "center",
  },

  toggleText: {
    fontSize: 14,
    color: "#64748B",
  },
});
