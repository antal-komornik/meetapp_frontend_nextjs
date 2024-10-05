'use client'
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"

export default function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  // useEffect(() => {
  //   console.log("Current state - Username:", username, "Email:", email, "Password:", password);
  // }, [username, email, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("handleSubmit elindult");

    if (!isLogin && password !== password2) {
      console.error("Passwords do not match");
      return;
    }

    const result = await signIn("credentials", {
      username,
      email,
      password,
      password2: isLogin ? undefined : password2,
      isRegister: !isLogin,
      redirect: false,
    })

    console.log("result:", result)
    if (result?.ok) {
      router.push("/")
    } else {
      console.error(isLogin ? "Authentication failed" : "Registration failed")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered"
                />
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
              />
            </div>
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password Again</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="input input-bordered"
                />
              </div>
            )}
            <div className="form-control mt-6">
              <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                {isLogin ? 'Login' : 'Register'}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="link link-primary"
            >
              {isLogin ? 'Create an account' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 'use client'
// import React, { useState, FormEvent } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn } from "next-auth/react"

// export default function AuthForm() {
//   const router = useRouter()
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [password2, setPassword2] = useState("")

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     console.log("handleSubmit elindult");

//     if (!isLogin && password !== password2) {
//       console.error("Passwords do not match");
//       return;
//     }

//     const result = await signIn("credentials", {
//       username,
//       email,
//       password,
//       password2: isLogin ? undefined : password2,
//       isRegister: !isLogin,
//       redirect: false,
//     })

//     console.log("result:", result)
//     if (result?.ok) {
//       router.push("/wishlists")
//     } else {
//       console.error(isLogin ? "Authentication failed" : "Registration failed")
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title">
//             {isLogin ? 'Login' : 'Register'}
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Username</span>
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="input input-bordered"
//                 required
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input input-bordered"
//                 required
//               />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">{isLogin ? 'Password' : 'Password1'}</span>
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input input-bordered"
//                 required
//               />
//             </div>
//             {!isLogin && (
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password2</span>
//                 </label>
//                 <input
//                   type="password"
//                   name="password2"
//                   placeholder="Confirm Password"
//                   value={password2}
//                   onChange={(e) => setPassword2(e.target.value)}
//                   className="input input-bordered"
//                   required
//                 />
//               </div>
//             )}
//             <div className="form-control mt-6">
//               <button type="submit" className="btn btn-primary">
//                 POST
//               </button>
//             </div>
//           </form>
//           <div className="mt-4 text-center">
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="link link-primary"
//             >
//               {isLogin ? 'Create an account' : 'Already have an account? Login'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }