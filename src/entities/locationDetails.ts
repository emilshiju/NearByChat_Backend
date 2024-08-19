import { ObjectId } from "mongoose";


interface Location {
    coordinates: [number, number];
    type: 'Point';
  }
  
  interface DistLocation {
    // Define the structure of the location object inside dist
    [key: string]: any; // Adjust this as necessary based on the actual structure
  }
  
  interface UserDetails {
    _id: string;
    userName: string;
    dob: string; // ISO date string
    gender: 'male' | 'female' | 'other';
    email: string;
    password: string;
    status: boolean;
    role: 'user' | 'admin' | 'other'; // Adjust roles as necessary
    imageUrl: string;
    currSearch: number;
    maxSearch: number;
    connections: any[]; // Define more specific type if available
    __v: number;
    bio: string;
    nickName: string;
    profession: string;
    updatedAt: string; // ISO date string
    images: any[]; // Define more specific type if available
  }
  
 export  interface MyObject {
    _id: ObjectId;
    userId: ObjectId;
    createdAt: string; // ISO date string
    location: Location;
    updatedAt: string; // ISO date string
    dist: {
      calculated: number;
      location: DistLocation; // Define more specific type if available
    };
    userDetails: UserDetails;
  }
  

  export interface LocationType{
    _id: string;
    userId: string;
    __v: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    location: Location;
  }
  