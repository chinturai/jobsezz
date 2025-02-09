import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import {
        Card,
        CardContent,
        CardFooter,
        CardHeader,
        CardTitle,
} from "./ui/card";
import { Trash2Icon, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { deleteJob, saveJob } from '@/api/apijobs';
import useFetch from '@/hooks/use-fetch';
import { useState } from 'react';
import { BarLoader } from 'react-spinners';


const JobCard = ({
        job,
        isMyJob = false,
        savedInit = false,
        onJobSaved = () => { },
}) => {

        const [saved, setSaved] = useState(savedInit)

        const { fn: fnSavedJob, data: savedJob, loading: loadingSavedJob, } = useFetch(saveJob, { alreadySaved: saved });

        const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
                job_id: job.id,
        });

        const handleDeleteJob = async () => {
                await fnDeleteJob();
                onJobSaved();
        };

        const { user } = useUser();

        const handleSaveJob = async () => {
                await fnSavedJob({
                        user_id: user.id,
                        job_id: job.id,
                })
                onJobSaved();
        }

        useEffect(() => {
                if (savedJob !== undefined) setSaved(savedJob?.length > 0);
        }, [savedJob])

        return <Card className="m-10">

                {loadingDeleteJob && (<BarLoader className="mt-4" width={"100%"} color="#36d7b7" />)}

                <CardHeader>
                        <CardTitle className="flex font-bold">
                                {job.title}
                                {job.company && <img src={job.company.logo_url} alt="Company Logo" className='h-6 ml-10' />}
                        </CardTitle>
                </CardHeader>

                <CardContent>
                        <div className='flex items-center mb-5'>
                                <MapPin size={20} className='mr-5' /> {job.location}
                        </div>
                        <hr />
                        <h3 className='font-bold text-xl mt-4'>Description</h3>
                        {job.description}
                </CardContent>

                <CardFooter className="flex justify-between">
                        <Link to={`/job/${job.id}`}>
                                <Button variant="secondary">
                                        More Details <ArrowRight />
                                </Button>

                        </Link>

                        <div className='ml-auto flex gap-2 items-center justify-between'>
                                {isMyJob && (
                                        <Trash2Icon
                                                fill="red"
                                                size={18}
                                                className="text-red-300 cursor-pointer"
                                                onClick={handleDeleteJob}
                                        />
                                )}

                                {!isMyJob && (
                                        <Button variant="outline" className="w-15" onClick={handleSaveJob} disabled={loadingSavedJob}>
                                                {saved ? (<Heart size={25} stroke='red' fill='red' />) : (<Heart size={25} stroke='white' />)}
                                        </Button>
                                )}

                        </div>
                </CardFooter>
        </Card>
}

export default JobCard
