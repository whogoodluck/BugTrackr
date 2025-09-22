import { zodResolver } from '@hookform/resolvers/zod'
import { Bug, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { useLogin } from '../hooks/useAuth'
import { signInSchema, type SignInFormData } from '../schemas/user.schema'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useLogin()

  const onSubmit = async (data: SignInFormData) => {
    mutate(data)
  }

  return (
    <div className='bg-background flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <div className='bg-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg'>
            <Bug className='text-primary-foreground h-8 w-8' />
          </div>
          <div className='space-y-2'>
            <h1 className='text-foreground text-3xl font-bold tracking-tight'>Welcome back</h1>
            <p className='text-muted-foreground'>Sign in to your Bug Tracker account</p>
          </div>
        </div>

        <Card>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-center text-2xl font-semibold'>Sign in</CardTitle>
            <CardDescription className='text-center'>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Mail className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                          <Input
                            {...field}
                            type='email'
                            placeholder='Enter your email'
                            className='pl-10'
                            disabled={isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password'
                            className='pr-10 pl-10'
                            disabled={isPending}
                          />
                          <button
                            type='button'
                            className='text-muted-foreground absolute top-0 right-0 h-full cursor-pointer px-3'
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isPending}
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex items-center justify-end'>
                  <span className='text-secondary -mt-1 text-sm'>Forgot password?</span>
                </div>

                <Button type='submit' disabled={isPending} className='w-full' size='lg'>
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </Form>

            <div className='mt-6'>
              <p className='bg-card text-muted-foreground px-2 text-center text-sm'>
                Don't have an account?{' '}
                <Link to='/register' className='text-secondary font-semibold'>
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignIn
