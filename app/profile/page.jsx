"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          
          }
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          setError(error.message);
          console.log(error);
          console.error("Failed to fetch posts:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }
  }, [session?.user?.id]);  // Depend on user ID to re-trigger when session updates

  const handleEdit = () => {};

  const handleDelete = async () => {};

  if (error) return <p>Error loading profile: {error}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
