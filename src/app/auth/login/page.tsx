// import React from "react";

// function page() {
//   return <div>pagina de login</div>;
// }

// export default page;

//TESTE PARA DASH ADM
// src/app/auth/login/page.tsx

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn forceRedirectUrl="/aplicacao" signUpUrl="/auth/registo" />
    </div>
  );
}
