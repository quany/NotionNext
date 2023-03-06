import { Redis } from '@upstash/redis'

// Initiate Redis instance by connecting to REST URL
export const redis = Redis.fromEnv()
