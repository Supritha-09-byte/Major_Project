import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
    const email = user.emailAddresses[0].emailAddress;

    // First, try to find by clerkUserId
    let loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) {
      // Update user info in case it changed
      return await db.user.update({
        where: { clerkUserId: user.id },
        data: { name, imageUrl: user.imageUrl || "", email },
      });
    }

    // If not found by clerkUserId, check if email exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      // Email exists, update the clerkUserId
      return await db.user.update({
        where: { email },
        data: { clerkUserId: user.id, name, imageUrl: user.imageUrl || "" },
      });
    }

    // Create new user
    return await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl || "",
        email,
      },
    });
  } catch (error) {
    console.error("Error in checkUser:", error);
    return null;
  }
};
