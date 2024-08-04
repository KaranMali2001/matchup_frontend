


import { AuthProvider } from '@/lib/AuthContextProvider'; 

export const Providers = ({ children }) => {
  return (
    <AuthProvider> 
  
        {children}
     
     
</AuthProvider>
  );
};
