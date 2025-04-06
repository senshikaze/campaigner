import { Job } from "../enums/job";

export interface Experience {
    character_level: number;
    primary_job: Job;
    primary_job_level: number;
    secondary_job?: Job;
    secondary_job_level?: number;
}
