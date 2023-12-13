export interface TargetSchema {
  name: string;
  subTargets: Array<{
    text: string;
    way: string;
    maxValue: string;
    timeOrNumbers: Array<{
      value: string;
      timestamp: {
        type: Date;
        updatedAt: false;
      };
    }>;
  }>;
}

export interface User {
  _id: string;
  role: string;
  name: string;
  userName: string;
  bio?: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  followers: Array<{
    userId: string;
  }>;
  following: Array<{
    userId: string;
  }>;
  target: Array<TargetSchema>;
}

export interface Reply {
  _id: string;
  user?: User;
  title: string;
  image?: {
    public_id?: string;
    url?: string;
  };
  createdAt?: Date;
  likes?: Array<{
    name?: string;
    userName?: string;
    userId?: string;
    userAvatar?: string;
  }>;
  reply?: Array<Reply>;
}

export interface SubTarget {
  text: string;
  way?: string;
  maxValue?: string;
  timeOrNumbers: {
    value: string;
    timestamp?: Date;
    updatedAt?: false;
  }[];
  userId: string;
}
export interface Post {
  _id: string;
  title: string;
  image?: {
    public_id?: string;
    url?: string;
  };
  user: User;
  likes?: Array<{
    name?: string;
    userName?: string;
    userId?: string;
    userAvatar?: string;
  }>;
  createdAt: Date;
  replies?: Array<Reply>;
}
