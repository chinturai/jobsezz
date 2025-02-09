import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import useFetch from '@/hooks/use-fetch';
import { getSingleJob } from '@/api/apijobs';
import { HashLoader } from 'react-spinners';
import { Briefcase, MapPin, DoorOpen, DoorClosed } from 'lucide-react';
import MDEditor from "@uiw/react-md-editor";
import { updateHiringStatus } from '@/api/apijobs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ApplyJobDrawer } from '@/components/apply-job';
import ApplicationCard from '@/components/application-card';

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJobs,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateHiringStatus, {
    job_id: id,
  });

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  }

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJobs) {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <HashLoader color="#FF0000" />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-8 m-10 p-4 bg-black text-white rounded-md outline outline-2 outline-white shadow-lg hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.8)] transition-shadow duration-300'>

      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient gradient-title font-extrabold pb-3 text-2xl sm:text-4xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>

      <div className='flex justify-between'>

        <div className='flex gap-3'>
          <MapPin />
          {job?.location}
        </div>

        <div className='flex gap-3'>
          <Briefcase /> {job?.applications?.length} Applicants have applied to this job.
        </div>

      </div>

      <div className='flex gap-3'>
        {job?.isOpen ?
          <>
            <DoorOpen /> This Job is ACCEPTING applications
          </>
          :
          <>
            <DoorClosed /> This Job is currently NOT accepting applications
          </>
        }
      </div>

      {/* Add Hiring Status */}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange} >
          <SelectTrigger
            className={`w-[180px] ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <MDEditor.Markdown source={job?.description} style={{ whiteSpace: 'pre-wrap' }} className="bg-transparent sm:text-lg" />

      <h2 className="text-2xl sm:text-3xl font-bold">What we are looking for</h2>
      <MDEditor.Markdown source={job?.requirements} style={{ whiteSpace: 'pre-wrap' }} className="bg-transparent sm:text-lg" />

      {/* Show Apply to jOb button only when user is NOT a recruiter */}

      {job?.recruiter_id !== user?.id && ( 
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications.find((ap)=> ap.candidate_id === user.id)}
        /> )}
      
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  )
}

export default JobPage
