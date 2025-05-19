// pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import LogoutButton from "../components/LogoutButton/LogoutButton";

export default function Home({ user }) {
  const router = useRouter();

  useEffect(() => {
    // If the user is authenticated, redirect to the dashboard
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div>
        <h1>Welcome {user?.name}</h1>
        <LogoutButton />
      </div>
    );
  }

  return <div>Loading...</div>;  // Show a loading screen while redirecting
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie || "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-auth`, {
    headers: {
      cookie,
    },
  });

  const data = await res.json();

  // If the user is authenticated, redirect to the dashboard
  if (data.isAuthenticated) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  // If the user is not authenticated, redirect to the login page
  if (!data.isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If no authentication data is available, render the home page
  return {
    props: {
      user: data.user || null,
    },
  };
}
