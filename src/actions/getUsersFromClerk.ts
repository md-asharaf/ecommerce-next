"use server"
import { clerkClient } from "@/lib/clerk"

export const getUsersFromClerk = async (userIds:string[]) =>{
    try {
        const users =  await clerkClient.users.getUserList({userId:userIds});
        return users;
    } catch (error) {
        console.error('Error fetching Clerk User',error)
        return {
            data:[],
            totalCount:0
        }
    }
}
