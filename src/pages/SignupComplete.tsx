
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const SignupComplete: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-600 rounded-full">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">
                Signup Complete!
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to CrabsFriedPolitically
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
                <Mail className="h-5 w-5" />
                <span className="text-sm">Check your email to verify your account</span>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  🎉 You've earned 10 FREE credits!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Start exploring exclusive political content right away
                </p>
              </div>
              
              <div className="space-y-2">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <Link to="/">Start Exploring</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default SignupComplete;
