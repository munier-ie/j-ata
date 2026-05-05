import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function Auth() {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Handle already logged in state
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-md">
              <Card variant="elevated">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-display">Already Logged In</CardTitle>
                  <CardDescription>
                    You are currently signed in as {user.email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="governmentPrimary" className="w-full" onClick={() => navigate('/admin')}>
                    Go to Dashboard
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                    Go Home
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    
    const { error } = await signIn(loginEmail, loginPassword);
    
    setLoading(false);

    if (error) {
      toast({
        title: 'Login Failed',
        description: error,
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Welcome back!',
      description: 'You have successfully logged in.'
    });
    
    // Redirect to admin dashboard
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
            <Card variant="elevated">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-display">Admin Login</CardTitle>
                <CardDescription>
                  Sign in to access the admin portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="Enter your email"
                        className="pl-10"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>
                  <Button 
                    type="submit" 
                    variant="governmentPrimary" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Admin access only. Contact IT support if you need access.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
