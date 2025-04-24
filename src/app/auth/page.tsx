'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Tent } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginAPI } from '@/lib/api';

// Extend the user schema with more validation
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleLogin = async () => {
    try {
      const res = await loginAPI("test3@gmail.com", "password123");

      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    handleLogin();
  }, []);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Auth Form Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-canvas">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Tent className="h-12 w-12 text-forest" />
            </div>
            <h1 className="text-3xl font-bold font-montserrat text-forest">Welcome to FanCamping</h1>
            <p className="text-charcoal mt-2">Your all-in-one platform for camping enthusiasts</p>
          </div>

          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest">Login to Your Account</CardTitle>
                  <CardDescription>
                    Enter your credentials to access all features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-forest hover:bg-opacity-90"
                        disabled={false}
                      >
                        {true ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 text-campfire"
                      onClick={() => setActiveTab("register")}
                    >
                      Register here
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest">Create an Account</CardTitle>
                  <CardDescription>
                    Join the CampConnect community today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Choose a username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Create a password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-forest hover:bg-opacity-90"
                        disabled={false}
                      >
                        {true ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 text-campfire"
                      onClick={() => setActiveTab("login")}
                    >
                      Login here
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="md:w-1/2 bg-cover bg-center flex flex-col justify-center p-8 text-white min-h-[400px] md:min-h-screen"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1571687949921-1306bfb24b72)',
          backgroundSize: 'cover'
        }}
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold font-montserrat mb-4">Discover the Great Outdoors</h2>
          <p className="text-lg mb-6">
            Join our community of camping enthusiasts to:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-campfire rounded-full p-1 mr-3 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              <span>Rent quality camping equipment at affordable prices</span>
            </li>
            <li className="flex items-start">
              <span className="bg-campfire rounded-full p-1 mr-3 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              <span>Share your camping experiences and read others' adventures</span>
            </li>
            <li className="flex items-start">
              <span className="bg-campfire rounded-full p-1 mr-3 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              <span>Access expert articles and guides for all skill levels</span>
            </li>
            <li className="flex items-start">
              <span className="bg-campfire rounded-full p-1 mr-3 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              <span>Connect with fellow outdoor enthusiasts and make friends</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 